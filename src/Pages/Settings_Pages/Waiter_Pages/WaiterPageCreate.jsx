import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiUser, FiInfo } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";

const WaiterPageCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  // State for employees data and loading status
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Simulate fetching employee data from an API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        // In a real application, this would be an API call
        // const response = await fetch('/api/employees');
        // const data = await response.json();
        
        // Mock data - replace with your actual data source
        const mockEmployees = [
          { id: 1, name: "John Doe", position: "Senior Waiter" },
          { id: 2, name: "Jane Smith", position: "Waiter" },
          { id: 3, name: "Robert Johnson", position: "Head Waiter" },
          { id: 4, name: "Emily Davis", position: "Waiter" },
          { id: 5, name: "Michael Wilson", position: "Trainee Waiter" },
        ];
        
        setEmployees(mockEmployees);
        setIsLoading(false);
      } catch (error) {
        setFetchError("Failed to load employees. Please try again later.");
        setIsLoading(false);
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const onSubmit = (data) => {
    console.log("Waiter Form Data:", data);
    // Add your API call here
  };

  return (
    <div className="max-w-7xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/WorkPeriod/RestaurantDineWaiter/Index"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Waiters
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Add New Waiter
          </h2>
          <p className="text-gray-700 mt-1">
            Fill in the details below to add a new waiter
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Employee Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee
              </label>
              
              {isLoading ? (
                <div className="flex items-center justify-center p-4 border border-gray-300 rounded-lg bg-gray-50">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-500"></div>
                  <span className="ml-2 text-gray-600">Loading employees...</span>
                </div>
              ) : fetchError ? (
                <div className="p-4 border border-red-200 rounded-lg bg-red-50 text-red-700">
                  <div className="flex items-center">
                    <FiInfo className="mr-2" />
                    {fetchError}
                  </div>
                </div>
              ) : (
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                  {...register("employee", { required: "Employee selection is required" })}
                >
                  <option value="">Select an employee</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} - {employee.position}
                    </option>
                  ))}
                </select>
              )}
              
              {errors.employee && (
                <p className="mt-1 text-sm text-red-600">{errors.employee.message}</p>
              )}
            </div>

            {/* Note Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note
              </label>
              <textarea
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                placeholder="Add any notes about the waiter"
                rows={3}
                {...register("note")}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/WorkPeriod/RestaurantDineWaiter/Index"
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Close
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer"
              disabled={isLoading || fetchError}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WaiterPageCreate;