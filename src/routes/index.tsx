import { LoginPage, loginAction } from "@/features/login";
import { RegisterPage, registerAction } from "@/features/register";

import AuthLayout from "@/components/layouts/AuthLayout";
import { HomePage } from "@/features/home";
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
        action: registerAction,
      },
      {
        path: "/login",
        element: <LoginPage />,
        action: loginAction,
      },
    ],
  },
  // { path: "/", element: <HomePage /> }
]);
export default Router;
