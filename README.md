# Interview Scheduler Application

## Setup Instructions

To get the application running locally, follow these steps:

1. **Clone the repository**:

   1. git clone https://github.com/krvivi28/Schedulify
   2. cd <project-directory>
   3. npm install
   4. npm run dev
   5. The application will be running at http://localhost:{PORT} ( port as indicated in your terminal).

2. **Live Demo**:
   The application is deployed on Vercel. You can directly use the app via the following link:
   URL: https://schedulify-bsqr.vercel.app/
   Screen-Recording G-Drive Link: https://drive.google.com/file/d/12YDbtSQ_bfyXE5ExpRT3Ebq0yskyI5t9/view?usp=sharing

## Application Overview

# Architecture

This application is built using a React frontend and is bundled with Vite. The project follows a component-based architecture for modularity and maintainability.

    •	React: A popular library for building user interfaces. The app uses functional components and React hooks like useState and useEffect to manage state and lifecycle.
    •	Vite: A fast development build tool that bundles the application, optimizes dependencies, and provides a local server for development.
    •	Tailwind CSS: A utility-first CSS framework used for styling the components.
    •	Local Storage: Used for storing user data (e.g., booked slots) across sessions.

Key Components:

    •	App: The main component that ties together the calendar view and the booking slot component. It holds the state for selected dates and manages booked slots.
    •	BookingSlot: Displays available time slots for booking. Users can select a slot and fill out booking details.
    •	Calender: Allows the user to select a date, which determines the available slots for that date.

Data Flow:

    •	The selected date and slots are managed at the App level and passed down to child components (BookingSlot and Calender) as props.
    •	Local storage is used to persist booking information across sessions.

Design Decisions

1. Component-based Architecture:

Each UI element (calendar, booking slots, and forms) is broken into reusable components. This ensures scalability and easier maintainability, as each component handles its own logic and UI rendering.

2. Local Storage for Persistence:

The application stores booking information in the browser’s local storage. This allows user data (such as booked time slots) to persist across page refreshes without requiring a backend server.

3. Slot Selection Algorithm:

The time slots are dynamically generated based on a specified range (e.g., 9 AM to 5 PM). When a user books a slot, the slot is marked as booked, and its state is updated in local storage to prevent double booking.

4. Responsive Design:

The application is designed using Tailwind CSS to ensure it looks good on various screen sizes. The grid layout adjusts to provide a clean, responsive interface across devices.

Technologies Used

    •	React: JavaScript library for building user interfaces.
    •	Vite: Fast development build tool.
    •	Tailwind CSS: Utility-first CSS framework for styling.
    •	Local Storage: Browser storage used for persisting data.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
