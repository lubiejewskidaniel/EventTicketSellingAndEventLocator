// see: https://github.com/expressjs/session#session-store-implementation

const bourne = require('@hapi/bourne');

module.exports = (expressSession, db) => {
  db.exec('CREATE TABLE IF NOT EXISTS express_session (id TEXT PRIMARY KEY, data TEXT)');

  const _get     = db.prepare('SELECT data FROM express_session WHERE id=?');
  const _set     = db.prepare('INSERT INTO express_session (id, data) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET data=?');
  const _destroy = db.prepare('DELETE FROM express_session WHERE id=?');
  const _length  = db.prepare('SELECT COUNT(*) FROM express_session');
  const _clear   = db.prepare('DELETE FROM express_session');

  class BetterSqlite3SessionStore extends expressSession.Store {
    get(id, callback) {
      try {
        const res = _get.get(id);
        if(res) callback(null, bourne.parse(res.data));
        else callback();
      } catch(err) {
        callback(err);
      }
    }

    set(id, data, callback) {
      try {
        const strData = JSON.stringify(data);
        _set.run(id, strData, strData);
        callback();
      } catch(err) {
        callback(err);
      }
    }

    length(callback) {
      try {
        const res = _length.get()['COUNT(*)'];
        callback(null, res);
      } catch(err) {
        callback(err);
      }
    }

    clear(callback) {
      try {
        _clear.run();
        callback();
      } catch(err) {
        callback(err);
      }
    }

    destroy(id, callback) {
      try {
        _destroy.run(id);
        callback();
      } catch(err) {
        callback(err);
      }
    }
  }

  return BetterSqlite3SessionStore;
};
