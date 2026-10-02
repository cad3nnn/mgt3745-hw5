# Features and specification
Status: ACTIVE.
## Context
The project supports a student comic creator who must make production progress while balancing academic responsibilities. Planning should make commitments visible without replacing creative judgment.
## Users
The primary user is a student comic creator balancing coursework with writing, drawing, production, and release work. A secondary intended user is a creative collaborator who needs to understand task progress.
## Scope and non-goals
The HW3 feature is a browser-based comic-production task list. The user can add a task with a name, type, due date, and status; view saved tasks; and delete tasks.
The system does not automatically create a schedule, choose creative directions, predict sales, synchronize between users, or replace artistic judgment.
## Constraints
- The application must run in a browser.- The application must work in a GitHub Codespace using Live Server.- The budget is zero.- The feature must use plain HTML, CSS, and JavaScript.- Data must persist through browser `localStorage`.- User-entered text must be inserted with `textContent`, not `innerHTML`.- The application must remain small enough to inspect manually.
## Selected feature
F-02: Break a release into tasks with dates and statuses.
This is a small implementation of the larger release-planning feature. Academic commitments remain part of the future scope, but HW3 focuses on recording and reviewing production tasks.
## Kano hypotheses
| Feature ID | Feature | Kano hypothesis | Segment / date | Evidence and reasoning ||---|---|---|---|---|| F-01 | Record academic commitments and comic tasks in one timeline | Must-be | Comic creator / 2026-09-10 | The HW1 framing centers on academic and production conflicts. This remains an unvalidated hypothesis. || F-02 | Break a release into tasks with dates and statuses | Performance | Comic creator / 2026-09-10 | Smaller tracked work units may make complex progress easier to manage. This is the selected HW3 feature. || F-03 | Show conflicts between commitments and planned tasks | Performance | Comic creator / 2026-09-10 | Conflict visibility could improve planning, but it is not implemented in HW3. || F-04 | Revise a plan without losing completed work | Must-be | Both profiles / 2026-09-10 | The Kevin interview suggested that plans should change when assumptions are disproved. || F-05 | Add measurable production checkpoints | Performance | Both profiles / 2026-09-10 | Completed pages, scenes, or tasks could make progress inspectable. || F-06 | Automatically suggest creative direction | Reverse | Comic creator / 2026-09-10 | Automation that dictates story direction could undermine authenticity. || F-07 | Provide an optional low-workload exam plan | Attractive | Comic creator / 2026-09-10 | This follows from the HW1 framing but was not directly stated in the interview. |
## Behavior
1. The page loads previously saved comic tasks from `localStorage`.2. The user enters a task name, type, date, and status.3. The user submits the form.4. The system rejects a blank task name.5. The system saves a valid task and displays it in the task list.6. The system shows the task type, date, and status.7. The user can delete a saved task.8. The system keeps user-entered text as text rather than interpreting it as HTML.9. The system displays a message when a save succeeds or fails.10. The system does not automatically reorder tasks based on creative judgment.
## Acceptance
### F-02-AC-01
When the user submits a task with a nonblank name, type, date, and status, the system shall save the task and display it in the task list.
### F-02-AC-02
When the user submits a task with a blank name, the system shall show a validation message and shall not add a task.
### F-02-AC-03
When the page is reloaded after a successful save, the system shall display the previously saved task.
### F-02-AC-04
When the user deletes a task, the system shall remove it from the visible list and saved data.
### F-02-AC-05
When a user enters text containing HTML characters, the system shall display it as text rather than interpreting it as markup.
### F-02-AC-06
When browser storage cannot be read or written, the system shall show an error message and avoid falsely claiming that the task was saved.
## Verification
| Criterion | Steps and input | Expected result | Observed result | Status | Evidence / commit ||---|---|---|---|---|---|| F-02-AC-01 | Enter “Thumbnail sketches,” choose Drawing, enter a date, leave status Planned, and submit. | The task appears in the list with its details. | The task appeared with its name, type, date, and status. | PASS | Manual browser test || F-02-AC-02 | Submit the form with an empty task name. | An error appears and no task is added. | The form displayed an error and the task count did not change. | PASS | Manual browser test || F-02-AC-03 | Add a task, reload the page, and inspect the list. | The task remains visible after reload. | The task remained visible. | PASS | Manual browser test || F-02-AC-04 | Click Delete on a saved task. | The task disappears and remains deleted after reload. | The task disappeared and did not return after reload. | PASS | Manual browser test || F-02-AC-05 | Enter `<b>test</b>` as the task name. | The characters appear as text, not bold markup. | The characters appeared as text. | PASS | Manual browser test || F-02-AC-06 | Disable or block storage and submit a valid task. | An error appears and the task is not falsely presented as saved. | Storage blocking was not reproduced in the current browser session. | CANNOT TEST YET | Requires browser storage failure setup || F-01 | Show academic commitments and comic tasks together. | Both commitment types appear in one timeline. | Not implemented in HW3. | DEFERRED | Future feature scope || F-03 | Show conflicts between commitments and tasks. | Conflicts are visibly identified. | Not implemented in HW3. | DEFERRED | Future feature scope || F-07 | Suggest a low-workload exam plan. | The system proposes a reduced plan. | Not implemented because the system does not automatically schedule work. | DEFERRED | ADR-001 |
