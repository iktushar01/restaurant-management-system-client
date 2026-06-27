import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";
import { hrService } from "../../../services/hrService";

const toApiStatus = (status) => {
  if (status === "Retired") return "RETIRED";
  if (status === "Inactive") return "INACTIVE";
  return "ACTIVE";
};

const EmployeePayrollIndexEditById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [designations, setDesignations] = useState([]);
  const [isSoftwareUser, setIsSoftwareUser] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    Promise.all([
      hrService.designations.getAll({ limit: 100 }),
      hrService.employees.getById(id),
    ])
      .then(([designationsRes, employeeRes]) => {
        setDesignations(designationsRes.data || []);
        const employee = employeeRes.data;
        setIsSoftwareUser(Boolean(employee.hasAccess));
        reset({
          name: employee.name,
          contactNo: employee.contactNo,
          designationId: employee.designationId || "",
          status: employee.status || "Active",
          isSoftwareUser: employee.hasAccess,
        });
      })
      .catch((err) => setSubmitError(err.message || "Failed to load employee"))
      .finally(() => setLoading(false));
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await hrService.employees.update(id, {
        name: data.name,
        contactNo: data.contactNo,
        designationId: data.designationId || null,
        status: toApiStatus(data.status),
        hasAccess: Boolean(data.isSoftwareUser),
      });
      navigate("/hr/HrEmployeePayroll/Index");
    } catch (err) {
      setSubmitError(err.message || "Failed to update employee");
    } finally {
      setSubmitting(false);
    }
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

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

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
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation
              </label>
              <select
                {...register("designationId", { required: "Designation is required" })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 focus:outline-none transition-colors duration-200"
              >
                <option value="">Select Designation</option>
                {designations.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              {errors.designationId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.designationId.message}
                </p>
              )}
            </div>

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
                <option value="Retired">Retired</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.status.message}
                </p>
              )}
            </div>

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

            <div className="md:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isSoftwareUser"
                  {...register("isSoftwareUser")}
                  onChange={handleSoftwareUserToggle}
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

            {isSoftwareUser && (
              <>
                <div>
                  <FormInput
                    label="User Name"
                    placeholder="Enter username"
                    name="userName"
                    register={register}
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
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Updating..." : "Update Employee Info"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeePayrollIndexEditById;
