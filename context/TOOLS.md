---
status: active
purpose: External-service trust-boundary ledger
---

# Tools

| Service | Trusted with | Credentials live | Crossing statement | Switching cost |
|---|---|---|---|---|
| Cloudflare Workers and D1 — hosts the Worker and stores task entries | Task names, types, dates, statuses, serialized task JSON, request metadata, and service logs Cloudflare collects | No credential is stored in this repository; the D1 database is attached through the `DB` binding in `wrangler.toml` | I send comic-production task data from the browser to Cloudflare through my Worker, and I am accountable for minimizing that data, configuring the service, and explaining the crossing. | Medium — replace the Worker endpoints and migrate the D1 entries to another database provider |
| GitHub and GitHub Codespaces — hosts source code and provides the development environment | Repository code, documentation, commit history, issues if used, and Codespace development activity | GitHub authentication is managed by GitHub and Codespaces; no GitHub credential is stored in this repository | I send the project source and repository history to GitHub, and I am accountable for not committing secrets or sensitive user data. | Medium — move the repository and development workflow to another Git provider and environment |
| GitHub Copilot — code-completion assistant used during development | Prompts, nearby editor context, and code context supplied through the enabled Copilot integration | Managed by the authenticated GitHub account; no token is stored in this repository | I may send code context and prompts to GitHub Copilot, and I am accountable for reviewing suggestions, rejecting unsafe SQL, and verifying code before using it. | Low — disable Copilot and continue writing or reviewing code manually |
| Wrangler — npm command-line tool for Cloudflare development and deployment | Project configuration, Worker code submitted for deployment, command output, and Cloudflare account context during authenticated use | Cloudflare authentication is managed outside the repository by Wrangler or the Cloudflare login flow | I use Wrangler to send Worker configuration and deployment artifacts to Cloudflare, and I am accountable for checking commands and keeping credentials out of the repository. | Low — use another Cloudflare deployment method or replace the deployment tool |