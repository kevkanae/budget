import {
  createHashHistory,
  ReactRouter,
  RootRoute,
  Route,
  RouterProvider,
} from "@tanstack/react-router";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import Income from "./pages/Income/Income";
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

const routeTree = rootRoute.addChildren([indexRoute, incomeRoute]);

// Set up a ReactRouter instance
const router = new ReactRouter({
  history: createHashHistory(),
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
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
