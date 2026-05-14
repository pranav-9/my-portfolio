---
name: ship
description: |
  Final gate before merging: conventions check on the diff, full build verify,
  commit with a generated message, push. Use after /build has implemented a
  feature and the user has reviewed the diff. Also usable standalone on any
  uncommitted changes.
allowed-tools:
  - Read
  - Bash
  - Grep
  - Glob
  - AskUserQuestion
---

# ship — review + verify + commit + push

You are the last gate before code lands. Run mechanically; refuse to commit if any check fails.

## Phase 1 — Confirm there's something to ship

```bash
git status --short
```

If clean, stop: "Nothing to ship — working tree clean." If there are staged but unrelated changes, ask the user to stage selectively before continuing.

## Phase 2 — Conventions check on the diff

Get the diff scope:

```bash
git diff --name-only HEAD
```

For each changed `.tsx`/`.ts` file under `src/app/` or `src/components/`, run these checks. Report ALL findings before fixing anything — don't fix-as-you-go.

1. **Hex literals in JSX** — `grep -nE "#[0-9a-fA-F]{3,8}" <files>`. Flag any match in JSX (allowed inside [src/app/globals.css](src/app/globals.css) and config files; not allowed in `.tsx`).
2. **Shadcn tokens leaking into sections** — `grep -nE "(--primary|--foreground|--background|--muted|--accent|--card|--popover|--secondary|--destructive)" src/app/`. Excluding `src/app/globals.css`. Flag matches.
3. **File placement** — new section components (top-level component default-exported from a file in `src/app/`) must NOT be in `src/components/` unless they're shadcn primitives in `src/components/ui/`. Inversely, anything new in `src/components/ui/` should look like a shadcn primitive.
4. **Reveal wrapper** — if a new section component is added in `src/app/`, grep it for `<Reveal`. Flag if missing (warning, not blocker — some sections legitimately don't fade).
5. **cn() usage** — `grep -nE "className=\{.*\?.*:.*\}" <new .tsx files>`. If conditional class composition is present, grep the same file for `import.*cn.*from.*@/lib/utils`. Flag missing import.

If any blocker (1, 2, 3) fires, stop and report. Ask the user whether to fix now or abort. Warnings (4, 5) print but don't block.

## Phase 3 — Verify build

Run in order, stop at first failure:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

If `npm run build` fails, do NOT commit. Report the failure and stop.

## Phase 4 — Commit

Inspect the diff briefly to draft a one-line commit message in the style of recent commits — check with `git log --oneline -5`. Recent style is terse and lowercase ("simplify", "clean"). Match it.

For new features, prefer: `add <feature>` or `<feature>: <what changed>`. Skip "feat:" prefixes unless recent log uses them.

Show the message and the file list to the user via **AskUserQuestion** before committing — options: "Commit", "Edit message", "Abort". Only proceed on "Commit".

Then:

```bash
git add <specific files — not -A>
git commit -m "<message>"
```

Do NOT include the Claude co-author trailer here — this is the user's portfolio, treat commits as theirs. Do NOT use `--no-verify`.

## Phase 5 — Push

Ask via **AskUserQuestion**: "Push to origin/main now?" — options: "Push", "Hold".

On "Push":

```bash
git push
```

On "Hold": stop and say "Committed locally. Run `git push` when ready."

## Phase 6 — Hand off

After push, output:

```
Shipped <short message>. Vercel will pick it up.
```

Stop. Do not open the Vercel dashboard, do not poll deploy status — that's out of scope for this skill.
