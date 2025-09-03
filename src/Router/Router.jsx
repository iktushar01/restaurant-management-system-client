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
import BankAccountInfoIndex from "../Pages/Bank_pages/Transactions/BankAccountInfoIndex";
import BankAccountInfoCreate from "../Pages/Bank_pages/Transactions/BankAccountInfoCreate";
import BankAccountInfoEditById from "../Pages/Bank_pages/Transactions/BankAccountInfoEditById";
import BankTransactionIndexById from "../Pages/Bank_pages/Transactions/BankTransactionIndexById";
import BankTransactionIndexByIdCreate from "../Pages/Bank_pages/Transactions/BankTransactionIndexByIdCreate";
import BankTransactionIndexByIdEdit from "../Pages/Bank_pages/Transactions/BankTransactionIndexByIdEdit";
import BankStatementsIndex from "../Pages/Bank_pages/Transactions/BankStatementsIndex";
import OthersIncomeHeadIndex from "../Pages/Income_pages/AddIncome/OthersIncomeHeadIndex";
import OthersIncomeHeadCreate from "../Pages/Income_pages/AddIncome/OthersIncomeHeadCreate";
import OthersIncomeHeadEditById from "../Pages/Income_pages/AddIncome/OthersIncomeHeadEditById";
import OtherIncomeIndex from "../Pages/Income_pages/ManageIncome/OtherIncomeIndex";
import OtherIncomeIndexCreate from "../Pages/Income_pages/ManageIncome/OtherIncomeIndexCreate";
import DailyIncome from "../Pages/Income_pages/DayWiseIncome/DailyIncome";
import DailyIncomeDetails from "../Pages/Income_pages/DayWiseIncome/DailyIncomeDetails";
import ExpenseHeadIndex from "../Pages/Expense_pages/Add_Expense/ExpenseHeadIndex";
import ExpenseHeadCreate from "../Pages/Expense_pages/Add_Expense/ExpenseHeadCreate";
import ExpenseHeadEditById from "../Pages/Expense_pages/Add_Expense/ExpenseHeadEditById";
import ExpenseIndex from "../Pages/Expense_pages/ManageExpense/ExpenseIndex";
import ExpenseCreate from "../Pages/Expense_pages/ManageExpense/ExpenseCreate";
import ExpenseEditById from "../Pages/Expense_pages/ManageExpense/ExpenseEditById";
import DailyExpense from "../Pages/Expense_pages/DayWiseExpense/DailyExpense";
import DailyExpenseDetails from "../Pages/Expense_pages/DayWiseExpense/DailyExpenseDetails";
import AddEarningHeadingIndex from "../Pages/HR_Pages/AddEarningHeading/AddEarningHeadingIndex";
import AddEarningHeadingCreate from "../Pages/HR_Pages/AddEarningHeading/AddEarningHeadingCreate";
import AddEarningHeadingEdit from "../Pages/HR_Pages/AddEarningHeading/AddEarningHeadingEdit";
import PayRollDeductionHeadIndex from "../Pages/HR_Pages/PayRollDeductionHead/PayRollDeductionHeadIndex";
import PayRollDeductionHeadCreate from "../Pages/HR_Pages/PayRollDeductionHead/PayRollDeductionHeadCreate";
import PayRollDeductionHeadEdit from "../Pages/HR_Pages/PayRollDeductionHead/PayRollDeductionHeadEdit";
import EmployeePayrollIndex from "../Pages/HR_Pages/EmployeePayroll/EmployeePayrollIndex";
import EmployeeSalaryPayableIndex from "../Pages/HR_Pages/EmployeeSalaryPayable/EmployeeSalaryPayableIndex";
import GrandSalaryPayableIndex from "../Pages/HR_Pages/GrandSalaryPayable/GrandSalaryPayableIndex";
import EmployeeSalaryPayableDetails from "../Pages/HR_Pages/EmployeeSalaryPayable/EmployeeSalaryPayableDetails";
import EmployeePayrollIndexCreate from "../Pages/HR_Pages/EmployeePayroll/EmployeePayrollIndexCreate";
import EmployeePayrollEarningIndex from "../Pages/HR_Pages/EmployeePayroll/EmployeePayrollEarning/EmployeePayrollEarningIndex";
import EmployeePayrollEarningCreateByID from "../Pages/HR_Pages/EmployeePayroll/EmployeePayrollEarning/EmployeePayrollEarningCreateByID";
import EmployeePayrollEarningIndexEditByID from "../Pages/HR_Pages/EmployeePayroll/EmployeePayrollEarning/EmployeePayrollEarningIndexEditByID";
import EmployeePayrollIndexEditById from "../Pages/HR_Pages/EmployeePayroll/EmployeePayrollIndexEditById";
import EmployeePayRollEarningDeductionIndex from "../Pages/HR_Pages/EmployeePayroll/EmployeePayRollEarningDeduction/EmployeePayRollEarningDeductionIndex";
import EmployeePayRollEarningDeductionIndexEditById from "../Pages/HR_Pages/EmployeePayroll/EmployeePayRollEarningDeduction/EmployeePayRollEarningDeductionIndexEditById";
import EmployeePayRollEarningDeductionIndexCreateById from "../Pages/HR_Pages/EmployeePayroll/EmployeePayRollEarningDeduction/EmployeePayRollEarningDeductionIndexCreateById";
import EmployeePayrollbasicIndex from "../Pages/HR_Pages/EmployeePayroll/EmployeePayrollbasic/EmployeePayrollbasicIndex";
import EmployeePayrollbasicCreateById from "../Pages/HR_Pages/EmployeePayroll/EmployeePayrollbasic/EmployeePayrollbasicCreateById";
import EmployeePayrollbasicEditById from "../Pages/HR_Pages/EmployeePayroll/EmployeePayrollbasic/EmployeePayrollbasicEditById";
import EmployeePayRollSalaryPaymentIndex from "../Pages/HR_Pages/EmployeePayroll/EmployeePayRollSalaryPayment/EmployeePayRollSalaryPaymentIndex";
import EmployeePayRollSalaryPaymentCreateById from "../Pages/HR_Pages/EmployeePayroll/EmployeePayRollSalaryPayment/EmployeePayRollSalaryPaymentCreateById";
import EmployeePayRollSalaryPaymentEditByID from "../Pages/HR_Pages/EmployeePayroll/EmployeePayRollSalaryPayment/EmployeePayRollSalaryPaymentEditByID";
import DuePages from "../Pages/Due_Pages/DuePages";
import ReportPageIndex from "../Pages/Report_pages/ReportPageIndex";
import DailyReport from "../Pages/Report_pages/DailyReport";
import EventManage from "../Pages/Events_Pages/EventManage";
import EventManageCreate from "../Pages/Events_Pages/EventManageCreate";

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
      //============= Event Menu =============//
      //===================================//
       {
        path: "/event/manage",
        element: <EventManage />,
      },
      {
        path: "/event/manage/Create",
        element: <EventManageCreate />,
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
      //======================================//
      {
        path: "/hr/earning-heading/Index",
        element: <AddEarningHeadingIndex />,
      },
      {
        path: "hr/earning-heading/Index/Create",
        element: <AddEarningHeadingCreate />,
      },
      {
        path: "hr/earning-heading/Index/Edit/:id",
        element: <AddEarningHeadingEdit />,
      },
      //=====================================
      {
        path: "/hr/deduction-heading/Index",
        element: <PayRollDeductionHeadIndex />,
      },
      {
        path: "hr/deduction-heading/Index/Create",
        element: <PayRollDeductionHeadCreate />,
      },
      {
        path: "hr/deduction-heading/Edit/:id",
        element: <PayRollDeductionHeadEdit />,
      },
      //======================================
      {
        path: "/hr/HrEmployeePayroll/Index",
        element: <EmployeePayrollIndex />,
      },
      {
        path: "/hr/HrEmployeePayroll/Index/Create",
        element: <EmployeePayrollIndexCreate />,
      },
      {
        path: "/hr/employee-payroll/edit/:id",
        element: <EmployeePayrollIndexEditById />,
      },
      //======================================
      {
        path: "/hr/employee-payroll/earning/1",
        //======= dynamic id need to added =======//
        element: <EmployeePayrollEarningIndex />,
      },
      {
        path: "/hr/employee-payroll/earning/1/Create",
        element: <EmployeePayrollEarningCreateByID />,
      },
      {
        path: "/hr/employee-payroll/earning/1/edit/1",
        element: <EmployeePayrollEarningIndexEditByID />,
      },
      //======================================
      {
        path: "/hr/employee-payroll/deduction/1",
        element: <EmployeePayRollEarningDeductionIndex/>,
      },
      {
        path: "/hr/employee-payroll/deduction/1/Create",
        element: <EmployeePayRollEarningDeductionIndexCreateById />,
      },
      {
        path: "/hr/employee-payroll/deduction/1/edit/1",
        element: <EmployeePayRollEarningDeductionIndexEditById/>,
      },
      //======================================
       {
        path: "/hr/employee-payroll/basic/1",
        //======= dynamic id need to added =======//
        element: <EmployeePayrollbasicIndex />,
      },
      {
        path: "/hr/employee-payroll/basic/1/Create",
        element: <EmployeePayrollbasicCreateById />,
      },
      {
        path: "/hr/employee-payroll/basic/1/edit",
        element: <EmployeePayrollbasicEditById />,
      },
      //======================================
       {
        path: "/hr/employee-payroll/payment/1",
        //======= dynamic id need to added =======//
        element: <EmployeePayRollSalaryPaymentIndex />,
      },
      {
        path: "/hr/employee-payroll/payment/1/Create",
        element: <EmployeePayRollSalaryPaymentCreateById />,
      },
      {
        path: "/hr/employee-payroll/salary-payment/1/edit",
        element: <EmployeePayRollSalaryPaymentEditByID />,
      },
      //======================================
      {
        path: "/hr/salary-payable/Index",
        element: <EmployeeSalaryPayableIndex />,
      },
      {
        path: "payroll/employee-salary/details/1",
        //======= dynamic date need to added =======//
        element: <EmployeeSalaryPayableDetails />,
      },
      //=====================================
      {
        path: "/hr/grand-salary/Index",
        element: <GrandSalaryPayableIndex />,
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
      //===============================================//
      {
        path: "bank/BankAccountInfo/Index",
        element: <BankAccountInfoIndex />,
      },
      {
        path: "bank/BankAccountInfo/Index/Create",
        element: <BankAccountInfoCreate />,
      },
      {
        path: "bank/BankAccountInfo/Index/Edit/:id",
        element: <BankAccountInfoEditById />,
      },
      //=============================================//
      {
        path: "bank/BankTransaction/Index/:id",
        element: <BankTransactionIndexById />,
      },
      {
        path: "bank/BankTransaction/Index/:id/Create",
        element: <BankTransactionIndexByIdCreate />,
      },
      {
        path: "bank/BankTransaction/Index/:id/Edit/:id",
        element: <BankTransactionIndexByIdEdit />,
      },
      //=============================================//
      {
        path: "bank/BankStatements/Index/:id",
        element: <BankStatementsIndex />,
      },

      //===================================//
      //============= Income Menu =============//
      //===================================//
      {
        path: "income/OthersIncomeHead/Index",
        element: <OthersIncomeHeadIndex />,
      },
      {
        path: "income/OthersIncomeHead/Index/Create",
        element: <OthersIncomeHeadCreate />,
      },
      {
        path: "income/OthersIncomeHead/Index/Edit/:id",
        element: <OthersIncomeHeadEditById />,
      },
      //========================================
      {
        path: "income/OthersIncome/Index",
        element: <OtherIncomeIndex />,
      },
      {
        path: "income/OthersIncome/Index/Create",
        element: <OtherIncomeIndexCreate />,
      },
      {
        path: "income/OthersIncome/Edit/:id",
        element: <OthersIncomeHeadEditById />,
      },
      //=======================================
      {
        path: "income/daily-income",
        element: <DailyIncome />,
      },
      {
        path: "income/daily-income/details/12/08/2025",
        //======= dynamic date need to added =======//
        element: <DailyIncomeDetails />,
      },
      //===================================//
      //============= Expense Menu =============//
      //===================================//
      {
        path: "/expense/ExpenseHead/Index",
        element: <ExpenseHeadIndex />,
      },
      {
        path: "expense/ExpenseHead/Create",
        element: <ExpenseHeadCreate />,
      },
      {
        path: "expense/ExpenseHead/Edit/:id",
        element: <ExpenseHeadEditById />,
      },
      //========================================
      {
        path: "/expense/manage",
        element: <ExpenseIndex />,
      },
      {
        path: "/expense/manage/Create",
        element: <ExpenseCreate />,
      },
      {
        path: "expense/Expense/Edit/:id",
        element: <ExpenseEditById />,
      },

      //=======================================
      {
        path: "expense/daily-expense",
        element: <DailyExpense />,
      },
      {
        path: "expense/daily-expense/details/06/11/2022",
        //======= dynamic date need to added =======//
        element: <DailyExpenseDetails />,
      },
      //=======================================
       {
        path: "/due/details",
        element: <DuePages />,
      },
      //=======================================
      {
        path: "/report/current",
        element:<ReportPageIndex/>
      },
       {
        path: "/report/daily",
        element:<DailyReport/>
      },

    ],
  },
]);
