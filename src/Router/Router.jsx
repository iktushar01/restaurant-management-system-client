import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../Authentication/LoginPage/LoginPage";
import RestaurantDashboard from "../Layouts/RestaurantDashboard/RestaurantDashboard";
import HrDesignationIndex from "../Pages/HR_Pages/HrDesignation/HrDesignationIndex";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import HrDesignationCreate from "../Pages/HR_Pages/HrDesignation/HrDesignationCreate";
import HrDesignationEditById from "../Pages/HR_Pages/HrDesignation/HrDesignationEditById";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/RestaurantDashboard/Index" replace />,
      },
      {
        path: "RestaurantDashboard/Index",
        element: <RestaurantDashboard />,
      },
      {
        path: "hr/designation/Index",
        element: <HrDesignationIndex />,
      },
      {
        path: "hr/designation/Index/Create",
        element: <HrDesignationCreate />,
      },
      {
        path: "hr/designation/Index/Edit/:id", // ID needed
        element: <HrDesignationEditById />,
      },
    ],
  },
]);
