import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";
import { financeService } from "../../../services/financeService";

const OtherIncomeIndexCreate = () => {
  const navigate = useNavigate();
  const [heads, setHeads] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    financeService.incomeHeads.getAll({ limit: 100 })
      .then((res) => setHeads(res.data || []))
      .catch(() => {});
  }, []);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await financeService.incomeEntries.create({
        headId: data.headId,
        amount: Number(data.amount),
        note: data.note || "",
        date: data.date,
      });
      navigate("/income/OthersIncome/Index");
    } catch (err) {
      setSubmitError(err.message || "Failed to create income record");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/income/OthersIncome/Index" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Others Income
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Others Income</h2>
          <p className="text-gray-700 mt-1">Add new other income details</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Head Name <span className="text-red-500">*</span>
              </label>
              <select
                {...register("headId", { required: "Head name is required" })}
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 ${errors.headId ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select Head Name</option>
                {heads.map((head) => (
                  <option key={head.id} value={head.id}>{head.incomeheadname || head.name}</option>
                ))}
              </select>
              {errors.headId && <p className="mt-1 text-sm text-red-500">{errors.headId.message}</p>}
            </div>

            <FormInput
              label="Amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              register={register}
              rules={{ required: "Amount is required", min: { value: 0.01, message: "Amount must be greater than 0" } }}
              errors={errors}
            />

            <FormInput
              label="Date"
              name="date"
              type="date"
              register={register}
              rules={{ required: "Date is required" }}
              errors={errors}
            />

            <FormInput
              label="Note (Optional)"
              name="note"
              placeholder="Enter any additional notes"
              register={register}
              errors={errors}
              isTextArea={true}
            />
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/income/OthersIncome/Index" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Close</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtherIncomeIndexCreate;
