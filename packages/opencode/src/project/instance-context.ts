import { LocalContext } from "@/util/local-context"
import { FSUtil } from "@opencode-ai/core/fs-util"
import type { MultiRootWorkspaceID } from "@/workspace/schema"
import type * as Project from "./project"

export interface InstanceContext {
  directory: string
  worktree: string
  project: Project.Info
  /**
   * Full list of directories available to this instance.
   * Always includes `directory` as the first entry when set.
   */
  roots?: string[]
  /** Active multi-root `.code-workspace` id when resolved at middleware time. */
  multiRootWorkspaceID?: MultiRootWorkspaceID
}

export const context = LocalContext.create<InstanceContext>("instance")

/**
 * Check if a path is within the project boundary.
 * Returns true if path is inside ctx.directory OR ctx.worktree.
 * Paths within the worktree but outside the working directory should not trigger external_directory permission.
 */
export function containsPath(filepath: string, ctx: InstanceContext): boolean {
  const roots = ctx.roots?.length ? ctx.roots : [ctx.directory]
  for (const root of roots) {
    if (FSUtil.contains(root, filepath)) return true
  }
  if (FSUtil.contains(ctx.directory, filepath)) return true
  // Non-git projects set worktree to "/" which would match ANY absolute path.
  // Skip worktree check in this case to preserve external_directory permissions.
  if (ctx.worktree === "/") return false
  return FSUtil.contains(ctx.worktree, filepath)
}
