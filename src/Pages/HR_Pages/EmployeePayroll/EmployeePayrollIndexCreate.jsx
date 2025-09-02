import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiUpload, FiEye, FiEyeOff } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";

const EmployeePayrollIndexCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm();

  const [isSoftwareUser, setIsSoftwareUser] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSoftwareUserToggle = () => {
    setIsSoftwareUser(!isSoftwareUser);
  };

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/hr/HrEmployeePayroll/Index"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Employees
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Add Employee</h2>
          <p className="text-gray-700 mt-1">
            Fill in the details below to add a new employee
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name Input */}
            <div>
              <FormInput
                label="Name"
                placeholder="Enter full name"
                name="name"
                register={register}
                rules={{ required: "Name is required" }}
                errors={errors}
              />
            </div>

            {/* Gender Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="">Select Gender</option>
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
                type="date"
                name="dateOfBirth"
                register={register}
                rules={{ required: "Date of Birth is required" }}
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
                type="number"
                placeholder="Enter age"
                name="age"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200"
                {...register("department", { required: "Department is required" })}
              >
                <option value="">Select Department</option>
                <option value="Super Admin">Super Admin</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
                <option value="Operations">Operations</option>
              </select>
              {errors.department && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.department.message}
                </p>
              )}
            </div>

            {/* Designation Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200"
                {...register("designation", { required: "Designation is required" })}
              >
                <option value="">Select Designation</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Executive">Executive</option>
                <option value="Associate">Associate</option>
              </select>
              {errors.designation && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.designation.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors duration-200">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500">Upload Photo</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...register("image", {
                      required: "Profile image is required",
                    })}
                    onChange={handleImageChange}
                  />
                </label>
                <div>
                  <p className="text-sm text-gray-500">
                    Upload a profile picture for the employee
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    JPG, PNG or GIF (Max 2MB)
                  </p>
                </div>
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Status Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200"
                {...register("status", { required: "Status is required" })}
              >
                <option value="">Select Status</option>
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
                type="date"
                name="hiredDate"
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
                  id="softwareUser"
                  className="h-4 w-4 text-yellow-400 focus:ring-yellow-300 border-gray-300 rounded"
                  {...register("softwareUser")}
                  onChange={handleSoftwareUserToggle}
                />
                <label
                  htmlFor="softwareUser"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  Software User
                </label>
              </div>
            </div>

            {/* Conditional Fields for Software User */}
            {isSoftwareUser && (
              <>
                <div>
                  <FormInput
                    label="User Name"
                    placeholder="Enter username"
                    name="userName"
                    register={register}
                    rules={
                      isSoftwareUser
                        ? { required: "Username is required for software users" }
                        : {}
                    }
                    errors={errors}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200"
                      {...register("password", {
                        required: isSoftwareUser
                          ? "Password is required for software users"
                          : false,
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeePayrollIndexCreate;