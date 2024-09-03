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
import ClientsLayout from "./views/clients/ClientLayout";
import ProductsLayout from "./views/products/ProductLayout";
import Products from "./views/products/Products";
import ProductRegistration from "./views/products/components/ProductRegistration";
import ProductCategorieRegistration from "./views/products/components/ProductCategorieRegistration";
import EditProduct from "./views/products/components/EditProduct";

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
        element: <ClientsLayout />,
        children: [
          {
            path: "",
            element: <Clients />,
          },
          {
            path: "registration",
            element: <ClientRegistration />,
          },
          {
            path: "edit/:uuid",
            element: <EditClient />,
          },
        ],
      },
      {
        path: "/products",
        element: <ProductsLayout />,
        children: [
          {
            path: "",
            element: <Products />,
          },
          {
            path: "registration",
            element: <ProductRegistration />,
          },
          {
            path: "categories/registration",
            element: <ProductCategorieRegistration />,
          },
          {
            path: "edit/:uuid",
            element: <EditProduct />,
          },
        ],
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
