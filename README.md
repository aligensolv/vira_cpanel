Of course. Here is a professionally styled and comprehensive documentation for your Vira Admin Panel, created with context from your project structure images.

---

# Admin Panel (CPanel) Documentation

## Overview

The Vira Admin Panel is a comprehensive web application designed for administrators to manage all aspects of the Vira ecosystem. It provides a secure and intuitive interface for overseeing users, places, bookings, regions, and system settings.

## Features

-   **Dashboard Analytics**: Visualize key metrics, including revenue, booking statuses, and recent activities.
-   **User Management**: View, filter, and manage all registered users in the system.
-   **Place Management**: Create, edit, and manage all bookable places.
-   **Region Management**: Organize places by creating and managing regions.
-   **Booking Oversight**: Monitor and view details of all bookings made by users.
-   **Settings**: Configure user profiles, notifications, and security settings.

## Tech Stack

-   **Framework**: React (Vite)
-   **Language**: TypeScript
-   **Routing**: React Router DOM
-   **State Management**: Redux Toolkit
-   **Data Fetching**: React Query (TanStack Query) for API communication.
-   **Styling**: Tailwind CSS with a component-based approach.
-   **Forms**: Reusable components for handling forms and validation.
-   **Authentication**: JWT (JSON Web Token) based authentication.

---

## Project Structure

The project follows a **feature-based architecture**, where the UI, logic, and data-related code for each feature are co-located.

```
src/
├── assets/             # Static assets like images and fonts.
│
├── components/
│   ├── layout/         # Core layout components (Sidebar, Header, etc.).
│   └── ui/             # Reusable, generic UI components (Button, Card, Dialog).
│
├── core/
│   ├── constants/      # App-wide constants.
│   ├── hooks/          # Global custom hooks.
│   └── utils/          # Utility functions shared across the app.
│
├── features/
│   ├── auth/           # Authentication pages and logic.
│   ├── dashboard/      # Dashboard widgets and data hooks.
│   ├── places/         # Pages, components, hooks, and schemas for places.
│   ├── regions/        # Logic and UI for managing regions.
│   ├── users/          # Components and hooks for user management.
│   └── ... (other features)
│
├── lib/                # Third-party library configurations (e.g., Axios).
│
├── providers/          # Global context providers (Redux, Notifications).
│
└── router.tsx          # Main application routing configuration.
```

---

## Authentication

-   **Login**: Administrators log in using a secure form. The credentials are sent to the backend API.
-   **Token Handling**: Upon successful login, a JWT is returned and stored securely in memory or local storage.
-   **Authenticated Requests**: An Axios instance is configured to automatically attach the JWT as an `Authorization` header to all outgoing API requests.
-   **Route Protection**: The application uses a `ProtectedLayout` component to guard authenticated routes. Any unauthorized attempt to access these routes will result in a redirect to the login page.

---

## State Management & Data Fetching

-   **Global State**: **Redux Toolkit** is used for managing global UI state, such as the application-wide notification system.
-   **Server State**: **React Query (TanStack Query)** is the primary tool for fetching, caching, and updating data from the server. This simplifies data management by handling loading states, errors, and re-fetching automatically.
-   **Custom Hooks**: Each feature contains custom hooks (e.g., `use-places`, `use-users`) that encapsulate the React Query logic for that specific feature. This makes the data-fetching logic reusable and easy to consume within components.

---

## Styling

The UI is built using **Tailwind CSS**, following a utility-first approach. Reusable UI elements like buttons, cards, and inputs are abstracted into their own components inside `src/components/ui` to ensure a consistent look and feel across the application.

---

## Error Handling

-   **API Errors**: The configured Axios client intercepts API errors. A global notification provider (`notification-provider.tsx`) listens for these errors and displays them as toast notifications to the user.
--   **Form Validation**: Client-side validation is handled within the feature's `schema` directory (using a library like Zod or Yup). Validation errors are displayed inline next to the respective form fields to provide immediate feedback.

---

## Deployment

To prepare the application for a production environment, run the following commands:

```bash
# 1. Build the application for production
npm run build

# 2. Preview the production build locally (optional)
npm run preview
```

After building, deploy the contents of the `dist/` directory to your hosting provider. Ensure that all required environment variables are correctly configured in the production environment.