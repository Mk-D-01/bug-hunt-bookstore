# Shadow Ops: The Bookstore Breach

> **CLASSIFIED // EYES ONLY**
>
> You are a **Shadow Engineer**. Officially, you don't exist. Your agency runs its operations behind an
> ordinary-looking front: a small online bookstore. Customers browse, search, and buy books. Field agents use
> the same system to pass messages, so if the shop goes down, the whole network goes dark.
>
> Last night, someone got in. The attackers didn't take the system down; that would have been noticed.
> Instead they planted **5 quiet bugs** deep in the code, each one small enough to look like an honest mistake.
> Customers are already complaining. Left alone, these faults will expose the front, and the network with it.
>
> Nobody knows where the bugs are. That's why they called you.
>
> **Your mission:** find every planted bug, understand *why* it breaks things, fix it properly, and get your
> fixes to HQ before the attackers make their next move. The world is counting on you.

## Incident reports

Five reports have come in from the front desk. Each has its own cause somewhere in the system.

| # | What customers say |
|---|---|
| 1 | "The first books are missing when I browse the catalogue." |
| 2 | "Sorting by price looks wrong." |
| 3 | "Search is flaky, sometimes it just breaks." |
| 4 | "The cart total doesn't add up." |
| 5 | "We've had complaints about stock when the shop is busy." |

Work like an investigator: **reproduce the problem first**, watch what the app does, read the terminal where the
server prints its errors, then trace the cause and fix it.

## Getting into the system

1. Open this repo in a Codespace: **Code → Codespaces → Create codespace on main**. Setup takes a minute or two.
2. The server starts by itself in a terminal. **Keep that terminal visible**, because server errors show up there.
3. When a popup says port 3000 is available, click **Open in Browser** (or open the **Ports** tab and click the link next to 3000).
4. Click around: browse, sort, search, add to cart, buy.

If the server isn't running (for example, you closed its terminal), start it again with:

```
npm start
```

The server restarts by itself when you save a file. **The database resets to its starting data on every restart**,
so a restart gives you a clean scene to test against.

You can also run it on your own computer: install Node.js 20 or newer, then run `npm install` and `npm start`.
No Docker or database install is needed.

## System layout

| Part | Where |
|---|---|
| Frontend (the web page) | `public/` |
| Backend (the API) | `server.js` and `lib/` |
| Database (Postgres, built into the app) | `db/init.sql` holds the data. `lib/db.js` loads it. |

The database is real Postgres, running inside the Node process through PGlite. `pool.query(text, params)` and
`pool.connect()` / `client.release()` work just like the `pg` library.

## Field tests

```
npm test
```

This runs quick checks for reports 1 to 4 so you know you're on the right track. **Report 5 has no field test.**
You'll have to work out how to prove it yourself. These checks are lighter than HQ's real ones, so a pass here
doesn't guarantee the bug is gone.

## Report to HQ (this is what counts!)

After you fix a bug, run:

```
npm run submit
```

This pushes your code to GitHub. **Push after every fix**, because HQ runs its own, tougher checks on what you
pushed. Agents are ranked by **how many bugs they neutralised**, and ties go to whoever got there **first**.
Nothing to type, nothing to upload. Your repo must stay **public**.

## Handler (hint bot)

Stuck? Contact your handler through the **"Ask the hint bot"** box at the bottom of the page. You get **5 hints in
total**, and each one is a little more specific than the last. Say which report you're on and what you've tried.
Your handler guides you; they never hand you the answer.

## Rules of engagement

- Fix the real problem. Special-casing the examples you see won't pass HQ's checks.
- Keep your repo name as it is and keep it public.
- The top agents will be debriefed and asked to explain their fixes.
- Ask a volunteer if your Codespace won't load.

Good luck, agent. This message will not self-destruct, but the attackers' bugs might.
