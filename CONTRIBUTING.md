# Contributing to Pomodoro

Welcome! 👋 We appreciate your interest in contributing to this project.

## 🧭 Branching Strategy

We follow a **GitFlow-inspired** workflow:

- `master`: Stable, production-ready code.
- `develop`: Integration branch for ongoing development.
- `feature/*`: Feature branches based on `develop`.

### 🔀 Workflow Summary

1. **Fork** this repository.
2. **Create a new branch** off `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/<your-branch-name>
   ```
3. Make your changes and **commit often** with clear messages.
4. **Push** your branch to your fork:
   ```bash
   git push origin feature/<your-branch-name>
   ```
5. Open a **pull request to `develop`**.

---

## 🧱 Branch Naming Conventions

Use the following prefixes to keep branches organized:

| Type     | Prefix      | Example                       |
| -------- | ----------- | ----------------------------- |
| Feature  | `feature/`  | `feature/add-search-function` |
| Fix      | `fix/`      | `fix/crash-on-mobile`         |
| Docs     | `docs/`     | `docs/update-readme`          |
| Chore    | `chore/`    | `chore/update-deps`           |
| Refactor | `refactor/` | `refactor/improve-validation` |

- Use **dashes** (`-`) to separate words.
- Keep branch names **short but descriptive**.
- You don't need to include issue numbers.

---

## ✅ Pull Request Guidelines

- Target your PR to the `develop` branch.
- Use a clear, concise title and description.
- Include screenshots or logs if applicable.
- Ensure your code passes all checks (lint/tests).
- Be respectful and constructive in discussions.

---

## 🚫 Merging Rules

- **Anyone can open PRs** to `develop`.
- Only maintainers can **merge** to `develop` or `master`.
- No direct pushes to `develop` or `master` are allowed.

---

Thank you for contributing! 🎉
