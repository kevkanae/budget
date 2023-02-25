import {
  ReactRouter,
  RootRoute,
  Route,
  RouterProvider,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import Loader from "./components/Loader/Loader";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";

const Debts = lazy(() => import("./pages/Debts/Debts"));
const Expenses = lazy(() => import("./pages/Expenses/Expenses"));
const Income = lazy(() => import("./pages/Income/Income"));
const Investments = lazy(() => import("./pages/Investments/Investments"));
// import { invoke } from "@tauri-apps/api/tauri";

const rootRoute = new RootRoute({
  component: () => <Layout />,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Home />,
});

const incomeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/income",
  component: () => <Income />,
});

const expenseRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/expense",
  component: () => <Expenses />,
});

const debtRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/debt",
  component: () => <Debts />,
});

const investmentRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/investment",
  component: () => <Investments />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  incomeRoute,
  expenseRoute,
  debtRoute,
  investmentRoute,
]);

// Set up a ReactRouter instance
const router = new ReactRouter({
  // history: createHashHistory(),
  routeTree,
  defaultPreload: "intent",
});

// Typesafety for the router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
