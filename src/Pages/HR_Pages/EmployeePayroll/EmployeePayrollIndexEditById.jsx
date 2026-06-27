import React, { useEffect, useState } from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
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
    reset, control } = useForm();

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
    return <div className="p-6 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="   mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/hr/HrEmployeePayroll/Index"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200 " />
            Back to Employee List
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">
            Update Employee Info
          </h2>
          <p className="text-foreground mt-1">
            Update the details of the employee
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>
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
              <label className="block text-sm font-medium text-foreground mb-1">
                Designation
              </label>
              <FormSelect
                name="designationId"
                control={control}
                rules={{ required: "Designation is required" }}
                errors={errors}
                placeholder="Select Designation"
                options={designations.map((d) => ({ value: String(d.id), label: String(d.name) }))}
              />
              {errors.designationId && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.designationId.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Status
              </label>
              <FormSelect
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                errors={errors}
                placeholder="Select..."
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                  { value: "Retired", label: "Retired" },
                ]}
              />
              {errors.status && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">
                Image
              </label>
              <div className="flex items-center">
                <label className="flex flex-col items-center px-4 py-6 bg-card text-primary rounded-lg border border-border cursor-pointer hover:bg-muted/40">
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
                <span className="ml-4 text-sm text-muted-foreground">
                  {profileImage ? "File selected" : "No file selected"}
                </span>
              </div>
              {profileImage && (
                <div className="mt-4">
                  <img
                    src={profileImage}
                    alt="Profile preview"
                    className="h-32 w-32 object-cover rounded-lg border border-border"
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
                  className="h-4 w-4 text-primary focus-visible:ring-ring border-border rounded"
                />
                <label
                  htmlFor="isSoftwareUser"
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
              className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer disabled:opacity-60"
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
