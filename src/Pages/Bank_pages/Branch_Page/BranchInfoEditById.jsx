import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";
import { bankService } from "../../../services/bankService";

const BranchInfoEditById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    Promise.all([
      bankService.banks.getAll({ limit: 100 }),
      bankService.branches.getById(id),
    ])
      .then(([banksRes, branchRes]) => {
        setBanks(banksRes.data || []);
        const branch = branchRes.data;
        reset({
          bankId: branch.bankId,
          branchName: branch.branchName,
          address: branch.address || "",
        });
      })
      .catch((err) => setSubmitError(err.message || "Failed to load branch"))
      .finally(() => setLoading(false));
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await bankService.branches.update(id, {
        bankId: data.bankId,
        branchName: data.branchName,
        address: data.address || "",
      });
      navigate("/bank/BankBranchInfo/Index");
    } catch (err) {
      setSubmitError(err.message || "Failed to update branch");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/bank/BankBranchInfo/Index" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Branch Info
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Update Branch Info</h2>
          <p className="text-gray-700 mt-1">Fill in the details below to Update Branch info</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                {...register("bankId", { required: "Bank is required" })}
              >
                <option value="">Select Bank</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>{bank.bankName}</option>
                ))}
              </select>
              {errors.bankId && <p className="mt-1 text-sm text-red-600">{errors.bankId.message}</p>}
            </div>
            <div className="md:col-span-2">
              <FormInput
                label="Branch Name"
                placeholder="e.g., Dhaka Branch"
                name="branchName"
                register={register}
                rules={{ required: "Branch info name is required" }}
                errors={errors}
              />
            </div>
            <div className="md:col-span-2">
              <FormInput
                label="Address"
                placeholder="e.g., Dhaka bangladesh"
                name="address"
                register={register}
                rules={{ required: "Address is required" }}
                errors={errors}
                prefix="$"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/bank/BankBranchInfo/Index" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2">
              Cancel
            </Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer disabled:opacity-60">
              {submitting ? "Saving..." : "Update Branch Info"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchInfoEditById;
