import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Layout from "./layouts/Layout";
import Home from "./pages/Home/Home";
import Init from "./pages/Init/Init";
import { ToastContainer } from "react-toastify";
import AppTheme from "./styles/Theme";
import Add from "./pages/Add/Add";

const Profiles = lazy(() => import("./pages/Profiles/Profiles"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Init />,
  },
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":type",
        element: <Add />,
      },
    ],
  },
  {
    path: "/profile",
    element: <Profiles />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <AppTheme>
        <ToastContainer />
        <RouterProvider router={router} />
      </AppTheme>
    </Suspense>
  </React.StrictMode>
);
