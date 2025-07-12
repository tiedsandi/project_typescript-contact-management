import { HomePage } from "@/features/home";
import { createBrowserRouter } from "react-router";

const Router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  // { path: "/", element: <HomePage /> }
]);
export default Router;
