import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";
import { bankService } from "../../../services/bankService";

const BankAccountInfoEditById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    Promise.all([
      bankService.branches.getAll({ limit: 100 }),
      bankService.accounts.getById(id),
    ])
      .then(([branchesRes, accountRes]) => {
        setBranches(branchesRes.data || []);
        const account = accountRes.data;
        reset({
          accountName: account.accountName,
          accountNo: account.accountNo,
          branchId: account.branchId,
          note: account.note || "",
        });
      })
      .catch((err) => setSubmitError(err.message || "Failed to load bank account"))
      .finally(() => setLoading(false));
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await bankService.accounts.update(id, {
        branchId: data.branchId,
        accountName: data.accountName,
        accountNo: data.accountNo,
        note: data.note || "",
      });
      navigate("/bank/BankAccountInfo/Index");
    } catch (err) {
      setSubmitError(err.message || "Failed to update bank account");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/bank/BankAccountInfo/Index" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Bank Accounts
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Edit Bank Account</h2>
          <p className="text-gray-700 mt-1">Update the details below to edit this bank account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <FormInput
                label="Account Name"
                placeholder="e.g., Company Main Account"
                name="accountName"
                register={register}
                rules={{ required: "Account name is required" }}
                errors={errors}
              />
            </div>
            <div>
              <FormInput
                label="Account Number"
                placeholder="e.g., 123456789"
                name="accountNo"
                register={register}
                rules={{
                  required: "Account number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter a valid account number",
                  },
                }}
                errors={errors}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch <span className="text-red-500">*</span>
              </label>
              <select
                {...register("branchId", { required: "Branch is required" })}
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                  errors.branchId ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branchName}{branch.bankName ? ` (${branch.bankName})` : ""}
                  </option>
                ))}
              </select>
              {errors.branchId && (
                <p className="mt-1 text-sm text-red-500">{errors.branchId.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <FormInput
                label="Note (Optional)"
                placeholder="Any additional information"
                name="note"
                register={register}
                isTextArea={true}
                errors={errors}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/bank/BankAccountInfo/Index" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2">
              Cancel
            </Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer disabled:opacity-60">
              {submitting ? "Saving..." : "Update Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankAccountInfoEditById;
