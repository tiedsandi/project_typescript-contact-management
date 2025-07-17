import {
  CreateContactPage,
  DashboardPage,
  createContactAction,
  dashboardLoader,
} from "@/features/dashboard";
import { LoginPage, loginAction } from "@/features/login";
import { ProfilePage, profileLoader } from "@/features/profile";
import { RegisterPage, registerAction } from "@/features/register";

import AuthLayout from "@/components/layouts/AuthLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { HomePage } from "@/features/home";
import LoadingScreen from "@/components/LoadingScreen";
import { createBrowserRouter } from "react-router";

// import ProtectedRoute from "@/middleware/ProtectedRoute";

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
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
        loader: dashboardLoader,
        HydrateFallback: LoadingScreen,
      },
      {
        path: "profile",
        element: <ProfilePage />,
        loader: profileLoader,
        HydrateFallback: LoadingScreen,
      },
      {
        path: "contacts/create",
        element: <CreateContactPage />,
        loader: dashboardLoader,
        action: createContactAction,
        // HydrateFallback: LoadingScreen,
      },
    ],
  },
]);
export default Router;
