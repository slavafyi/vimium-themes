# Agent Notes

## Size Limit

- Vimium saves CSS for Vimium UI in `chrome.storage.sync`, which allows at most 8,192 bytes per setting, counting the key name and the value as JSON. A larger value fails to save, and the options page shows no error.
- Users paste the built files from `dist/`, not the readable files in `themes/`.
- Run `pnpm build` after every theme change. It prints each size and fails when a theme is over the limit.
- Zed has the least room. Reuse existing rules and variables before adding new ones, and remove declarations that have no visible effect.

## Where Styles Apply

- Vimium injects the CSS into every web page and into its own pages: Vomnibar, HUD, help dialog, options, and commands.
- Scope every rule to Vimium's own classes or structures so websites are not affected. Keep the `--vx-` prefix on variables, because they are set on `:root` of every page.
- The Vomnibar, HUD, and help dialog frames are inside a shadow DOM, so page-level rules cannot size or position them. Style the content inside those pages instead.
- `@import` is ignored in the CSS that Vimium adds to web pages.
- The toolbar popup does not load custom CSS.

## Editing Rules

- Keep `themes/minimal.css` and `themes/zed.css` structurally aligned.
- Do not add code comments.
- Check visual changes in `preview.html` in light and dark mode.

## Checks

- Run `pnpm fmt:check`, `pnpm lint`, and `pnpm build` before committing.

## Commits

- Use Conventional Commits.
- Keep the commit subject on a single line and at most 79 characters.
- Unless the user explicitly asks for it, do not add a commit body/description.
