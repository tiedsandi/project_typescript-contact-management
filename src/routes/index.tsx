import AuthLayout from "@/components/layouts/AuthLayout";
import { HomePage } from "@/features/home";
import RegisterPage from "@/features/register/RegisterPage";
import { createBrowserRouter } from "react-router";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <h1>Logiin</h1>,
      },
    ],
  },
  // { path: "/", element: <HomePage /> }
]);
export default Router;
