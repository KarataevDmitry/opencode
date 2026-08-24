# AI Guiders multi-root dogfood (PR #24589)

Dogfood branch for [anomalyco/opencode#24589](https://github.com/anomalyco/opencode/pull/24589) — multi-root `.code-workspace` support.

**Fork branch:** `feat/ai-guiders-multi-root-dogfood` (based on `cgarrot/feat/multi-root-workspaces-v2` + this example).

## Workspace file

Open or import:

`examples/ai-guiders.code-workspace`

Folders (adjust paths if your layout differs):

| Name | Path |
|------|------|
| opencode | `D:/Experiments/opencode` |
| agent-notes | `D:/Experiments/agent-notes` |
| cdp-mcp | `D:/Experiments/PersonalCursorFolder/Financial/software/open/cdp-mcp` |
| guiders-core | `D:/Experiments/PersonalCursorFolder/Financial/software/open/guiders-core` |

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

## Rebase status (2026-08-24)

Cherry-pick of `d205fd3` + `a128590` onto current `upstream/dev` **conflicts heavily** (TUI moved to `packages/tui`, instance routes refactored). Needs maintainer-aligned port, not a blind rebase.

**Upstream issue:** [#19515](https://github.com/anomalyco/opencode/issues/19515)

**KB:** agent-notes `opencode-habitat` project card + CDP-ADR-0021.

## Dogfood report template

Post to PR #24589:

1. Import `ai-guiders.code-workspace` — all four roots visible in `@` picker?
2. Session across agent-notes + cdp-mcp — `external_directory` prompts gone?
3. CDP-first seat (Fathom): subagent + `cdp_buffer` on non-primary root?
4. Gaps: git diff per repo (#34398), LSP multi-root?
