import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../Authentication/LoginPage/LoginPage";
import RestaurantDashboard from "../Layouts/RestaurantDashboard/RestaurantDashboard";
import HrDesignationIndex from "../Pages/HR_Pages/HrDesignation/HrDesignationIndex";
import MainLayout from "../Layouts/MainLayout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
   {
    path: "/RestaurantDashboard/Index",
    element: <RestaurantDashboard />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "hr/designation/Index",
        element: <HrDesignationIndex />,
      },
    ],
  },
 
]);
