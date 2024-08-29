import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaulLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Clients from "./views/clients/Clients";
import ClientRegistration from "./views/clients/components/ClientRegistration";
import EditClient from "./views/clients/components/EditClient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaulLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/users" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/clients/registration",
        element: <ClientRegistration />,
      },
      {
        path: "/clients/edit/:uuid",
        element: <EditClient />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
