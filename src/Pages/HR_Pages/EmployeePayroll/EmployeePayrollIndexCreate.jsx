import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUpload, FiEye, FiEyeOff } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";
import { hrService } from "../../../services/hrService";

const toApiStatus = (status) => {
  if (status === "Retired") return "RETIRED";
  if (status === "Inactive") return "INACTIVE";
  return "ACTIVE";
};

const EmployeePayrollIndexCreate = () => {
  const navigate = useNavigate();
  const [designations, setDesignations] = useState([]);
  const [isSoftwareUser, setIsSoftwareUser] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    hrService.designations.getAll({ limit: 100 })
      .then((res) => setDesignations(res.data || []))
      .catch(() => {});
  }, []);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await hrService.employees.create({
        name: data.name,
        contactNo: data.contactNo,
        designationId: data.designationId || null,
        status: toApiStatus(data.status),
        hasAccess: Boolean(data.softwareUser),
      });
      navigate("/hr/HrEmployeePayroll/Index");
    } catch (err) {
      setSubmitError(err.message || "Failed to create employee");
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

  const handleSoftwareUserToggle = () => {
    setIsSoftwareUser(!isSoftwareUser);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/hr/HrEmployeePayroll/Index"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200 " />
            Back to Employees
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Add Employee</h2>
          <p className="text-foreground mt-1">
            Fill in the details below to add a new employee
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>
          )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Gender
              </label>
              <select
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-primary transition-all duration-200"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.gender.message}
                </p>
              )}
            </div>

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

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Department
              </label>
              <select
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-primary transition-all duration-200"
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
                <p className="mt-1 text-sm text-destructive">
                  {errors.department.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Designation
              </label>
              <select
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-primary transition-all duration-200"
                {...register("designationId", { required: "Designation is required" })}
              >
                <option value="">Select Designation</option>
                {designations.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              {errors.designationId && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.designationId.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">
                Image
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors duration-200">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground">Upload Photo</p>
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
                  <p className="text-sm text-muted-foreground">
                    Upload a profile picture for the employee
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or GIF (Max 2MB)
                  </p>
                </div>
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.image.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Status
              </label>
              <select
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-primary transition-all duration-200"
                {...register("status", { required: "Status is required" })}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Retired">Retired</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.status.message}
                </p>
              )}
            </div>

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

            <div className="md:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="softwareUser"
                  className="h-4 w-4 text-primary focus-visible:ring-ring border-border rounded"
                  {...register("softwareUser")}
                  onChange={handleSoftwareUserToggle}
                />
                <label
                  htmlFor="softwareUser"
                  className="ml-2 block text-sm font-medium text-foreground"
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
                    rules={
                      isSoftwareUser
                        ? { required: "Username is required for software users" }
                        : {}
                    }
                    errors={errors}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-primary transition-all duration-200"
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
                        <FiEyeOff className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <FiEye className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-destructive">
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
              className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeePayrollIndexCreate;
