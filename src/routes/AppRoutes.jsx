import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import Home from "../pages/home/Home";

import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
