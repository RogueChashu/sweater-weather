# Sweater Weather?

[View Live Demo](https://sweater-weather-puce.vercel.app/)

![Preview of weather app](https://github.com/RogueChashu/sweater-weather/blob/main/src/assets/Sweaterweather%202026-06-15.gif)

I built this weather application in several distinct phases to solidify my understanding of modern web development fundamentals and to practice scaling a codebase.

## Phase 1: The Vanilla JS Foundation

The original goal of this project (Phase 1) was to understand asynchronous JavaScript. I chose a weather application because it requires reliable, real-time data fetching.

- API Integration: Built robust connections to the Visual Crossing API.

- Asynchronous JS: Handled network requests using modern async/await syntax, ensuring proper resolution of Promises.

- Error Handling: Implemented UI feedback for failed API calls, network issues.


## Phase 2: The TypeScript Refactor

To improve the codebase, I refactored the entire project into TypeScript (Phase 2).

- Type Safety: Created strict interfaces for the API responses, which eliminated runtime errors caused by undefined data.

- Maintainability: The conversion to TypeScript made the code self-documenting, making it significantly easier to read and scale.

- Developer Experience: Leveraged TS compiler checks to catch bugs during development rather than in the browser.


## Phase 3: Responsive UI & Polish

With a solid, type-safe foundation in place, I shifted focus to the user interface to ensure the application was accessible and usable across all devices.

- Responsive Design: Implemented CSS media queries and fluid layouts so the dashboard adapts seamlessly to mobile, tablet, and desktop screens.

- Cross-Device Testing: Established logical breakpoints to ensure data visualization remains readable regardless of viewport width.

- Iterative Polish: Refined the UI to provide a clean, modern aesthetic that highlights the data without overwhelming the user.


## Phase 4: Autocomplete Search & Geocoding Refinement

To improve the search experience and data reliability, the search flow was overhauled with geocoding at its core.

- Autocomplete: Integrated a geocoding API to surface live city suggestions as the user types, with debouncing to minimize unnecessary API calls.

- Geocoding-first search: All weather lookups are now driven by GPS coordinates rather than raw text strings, ensuring consistent results regardless of how a city name is entered.

- Reverse geocoding: Location display names are always resolved through reverse geocoding, guaranteeing well-formatted, human-readable city labels across both default (GPS-based) and user-initiated searches.

- Unified search flow: Refactored the search pipeline so every code path — initial load, geolocation, and manual search — follows the same coordinate-driven logic, eliminating edge cases in location handling.


## Tech stack:
- Core: React, Typescript, Vite
- Styling: Vanilla CSS
- Backend: Vercel Serverless Functions
- Deployment: Vercel

## Features:
- Loads local weather automatically on launch using device geolocation
- Search any city worldwide with live autocomplete suggestions
- 5-day forecast with daily temperature range and conditions
- Fully responsive layout across mobile, tablet, and desktop
- Toggle between °C and °F
- Dark / light modes

