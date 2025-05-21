# Train Ticket Machine - Frontend

Read this pdf for additional reference [Train Ticket Machine](./docs/train-ticket-machine-frontend-v2-2-.pdf)


## Assumptions

Overall requirements:
- Design with a special focus on accessibility (a11y) tailored for touchscreens.
- Start with a single search box for the departure station, accompanied by a dynamic suggestion list.

Suggestions approach:
- **Inline Suggestion:**
  Display the most likely next character as ghost text (muted color) at the cursor position while the user types.
- **Highlight in the Result List:**
  In the list of stations that match the input, highlight the next character following the entered substring (e.g., if the user types "DAR", highlight the subsequent character in each matching station name).
- **Dedicated Suggestions Header:**
  Place a header above the results reading "Available next characters:" followed by a list of unique valid characters extracted from the matching station names. This header can work in two variants:
  - **Variant A (Clickable):** Interactive pills/chips that, when tapped, append the corresponding character to the search input.
  - **Variant B (Non-clickable):** A non-interactive, informational display.
- **A/B Testing:**
  Use Statsig to experiment between the clickable (Variant A) and non-clickable (Variant B) dedicated suggestions headers to determine which method optimizes user input efficiency.

Operational requirements:
- **Preloading Data:**
  Load all station data (around 10,000 records - using this URI for central system data: https://raw.githubusercontent.com/abax-as/coding-challenge/master/station_codes.json) upfront to facilitate immediate response through in-memory searching.
- **Caching:**
  Enable smooth search experience even with intermittent connectivity (I can use React Query for this for example).
- **Local Storage:**
  Persist the 5 most recent search records using the browser's Web API (localStorage).
- **Observability:**
  - Error tracking and session replay (Sentry?).
  - Monitoring user interactions and usage metrics (GA?).
  - Feature flagging and A/B testing of UI variants (Statsig?).

## Flowchart diagram

[Flowchart diagram](./docs/flowchart-diagram.md)

## Local Development

During development, you have two options:

1. **Run both the app and Storybook together:**
   ```bash
   npm run dev:all
   ```
   - Main app will be available at http://localhost:5173
   - Going to http://localhost:5173/storybook will automatically redirect you to Storybook at http://localhost:6006

2. **Run just Storybook:**
   ```bash
   npm run storybook
   ```
   This will start Storybook directly on port 6006, accessible at http://localhost:6006

### Deployed version

In production, Storybook is:
- Built alongside the main application in a separate `dist/storybook` directory
- Deployed to the `/storybook` path on the same domain
- Available at https://d3i19dhhon0a88.cloudfront.net/storybook

## TODO

- [x] Create a project from the template
- [x] Add necessary configuration for linting, formatting, testing, etc.
- [x] Add tool for components documentation
- [x] Configure unit tests
- [x] Dockerize the app
- [x] Setup CI/CD pipeline
- [x] Configure Storybook on path /storybook
- [] Add search for departure station
- [] Add suggestion list
- [] Add a result list
- [] Handle errors and loading states
- [] Add error and user interaction logging
- [] Add A/B testing
- [] Add search for arrival station
- [] Display results of selected route (price, duration)

## Note on the starter template

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```