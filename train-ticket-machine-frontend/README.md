# User Interface for Train Ticket Machine

Read this pdf for additional reference [Train Ticket Machine](./docs/train-ticket-machine-frontend-v2-2-.pdf)

## TODO

- [] Create a skeleton of the project
- [] Add tool for components documentation
- [] Configure unit tests
- [] Setup CI/CD pipeline
- [] Add search for departure station
- [] Add suggestion list
- [] Add a result list
- [] Handle errors and loading states
- [] Add error and user interaction logging
- [] Add A/B testing
- [] Dockerize the app
- [] Add search for arrival station
- [] Display results of selected route (price, duration)

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

![Flowchart diagram](./docs/flowchart-diagram.md)
