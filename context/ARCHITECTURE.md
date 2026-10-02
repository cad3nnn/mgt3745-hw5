# Architecture
Status: Superseded by ADR-002.
## Gate
The selected feature is a small form that saves and lists comic-production tasks.
### Constraints
- Zero-dollar budget.- Browser-only access.- GitHub Codespace and Live Server must be sufficient.- The code must remain inspectable by the student.- The feature must use localStorage.- The deadline favors a small working implementation over infrastructure.- The design must not automate creative judgment.
### Scoring anchors
For every criterion, 1 is least favorable, 3 is acceptable, and 5 is most favorable. Weights were assigned before scoring.
| Criterion | Weight | Build | Build weighted | Buy | Buy weighted | Delegate | Delegate weighted ||---|---:|---:|---:|---:|---:|---:|---:|| Cost to start | 5 | 5 | 25 | 4 | 20 | 3 | 15 || Cost to maintain | 4 | 4 | 16 | 3 | 12 | 3 | 12 || Time to working | 4 | 3 | 12 | 5 | 20 | 4 | 16 || Inspectability | 5 | 5 | 25 | 2 | 10 | 1 | 5 || Switching cost | 3 | 4 | 12 | 2 | 6 | 2 | 6 || Fit to spec | 5 | 5 | 25 | 2 | 10 | 3 | 15 || Total |  |  | 115 |  | 78 |  | 69 |
Inspectability note: Build receives the highest score because I can read and inspect the HTML, CSS, and JavaScript. Delegate receives a low score because I cannot yet reliably inspect server-side or delegated code at the same depth.
Sensitivity check: If time to working receives weight 5 instead of 4, Build totals 118, Buy totals 83, and Delegate totals 73. Build still wins, so the decision is not dependent on one small weight difference.
## ADR-001
## Gate rerun: remote persistence

The requirement has changed: entries must survive cleared browser site data and be available from a second browser. The HW3 weights remain appropriate because cost, maintainability, time, inspectability, switching cost, and fit to specification remain the decision criteria.

### Constraints

- The project must store entries outside the browser.
- The project must use a deployed Worker and D1 database.
- The budget remains zero.
- The Worker must provide `GET /entries`, `POST /entries`, and a 400 validation response.
- User-controlled SQL values must use `.bind()`.
- The page must handle failed network or server responses without throwing in the console.
- The implementation must remain small enough for me to inspect.
- The project must document the data crossing and accountability.

### Scoring anchors

For every criterion, 1 is least favorable, 3 is acceptable, and 5 is most favorable. The weights remain unchanged from HW3 because the same concerns still shape the choice; remote persistence raises the importance of the decision but does not change which concerns matter.

| Criterion | Weight | Build | Build weighted | Buy | Buy weighted | Delegate | Delegate weighted |
|---|---:|---:|---:|---:|---:|---:|---:|
| Cost to start | 5 | 5 | 25 | 3 | 15 | 3 | 15 |
| Cost to maintain | 4 | 4 | 16 | 3 | 12 | 3 | 12 |
| Time to working | 4 | 3 | 12 | 4 | 16 | 5 | 20 |
| Inspectability | 5 | 5 | 25 | 3 | 15 | 1 | 5 |
| Switching cost | 3 | 3 | 9 | 2 | 6 | 2 | 6 |
| Fit to spec | 5 | 5 | 25 | 3 | 15 | 3 | 15 |
| Total |  |  | 112 |  | 79 |  | 73 |

Switching-cost note: I lowered Build from 4 to 3 based on the experience of moving data from localStorage to a Worker and D1 database in this assignment. The migration requires changing browser persistence code, deploying server code, creating a schema, and documenting a new external-service crossing. That is manageable but not as frictionless as I estimated before doing it.

Inspectability note: Build remains highest because I can read the Worker, schema, browser fetch calls, and D1 queries. Buy and Delegate can reduce setup time, but they make behavior, vendor defaults, data handling, and generated server-side code less directly inspectable.

Sensitivity check: If time to working receives weight 5 instead of 4, Build totals 115, Buy totals 83, and Delegate totals 78. Build still wins, so the decision is not dependent on one small weight difference.
### Title and date
ADR-001 — 2026-09-18 — Build a browser-local comic task list with vanilla HTML, CSS, and JavaScript.
### Status
Accepted.
### Door / concrete acquisition and execution choice
Build.
### Context
The feature must be completed with a zero-dollar budget and a short deadline. The project specification requires browser-only access, localStorage persistence, visible separation between HTML, CSS, and JavaScript, and protection of creative judgment. I can inspect and revise a small client-side application more easily than a delegated server application. A purchased service could be faster to start, but it would introduce dependence on an external product and may not fit the exact feature scope.
### Decision
I will build the selected feature as a plain browser application using `index.html`, `styles.css`, `app.js`, and localStorage, and I will run it in the supplied GitHub Codespace with Live Server.
### Consequences
Building the feature makes the code inexpensive, inspectable, and closely fitted to the specification. It also makes it easier to revise the task fields and validation rules without depending on a vendor.
The decision makes maintenance, accessibility details, storage failure handling, and visual polish my responsibility. It also fails to provide multi-device synchronization, multi-user collaboration, secure remote backup, or automatic schedule generation. Those limitations are acceptable for HW3 but should be revisited when the project receives a database or collaboration requirement in Module 4. If a future version adds remote persistence, ADR-002 should supersede this decision.
## ADR-002

### Title and date

ADR-002 — 2026-09-24 — Build and deploy a Cloudflare Worker and D1 backend for remotely persistent comic-production tasks.

### Status

Accepted. Supersedes ADR-001.

### Door / concrete acquisition and execution choice

Build.

### Context

HW3 stored comic-production tasks in browser localStorage. That choice no longer satisfies the requirement that tasks survive cleared browser site data and be visible from a second browser. Task data now leaves the browser when the page sends JSON requests to a Cloudflare Worker, and the Worker stores serialized task data in Cloudflare D1.

The crossing is from the browser to Cloudflare under Cloudflare’s applicable service terms and privacy terms. The transmitted task data includes the task name, type, due date, status, browser request data, and metadata that Cloudflare may log as part of serving and operating the service. I am accountable for choosing to send this data, limiting it to the information needed for the feature, configuring the Worker, and documenting the service crossing. Cloudflare is accountable for operating its hosted Worker and D1 services under its terms.

The project still has a zero-dollar budget, must use a small inspectable implementation, and must demonstrate a GET endpoint, POST endpoint, validation failure, parameterized SQL, CORS handling, and browser-side response handling.

### Decision

I will build and deploy a Cloudflare Worker connected to a Cloudflare D1 database. The page will use `fetch()` to request `GET /entries` when it loads and send valid new tasks through `POST /entries`. The Worker will validate that the task name is not blank, return status 400 with a readable message for invalid input, and use `.bind()` for the user-controlled database value.

### Consequences

This decision makes task data survive cleared local browser data and allows a second browser to load the same remotely stored entries. It also makes the data model and persistence behavior more realistic than browser-only storage.

The decision makes several things harder. The project now depends on Cloudflare deployment, D1 configuration, CORS behavior, network availability, and a remote service remaining available. A failed network request or server error must be handled in the page. Testing requires deployed verification rather than only a local browser test. The database can also contain task data written by another client, so multi-user edits and conflict handling become future design concerns.

I am also responsible for protecting the new trust boundary: I must not store credentials in the repository, must use parameterized SQL rather than concatenated SQL, must keep task content rendered with `textContent`, and must accurately document what data goes to Cloudflare. Remote deletion and multi-user conflict resolution are deferred rather than silently assumed to work.