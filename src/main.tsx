import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Layout from "./layouts/Layout";
import Home from "./pages/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Splash from "./pages/Splash/Splash";
import RootModal from "./components/Modals/Root.modal";
import AppTheme from "./styles/Theme";

const queryClient = new QueryClient();

const Debts = lazy(() => import("./pages/Debts/Debts"));
const Expenses = lazy(() => import("./pages/Expenses/Expenses"));
const Income = lazy(() => import("./pages/Income/Income"));
const Investments = lazy(() => import("./pages/Investments/Investments"));
const Profiles = lazy(() => import("./pages/Profiles/Profiles"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
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
      <QueryClientProvider client={queryClient}>
        <AppTheme>
          <RootModal />
          <RouterProvider router={router} />
        </AppTheme>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);
