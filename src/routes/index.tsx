import { LoginPage, loginAction } from "@/features/login";
import { ProfilePage, profileLoader } from "@/features/profile";
import { RegisterPage, registerAction } from "@/features/register";

import AuthLayout from "@/components/layouts/AuthLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { DashboardPage } from "@/features/dashboard";
import { HomePage } from "@/features/home";
import LoadingScreen from "@/components/LoadingScreen";
import ProtectedRoute from "@/middleware/ProtectedRoute";
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
        path: "register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: "profile",
        element: <ProfilePage />,
        loader: profileLoader,
        HydrateFallback: LoadingScreen,
      },
    ],
  },
]);
export default Router;
