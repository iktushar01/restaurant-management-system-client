import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";
import { financeService } from "../../../services/financeService";

const OthersIncomeHeadEditById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    financeService.incomeHeads.getById(id)
      .then((res) => {
        const head = res.data;
        reset({ incomeheadname: head.incomeheadname || head.name, description: head.description || "" });
      })
      .catch((err) => setSubmitError(err.message || "Failed to load income head"))
      .finally(() => setLoading(false));
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await financeService.incomeHeads.update(id, {
        name: data.incomeheadname,
        description: data.description || "",
      });
      navigate("/income/OthersIncomeHead/Index");
    } catch (err) {
      setSubmitError(err.message || "Failed to update income head");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/income/OthersIncomeHead/Index" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Income Heads
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Others Income Heading</h2>
          <p className="text-gray-700 mt-1">Update the income head details below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6">
            <FormInput
              label="Income Head"
              name="incomeheadname"
              register={register}
              rules={{ required: "Income head is required" }}
              errors={errors}
            />
            <FormInput
              label="Description"
              name="description"
              register={register}
              isTextArea={true}
              errors={errors}
            />
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/income/OthersIncomeHead/Index" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Close</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OthersIncomeHeadEditById;
