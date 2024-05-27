import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginPage from "./pages/login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import CreateNotePage from "./pages/createNote";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import DetailNotePage from "./pages/detailNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/create-note",
    element: <CreateNotePage />,
  },
  {
    path: "/notes/:slug",
    element: <DetailNotePage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
