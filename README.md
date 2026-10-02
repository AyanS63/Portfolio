# Ayan Shakeel Portfolio

Standalone React JavaScript frontend, packaged with Vite. Includes the portfolio design, 29 verified GitHub repositories, education, achievements, email contact and downloadable CV.

## Run locally

1. Install Node.js 22.13 or newer (Node.js 24 recommended).
2. Extract this ZIP and open the Ayan-Portfolio folder in VS Code.
3. Open a terminal in that folder and run:

```sh
npm install
npm run dev
```

Open the local address printed by Vite (usually http://localhost:5173).
On Windows, if PowerShell blocks npm.ps1, use Command Prompt or run npm.cmd instead of npm.

## Build for deployment

```sh
npm run build
npm run preview
```

The production website is written to `dist`. Deploy that folder to a static website host such as Vercel or Netlify. Use `npm run build` as the build command and `dist` as the output directory. The included asset paths assume deployment at a domain root.

## Edit the website

- `src/App.jsx`: sections, content, navigation and GitHub integration
- `src/styles.css`: colors, fonts, layout and responsive styling
- `src/repos.json`: saved public GitHub repository data
- `public/Ayan_Shakeel_CV.docx`: downloadable CV
- `public/favicon.svg`: browser icon
- `index.html`: title and description

The portfolio requests public repositories from GitHub when opened. If GitHub is unavailable or rate-limits the request, the saved repository list remains visible. Forks and the profile configuration repository are excluded. Repository links are taken from GitHub; demo links appear when a repository lists a homepage. No API key or backend is required. Google Fonts and live GitHub updates require internet access; system fonts and the saved projects provide fallbacks.

This standalone export preserves the site's frontend while removing the managed hosting infrastructure. Dependencies and generated build files are intentionally excluded from the ZIP.
