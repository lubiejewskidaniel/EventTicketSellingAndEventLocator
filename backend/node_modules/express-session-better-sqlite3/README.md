# express-session-better-sqlite3

SQLite [session store](https://github.com/expressjs/session#session-store-implementation) for [ExpressJS session middleware / express-session](https://github.com/expressjs/session) using [better-sqlite3](https://www.npmjs.com/package/better-sqlite3).

## Usage

```javascript
const betterSqlite3 = require('better-sqlite3');
const expressSession = require('express-session');
const expressSessionBetterSqlite3 = require('express-session-better-sqlite3');

const sqliteDb = new betterSqlite3(dbFilePath, dbOptions);
const BetterSqlite3SessionStore = expressSessionBetterSqlite3(expressSession, sqliteDb);

const app = express();

app.use(expressSession({
  store: new BetterSqlite3SessionStore(),
  ...
}));
```
