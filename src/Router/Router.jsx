import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../Authentication/LoginPage/LoginPage";
import RestaurantDashboard from "../Layouts/RestaurantDashboard/RestaurantDashboard";
import HrDesignationIndex from "../Pages/HR_Pages/HrDesignation/HrDesignationIndex";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import HrDesignationCreate from "../Pages/HR_Pages/HrDesignation/HrDesignationCreate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/RestaurantDashboard/Index",
        element: <RestaurantDashboard />
      },
      {
        path: "hr/designation/Index",
        element: <HrDesignationIndex />,
      },
      {
        path: "hr/designation/Index/Create",
        element: <HrDesignationCreate />,
      },
    ],
  },
 
]);
