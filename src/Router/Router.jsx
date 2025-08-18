import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../Authentication/LoginPage/LoginPage";
import RestaurantDashboard from "../Layouts/RestaurantDashboard/RestaurantDashboard";
import HrDesignationIndex from "../Pages/HR_Pages/HrDesignation/HrDesignationIndex";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import HrDesignationCreate from "../Pages/HR_Pages/HrDesignation/HrDesignationCreate";
import HrDesignationEditById from "../Pages/HR_Pages/HrDesignation/HrDesignationEditById";
import BankInfoIndex from "../Pages/Bank_pages/Bank/BankInfoIndex";
import BankInfoCreate from "../Pages/Bank_pages/Bank/BankInfoCreate";
import BankInfoEditById from "../Pages/Bank_pages/Bank/BankInfoEditById";
import BranchInfoIndex from "../Pages/Bank_pages/Branch_Page/BranchInfoIndex";
import BranchInfoCreate from "../Pages/Bank_pages/Branch_Page/BranchInfoCreate";
import BranchInfoEditById from "../Pages/Bank_pages/Branch_Page/BranchInfoEditById";

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
      //===================================//
      //============= Hr Menu =============//
      //===================================//
      {
        path: "hr/designation/Index",
        element: <HrDesignationIndex />,
      },
      {
        path: "hr/designation/Index/Create",
        element: <HrDesignationCreate />,
      },
      {
        path: "hr/designation/Index/Edit/:id",
        element: <HrDesignationEditById />,
      },
      //===================================//
      //============= Bank Menu =============//
      //===================================//
      {
        path: "bank/bankinfo/Index",
        element: <BankInfoIndex />,
      },
      {
        path: "bank/bankinfo/Index/Create",
        element: <BankInfoCreate />,
      },
      {
        path: "bank/bankinfo/Index/Edit/:id",
        element: <BankInfoEditById />,
      },
      //===============================================//
      {
        path: "bank/BankBranchInfo/Index",
        element: <BranchInfoIndex />, 
        
      },
      {
        path: "bank/BankBranchInfo/Index/Create",
        element: <BranchInfoCreate />,
      },
      {
        path: "bank/BankBranchInfo/Index/Edit/:id",
        element: <BranchInfoEditById />,
      },
    ],
  },
]);
