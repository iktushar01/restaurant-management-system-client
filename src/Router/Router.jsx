import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../Authentication/LoginPage/LoginPage";
import RestaurantDashboard from "../Layouts/RestaurantDashboard/RestaurantDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/RestaurantDashboard/Index",
    element: <RestaurantDashboard />,
  },
]);
