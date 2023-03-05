import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./styles/main.scss";
import Loader from "./components/Loader/Loader";
import Layout from "./layouts/Layout";
import Home from "./pages/Home/Home";

const Debts = lazy(() => import("./pages/Debts/Debts"));
const Expenses = lazy(() => import("./pages/Expenses/Expenses"));
const Income = lazy(() => import("./pages/Income/Income"));
const Investments = lazy(() => import("./pages/Investments/Investments"));
const Profiles = lazy(() => import("./pages/Profiles/Profiles"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "income",
        element: <Income />,
      },
      {
        path: "expense",
        element: <Expenses />,
      },
      {
        path: "debt",
        element: <Debts />,
      },
      {
        path: "investment",
        element: <Investments />,
      },
    ],
  },
  {
    path: "/profiles",
    element: <Profiles />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
