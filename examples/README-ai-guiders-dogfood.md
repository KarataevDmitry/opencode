# AI Guiders multi-root dogfood (PR #24589)

Dogfood branch for [anomalyco/opencode#24589](https://github.com/anomalyco/opencode/pull/24589) — multi-root `.code-workspace` support.

**Fork branch:** `feat/ai-guiders-multi-root-dogfood`

- PR [#24589](https://github.com/anomalyco/opencode/pull/24589) commits (`cgarrot/feat/multi-root-workspaces-v2`)
- **`merge upstream/dev`** (2026-08-24) — not rebase; `git merge upstream/dev --allow-unrelated-histories -X theirs` (PR fork has unrelated git history vs `anomalyco/opencode`)
- `examples/ai-guiders.code-workspace`

## Workspace file

Open or import:

`examples/ai-guiders.code-workspace`

Folders (adjust paths if your layout differs):

| Name | Path |
|------|------|
| opencode | `D:/Experiments/opencode` |
| agent-notes | `D:/Experiments/agent-notes` |
| casa-dev | `D:/Experiments/PersonalCursorFolder` (same roots as Cursor workspace **casa-dev**) |
| casa-ontology-payload | `D:/Experiments/PersonalCursorFolder/Financial/software/open/casa-ontology-payload` |
| cdp-mcp | `D:/Experiments/PersonalCursorFolder/Financial/software/open/cdp-mcp` |
| guiders-core | `D:/Experiments/PersonalCursorFolder/Financial/software/open/guiders-core` |

Not in this workspace: **SSRepo** (`D:/SSRepo`) — Harvester / EDWH work contour, separate from AI Guiders dogfood.

VS Code / Cursor can open the same file for parity.

## Build (this branch only — not in stock 1.18.x)

Requires [Bun](https://bun.sh). From repo root:

```bash
bun install
cd packages/opencode && bun run typecheck
bun test --timeout 30000 test/server/multi-root-middleware.test.ts test/session/multi-root.test.ts
```

Desktop: see upstream `packages/desktop` README (Electron build).

## Stock OpenCode 1.18 workaround

Until #24589 merges, use global `~/.config/opencode/opencode.jsonc` snippet:

`examples/stock-external-directories.jsonc` — merge `permission.external_directory` into your config.

CDP MCP (`cdp_*`) is not limited by OC project root; habitat still spans repos.

## Merge status (2026-08-24)

| Attempt | Result |
|---------|--------|
| `git rebase upstream/dev` | Fail — unrelated histories + 11k commits |
| `git merge upstream/dev` | Fail — unrelated histories |
| `git merge upstream/dev --allow-unrelated-histories -X theirs` | **OK** — upstream session/core wins on conflicts; multi-root **new files** kept (`packages/opencode/src/workspace/*`, middleware, migrations, app workspace UI) |
| Cherry-pick / `git apply` PR patch | Fail on moved TUI (`packages/tui`) |

**Follow-up:** port `multiRootWorkspaceID` into refactored `packages/opencode/src/session/session.ts` + SDK client — **done** on this branch (`session.ts`, `instance-state.ts`, `sdk/js/src/v2/client.ts`).

**Upstream issue:** [#19515](https://github.com/anomalyco/opencode/issues/19515)

**KB:** agent-notes `opencode-habitat` project card + CDP-ADR-0021.

## Dogfood report template

Post to PR #24589:

1. Import `ai-guiders.code-workspace` — all six roots visible in `@` picker?
2. Session across agent-notes + cdp-mcp — `external_directory` prompts gone?
3. CDP-first seat (Fathom): subagent + `cdp_buffer` on non-primary root?
4. Gaps: git diff per repo (#34398), LSP multi-root?
