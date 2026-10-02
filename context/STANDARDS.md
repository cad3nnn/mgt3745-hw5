# Standards
Status: ACTIVE in Module 3.
1. Use descriptive camelCase identifiers for JavaScript variables and functions. Short conventional names are acceptable when their role is obvious.2. Keep structure, presentation, and behavior in `index.html`, `styles.css`, and `app.js`. Do not place application styles or behavior inline.3. Comments explain why a non-obvious decision exists, not what every line of code does. Remove temporary debug output before submission.4. Write commit messages that identify the changed behavior and its purpose.5. Use `textContent` for user-entered text. Never insert user strings through `innerHTML`.6. Associate form controls with labels and make success and error feedback perceivable.7. Preserve unsaved input when a storage write fails.8. Do not add automatic creative recommendations or schedule decisions to the task-list feature.
`STANDARDS.md` is the source of truth if it ever disagrees with `CLAUDE.md`.
## Split Test
### Rule 2: Separate HTML, CSS, and JavaScript
This rule applies to every task in this project and stays the same from task to task. If it were placed only in a task prompt, the project could gradually develop mixed concerns. Its main risk is clash if a later instruction asks for inline behavior.
Verdict: This rule belongs in `CLAUDE.md`.
### Rule 5: Use textContent for user-entered text
This rule applies whenever code displays user-controlled text, but not to every task. It stays the same whenever that kind of code is written. If it is loaded into every interaction, it may cause distraction during documentation-only work; however, because unsafe rendering would be serious, it remains a persistent project standard.
Verdict: This rule belongs in `CLAUDE.md`.
### Rule 8: Do not add automatic creative recommendations or schedule decisions
This rule applies mainly to feature work involving planning behavior. It may change when the product scope changes, and loading it into every task could cause confusion when editing unrelated files. It is better supplied when implementing or reviewing scheduling behavior.
Verdict: This rule belongs in the prompt for the task that needs it.
Prompt snippet:
> For this planning feature, do not automatically choose creative directions, rank story ideas, or generate a schedule. Preserve the creator’s judgment and show options instead of making the decision.
## Colleague Test
Reader: Maya.
What was tested: Maya read `CLAUDE.md` without seeing the project files and described the expected code as a small application with separate HTML, CSS, and JavaScript files, labeled controls, safe text rendering, and visible save errors.
Misunderstanding: Maya asked whether “preserve unsaved input” applied after a validation error as well as after a storage failure.
Revision made: The standard was revised to say specifically that unsaved input must be preserved when a storage write fails. Validation behavior is defined in `FEATURES.md`.
