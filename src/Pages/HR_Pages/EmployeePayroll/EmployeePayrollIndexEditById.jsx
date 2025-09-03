import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";

const EmployeePayrollIndexEditById = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [isSoftwareUser, setIsSoftwareUser] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  // In a real application, you would fetch the existing data based on ID
  React.useEffect(() => {
    // Simulating loading existing data
    setValue("name", "ADMIN");
    setValue("gender", "Male");
    setValue("dateOfBirth", "2019-12-26");
    setValue("contactNo", "01827123671");
    setValue("age", "00");
    setValue("address", "Chittagong");
    setValue("nid", "1545445454");
    setValue("department", "Admin");
    setValue("designation", "Admin");
    setValue("discountLevel", "100.00");
    setValue("status", "Active");
    setValue("hiredDate", "2019-12-26");
    setValue("isSoftwareUser", true);
    setValue("userName", "admin");
  }, [setValue]);

  const onSubmit = (data) => {
    console.log("Employee Form Data:", data);
    // Add your API call here
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSoftwareUserToggle = (e) => {
    setIsSoftwareUser(e.target.checked);
    setValue("isSoftwareUser", e.target.checked);
  };

  return (
    <div className="max-w-7xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/hr/HrEmployeePayroll/Index"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Employee List
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Update Employee Info
          </h2>
          <p className="text-gray-700 mt-1">
            Update the details of the employee
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div>
              <FormInput
                label="Name"
                placeholder="Enter employee name"
                name="name"
                register={register}
                rules={{ required: "Name is required" }}
                errors={errors}
              />
            </div>

            {/* Gender Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 focus:outline-none transition-colors duration-200"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* Date of Birth Input */}
            <div>
              <FormInput
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                register={register}
                rules={{ required: "Date of birth is required" }}
                errors={errors}
              />
            </div>

            {/* Contact No Input */}
            <div>
              <FormInput
                label="Contact No"
                placeholder="Enter contact number"
                name="contactNo"
                register={register}
                rules={{ required: "Contact number is required" }}
                errors={errors}
              />
            </div>

            {/* Age Input */}
            <div>
              <FormInput
                label="Age"
                placeholder="Enter age"
                name="age"
                type="number"
                register={register}
                rules={{ required: "Age is required" }}
                errors={errors}
              />
            </div>

            {/* Address Input */}
            <div>
              <FormInput
                label="Address"
                placeholder="Enter address"
                name="address"
                register={register}
                rules={{ required: "Address is required" }}
                errors={errors}
              />
            </div>

            {/* NID Input */}
            <div>
              <FormInput
                label="NID"
                placeholder="Enter NID number"
                name="nid"
                register={register}
                rules={{ required: "NID is required" }}
                errors={errors}
              />
            </div>

            {/* Department Input */}
            <div>
              <FormInput
                label="Department"
                placeholder="Enter department"
                name="department"
                register={register}
                rules={{ required: "Department is required" }}
                errors={errors}
              />
            </div>

            {/* Designation Input */}
            <div>
              <FormInput
                label="Designation"
                placeholder="Enter designation"
                name="designation"
                register={register}
                rules={{ required: "Designation is required" }}
                errors={errors}
              />
            </div>

            {/* Discount Level Input */}
            <div>
              <FormInput
                label="Discount Level"
                placeholder="Enter discount level"
                name="discountLevel"
                type="number"
                step="0.01"
                register={register}
                rules={{ required: "Discount level is required" }}
                errors={errors}
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <div className="flex items-center">
                <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                  <svg
                    className="w-8 h-8 mb-2"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="text-sm">Browse...</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
                <span className="ml-4 text-sm text-gray-500">
                  {profileImage ? "File selected" : "No file selected"}
                </span>
              </div>
              {profileImage && (
                <div className="mt-4">
                  <img
                    src={profileImage}
                    alt="Profile preview"
                    className="h-32 w-32 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>

            {/* Status Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                {...register("status", { required: "Status is required" })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 focus:outline-none transition-colors duration-200"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.status.message}
                </p>
              )}
            </div>

            {/* Hired Date Input */}
            <div>
              <FormInput
                label="Hired Date"
                name="hiredDate"
                type="date"
                register={register}
                rules={{ required: "Hired date is required" }}
                errors={errors}
              />
            </div>

            {/* Software User Checkbox */}
            <div className="md:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isSoftwareUser"
                  {...register("isSoftwareUser")}
                  onChange={handleSoftwareUserToggle}
                  defaultChecked={true}
                  className="h-4 w-4 text-amber-500 focus:ring-amber-300 border-gray-300 rounded"
                />
                <label
                  htmlFor="isSoftwareUser"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  Software User
                </label>
              </div>
            </div>

            {/* Conditional Username and Password Fields */}
            {isSoftwareUser && (
              <>
                <div>
                  <FormInput
                    label="User Name"
                    placeholder="Enter username"
                    name="userName"
                    register={register}
                    rules={{ required: "Username is required" }}
                    errors={errors}
                  />
                </div>
                <div>
                  <FormInput
                    label="Password"
                    placeholder="Enter password"
                    name="password"
                    type="password"
                    register={register}
                    rules={
                      isSoftwareUser ? { required: "Password is required" } : {}
                    }
                    errors={errors}
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/hr/HrEmployeePayroll/Index"
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer"
            >
              Update Employee Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeePayrollIndexEditById;
