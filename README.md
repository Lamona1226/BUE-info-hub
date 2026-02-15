# BUE Info Hub

Public website and information hub for BUE admissions-related content.

## Local development

Prerequisites:
- Node.js 18+ (Node.js 20 recommended)
- npm

Setup:

```sh
git clone https://github.com/Lamona1226/BUE-info-hub.git
cd BUE-info-hub
npm install
npm run dev
```

Build and preview:

```sh
npm run build
npm run preview
```

## Tech stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Deployment (GitHub Pages)

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

When code is pushed to `main`, the workflow:
- installs dependencies
- builds the production site
- deploys the build output to GitHub Pages

Production URL:
- https://lamona1226.github.io/BUE-info-hub/

## Suggested Git workflow

For routine updates:

```sh
git status
git add -A
git commit -m "Describe your change"
git push
```

For feature work:

```sh
git checkout -b feature/short-name
# make changes
git add -A
git commit -m "Add feature"
git push -u origin feature/short-name
```
