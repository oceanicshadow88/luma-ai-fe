# Luma AI Frontend

A modern frontend scaffold for the **Luma AI** platform, built with [Vite](https://vitejs.dev/), and ready for scalable, testable, and maintainable development.

---

## 📦 Tech Stack

- **React** – Component-based UI library
- **TypeScript** – Strongly typed JavaScript
- **Vite** – Lightning-fast frontend build tool
- **ESLint** – Code linting for consistent style and error prevention
- **Prettier** – Code formatting and style enforcement
- **Cypress** – End-to-end testing framework
- **.env** – Environment variable management
- _(SonarQube integration planned)_

---

## 📁 Project Structure

```
luma-ai-frontend/
└─ src/
   ├─ app/                         # App routing layer (uses file-based routing)
   │  └─ [module]/[page-name]/     # Module-based route folders
   │     └─ page.tsx               # Page-level entry point (route-based)
   │
   ├─ assets/                      # Static assets
   │
   ├─ components/                  # Global reusable UI components
   │
   ├─ features/                    # Domain-specific modules
   │  └─ [module]/                 # A single feature module
   │     ├─ components/            # Module-scoped UI components
   │     ├─ hooks/                 # Module-scoped React hooks
   │     ├─ schemas.ts             # Zod validation schemas for forms
   │     └─ types.ts               # Module-specific types and interfaces
   │
   ├─ api/                         # API layer: HTTP client & endpoint wrappers
   │  └─ [module]/                 # A single feature module
   │      └─ [resource].ts         # Organized by resource
   │
   ├─ hooks/                       # Global reusable hooks (cross-feature)
   │
   ├─ services/                    # Infrastructure services (e.g., storage, auth client, i18n)
   │
   ├─ types/                       # Global shared types and interfaces
   │
   └─ styles/                      # Global styles, Tailwind config, variables, etc.

```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/luma-ai-frontend.git
cd luma-ai-frontend
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Start development server

```bash
yarn run dev
```

App will be served at [http://localhost:5173](http://localhost:5173)

---

## 🔧 Scripts

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `yarn run dev`     | Start development server         |
| `yarn run build`   | Build for production             |
| `yarn run preview` | Preview production build locally |
| `yarn run format`  | Format code using Prettier       |
| `yarn run lint`    | Run ESLint to check code style   |
| `npx cypress open` | Open Cypress GUI for testing     |
| `npx cypress run`  | Run Cypress tests in CLI         |

---

## 🌐 Environment Variables

cp .env.example .env

NOTE: UPDATE THE ENV ACCORDING TO YOUR ENVIRONMENT

---

## 🧪 PlayWright E2E Test


```bash
# run test
npx playwright test

# Show result
npx playwright show-report

# debug and gui mode
npx playwright test --ui\

# GenCode mode. First, make sure your dev server is running manually
yarn dev & 
npx playwright codegen http://localhost:5173
```

Tests are located in the `cypress/e2e/` folder.

---

## 🔍 Linting with ESLint

To check for code issues:

```bash
npm run lint
```

ESLint is preconfigured via `.eslintrc.js`.  
It is recommended to use it together with Prettier for consistent formatting.

---

## 🎨 Code Formatting (Prettier)

To format the codebase:

```bash
npm run format
```

Prettier settings are in `.prettierrc`, and unnecessary files are ignored via `.prettierignore`.

---

## 📊 Planned: SonarQube Integration

We plan to integrate SonarQube for static code analysis and quality gates.  
It will include:

- `sonar-project.properties` config
- CLI support via `sonar-scanner`
- Optional GitHub Actions integration

---

## 🤝 Contribution Guide

> Coming soon...

---

## 📄 License

MIT – © 2025 Luma AI

> > > > > > > feature/frontend-init
