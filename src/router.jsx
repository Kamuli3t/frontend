import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import BookReviewListPage from "./pages/BookReviewListPage";

import HomePage from "./pages/HomePage";
import BookReviewPage from "./pages/BookReviewPage";
import MessageMePage from "./pages/MessageMePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditBookReviewPage from "./pages/EditBookReviewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "book/:bookId/edit",
        element: <EditBookReviewPage />,
      },
      {
        path: "/book/:bookId",
        element: <BookReviewPage />,
      },
      {
        path: "book",
        element: <BookReviewListPage />,
      },

      {
        path: "message",
        element: <MessageMePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
