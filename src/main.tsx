import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Root";
import Booking from "./pages/Booking/Booking";
import Confirmation from "./pages/Confirmation/Confirmation";
import ErrorPage from "./pages/Error/Error";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Booking /> },
        { path: "confirmation", element: <Confirmation /> },
      ],
    },
  ],
  {
    // Remove warnings from React-Router
    future: {
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </StrictMode>
);
