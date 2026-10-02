# EVALS.md
## 1. RAT statement

No preregistered RAT statement was found in the repository or indexed session history. Retrospective risk statement, recorded 2026-10-02: F-08 is only useful if filtering tasks by status leaves the existing Worker/D1 persistence behavior intact; this remains untested because the feature was not implemented.

## 2. Prediction Stake

No dated, numeric Tight prediction was recorded before a build. No Bolt build occurred, so there is no first output to score.

- **Tight (retrospective status, 2026-10-02):** No threshold recorded; unresolved because no Bolt output or F-08 implementation was evaluated.
- **Loose (text present in the original EVALS draft):** bolt will follow STYLE.md tokens better than AI Studio.
  - Resolution, 2026-10-02: Unresolved. Neither Bolt nor Google AI Studio Build produced an output to compare.
- **Open (text present in the original EVALS draft):** The tool will introduce a dependency I did not ask for. Resolves when I read package.json.
  - Resolution, 2026-10-02: For this coding session, no dependency was added; `package.json` lists Wrangler as its existing development dependency. The prediction about delegated tool output is unresolved because no Bolt or AI Studio build occurred.

## 3. Success criteria map

| EARS row | Check method | Evidence | Result |
|---|---|---|---|
| F-08-AC-01: default All tasks view | Browser judgment | No filter controls or filter state were present in the inspected `index.html` and `app.js`; no browser evaluation occurred. | NOT IMPLEMENTED / NOT VERIFIED |
| F-08-AC-02: Planned filter | Browser judgment | No F-08 implementation or browser evaluation. | NOT IMPLEMENTED / NOT VERIFIED |
| F-08-AC-03: In progress filter | Browser judgment | No F-08 implementation or browser evaluation. | NOT IMPLEMENTED / NOT VERIFIED |
| F-08-AC-04: Complete filter | Browser judgment | No F-08 implementation or browser evaluation. | NOT IMPLEMENTED / NOT VERIFIED |
| F-08-AC-05: no-match empty state | Browser judgment | No F-08 implementation or browser evaluation. | NOT IMPLEMENTED / NOT VERIFIED |
| F-08-AC-06: consistent list after saving under an active filter | Browser judgment | No F-08 implementation or browser evaluation. | NOT IMPLEMENTED / NOT VERIFIED |
| F-08-AC-07: HTML-like task names remain text | Browser judgment | Existing rendering uses `textContent`, but no F-08-specific browser test was performed. | NOT VERIFIED |

## 4. Error-analysis log

Rows are ordered by count. Limitations are included so missing evidence is not mistaken for a pass.

| Failure or limitation | Count | Source | Action taken |
|---|---:|---|---|
| F-08 acceptance rows not evaluated because the feature is not implemented. | 7 | Code inspection / judgment | Recorded as NOT IMPLEMENTED / NOT VERIFIED; no passing result claimed. |
| Bolt and AI Studio outputs unavailable. | 2 | Delegation records | Did not claim output findings or a comparison; no AI Studio run or Bolt run occurred. |
| The sample plain-text POST initially returned HTTP 400. | 1 | Deployed API smoke check | Removed the extra JSON-task validation, redeployed, and confirmed POST 201 plus GET containing the entry. |
| Exact Live Server origin is unknown; CORS still allows `*`. | 1 | Environment inspection | Did not guess an origin; narrow CORS when the exact browser origin is known. |
| No second grader or browser-based F-08 evaluation. | 1 | Judgment evaluation | `docs/JUDGMENT.md` records all twelve answers as not observed; agreement is not calculable. |

## 5. Evals

- **Code syntax:** `node --check worker.js && node --check app.js` passed after the Worker/API setup edits.
- **Deployed API smoke checks:** POST `/entries` with `{"text":"first crossing"}` returned HTTP 201; GET `/entries` returned HTTP 200 and the saved row. The remote schema command executed one query.
- **Automated test suite:** `npm test` was not run. No F-08 test file was created or run.
- **Judgment:** `docs/JUDGMENT.md` contains twelve rubric questions. Paired ratings collected: 0 of 12; agreement cannot be calculated. No browser screenshot was captured.

## Verification table (carried from HW4)

No HW4 verification table was present in this repository, and the available git history contains only the initial commit. The HW5 API smoke checks above are not represented as HW4 verification.
