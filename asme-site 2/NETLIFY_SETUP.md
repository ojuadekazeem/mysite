# Deploy this site via GitHub + Netlify (auto-deploy)

## One-time setup

1. **Create a GitHub repo** — github.com > New repository.
   Empty repo (no README), private or public.

2. **Upload the project files** to the repo ("uploading an existing file").
   Include: src/, public/, index.html, package.json, package-lock.json,
   vite.config.ts, tsconfig*.json, tailwind.config.js, postcss.config.js,
   .gitignore, eslint.config.js
   Do NOT include: node_modules/, dist/

3. **Connect Netlify** — Netlify > Add new site > Import an existing project
   > GitHub > authorize > select your repo.
   Build settings:
     - Build command:    npm run build
     - Publish directory: dist
   Deploy. Delete the old drag-and-drop site once this works.

## Everyday editing loop

1. Get an edited file (e.g. from Claude).
2. In the GitHub repo, open that file > pencil icon (Edit).
3. Paste the new contents > "Commit changes".
4. Netlify auto-rebuilds. Live in ~1 minute.

Tip: press "." on your repo page to open the full github.dev web editor
(VS Code in the browser) if you'd rather edit several files at once.

## Build settings reference
- Node: 18+ (Netlify default is fine)
- Build command: npm run build
- Publish directory: dist
- Framework: Vite (auto-detected)
