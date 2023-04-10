import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Layout from "./layouts/Layout";
import Home from "./pages/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Init from "./pages/Init/Init";
import RootModal from "./components/Modals/Root.modal";
import { ToastContainer } from "react-toastify";
import AppTheme from "./styles/Theme";
import Add from "./pages/Add/Add";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <AppTheme>
          <ToastContainer />
          <RootModal />
          <RouterProvider router={router} />
        </AppTheme>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);
