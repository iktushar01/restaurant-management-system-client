import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../../Shared/FormInput/FromInput";
// import FormInput from "../../components/shared/FormInput"; // adjust path as needed

const HrDesignationCreate = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Designation Form Data:", data);
    // এখানে আপনি API call করতে পারেন (POST request to backend)
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create Designation</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Designation Input */}
        <FormInput
          label="Designation"
          placeholder="Enter designation name"
          name="designation"
          register={register}
          rules={{ required: "Designation is required" }}
          errors={errors}
        />

        {/* Basic Salary Input */}
        <FormInput
          label="Basic Salary"
          placeholder="Enter basic salary"
          type="number"
          name="basicSalary"
          register={register}
          rules={{ required: "Basic Salary is required" }}
          errors={errors}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default HrDesignationCreate;
