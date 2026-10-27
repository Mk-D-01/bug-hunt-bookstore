// In-process Postgres (PGlite), so no separate database server or Docker is needed.
// The data is loaded fresh from db/init.sql every time the server starts.
// `pool` behaves like a pg Pool: pool.query(text, params) and pool.connect() for transactions.

const fs = require('fs');
const path = require('path');
const { PGlite } = require('@electric-sql/pglite');

const db = new PGlite();
const ready = db.exec(fs.readFileSync(path.join(__dirname, '..', 'db', 'init.sql'), 'utf8'));

// PGlite has a single connection, so a checked-out client holds it until release().
let queue = Promise.resolve();
function acquire() {
  let release;
  const held = new Promise((resolve) => (release = resolve));
  const turn = queue.then(() => release);
  queue = queue.then(() => held);
  return turn;
}

async function run(text, params) {
  await ready;
  return db.query(text, params || []);
}

const pool = {
  async query(text, params) {
    const release = await acquire();
    try {
      return await run(text, params);
    } finally {
      release();
    }
  },
  async connect() {
    const release = await acquire();
    return { query: run, release };
  },
};

module.exports = { pool, ready };
