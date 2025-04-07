/**
 * Tests adapted from: https://github.com/rawberg/connect-sqlite3
 */

const { assert } = require('chai');

const expressSession = require('express-session');
const betterSqlite3 = require('better-sqlite3');

const implementation = require('.');

/* compatible with old constructor used in these tests */
function getStore({ db }) {
  const Store = implementation(expressSession, betterSqlite3(db, { verbose:process.env.DEBUG_SQLITE && console.error }));
  return new Store();
}

describe('express-session-better-sqlite3', function() {
  const store = getStore({ db:':memory:' });

  it('should implement createSession()', () => {
    // expect
    assert.isFunction(store.createSession);
  });

  it('should save a new session record', done => {
    store.set('1111222233334444', { cookie:{ maxAge:2000 }, name:'sample name' }, err => {
      if(err) return done(err);

      done();
    });
  });


  it('should retrieve an active session', done => {
    store.get('1111222233334444', (err, session) => {
      if(err) return done(err);

      assert.deepEqual(session, { cookie:{ maxAge:2000 }, name:'sample name' });

      done();
    });
  });

  it('should gracefully handle retrieving an unkonwn session', done => {
    store.get('hope-and-change', err => {
      if(err) return done(err);

      done();
    });
  });

  it('should only contain one session', done => {
    store.length((err, len) => {
      if(err) return done(err);

      assert.equal(len, 1);

      done();
    });
  });

  // see: https://github.com/expressjs/session#storesetsid-session-callback
  it('should support upserting a session', done => {
    store.get('1111222233334444', (err, session) => {
      if(err) return done(err);

      assert.equal(session.name, 'sample name');

      store.set('1111222233334444', { cookie:{ maxAge:2000 }, name:'sample name changed' }, err => {
        if(err) return done(err);

        store.get('1111222233334444', (err, session) => {
          if(err) return done(err);

          assert.equal(session.name, 'sample name changed');

          done();
        });
      });
    });
  });

  it('should clear all session records', done => {
    store.clear(err => {
      if(err) return done(err);

      store.length((err, len) => {
        if(err) return done(err);

        assert.equal(len, 0);

        done();
      });
    });
  });

  it('should destroy a session', function(done) {
    store.set('555666777', { cookie:{ maxAge:1000 }, name:'Rob Dobilina' }, err => {
      if(err) return done(err);

      store.destroy('555666777', function(err) {
        if(err) return done(err);

        store.length(function(err, len) {
          if(err) return done(err);

          assert.equal(len, 0);

          done();
        });
      });
    });
  });
});
