# Frontend Project and personal Book Reviews

This project is a React-based frontend application built with Vite. It provides the user interface for a book review application, allowing users to view book reviews, and administrators to manage reviews.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool for modern web development.
- **React Router DOM:** For handling navigation within the application.
- **Axios:** For making HTTP requests to the backend API.
- **Redux Toolkit:** For state management (specifically for `isAdmin` state).
- **Tailwind CSS:** A utility-first CSS framework for styling.

## Project Structure

The project is structured as follows:

- `index.html`: The main HTML file.
- `src/`: Contains the application's source code.
  - `main.jsx`: The entry point for the React application.
  - `App.jsx`: The main application component.
  - `router.js`: Configures the React Router routes.
  - `components/`: Reusable React components.
    - `Layout.jsx`: Provides the basic layout structure for the pages.
    - `Nav.jsx`: The navigation bar component.
    - `BookReviewCard.jsx`: Displays a single book review in the list.
  - `pages/`: React components for different pages.
    - `HomePage.jsx`: The homepage.
    - `BookReviewPage.jsx`: Displays details for a single book review.
    - `LoginPage.jsx`: Handles user login and signup.
    - `MessageMePage.jsx`: A page for messaging functionality.
    - `NotFoundPage.jsx`: Displays a "Not Found" message.
  - `store/`: Redux store configuration.
    - `store.js`: Configures the Redux store.
    - `isAdminSlice.js`: Redux slice for isAdmin state.

## Key Features

- **User Authentication:**
  - Admin login and signup functionality.
  - Manages user authentication using `sessionStorage` for storing tokens.
  - Uses Redux Toolkit to manage the `isAdmin` state.
- **Book Review Management:**
  - Displays lists of book reviews.
  - Displays individual book review details.
  - Provides functionality for admins to create and delete book reviews.
  - Integrates with the Google Books API for searching and adding book information.
- **Navigation:**
  - Uses React Router for client-side navigation.
  - Includes a navigation bar component.
- **Styling:**
  - Styled using Tailwind CSS.
- **Modern Development:**
  - Built with Vite for fast development and optimized builds.
  - Uses ES Modules.
