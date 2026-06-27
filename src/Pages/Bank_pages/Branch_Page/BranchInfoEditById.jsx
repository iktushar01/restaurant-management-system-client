import React, { useEffect, useState } from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
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
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm();

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

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="  mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/bank/BankBranchInfo/Index" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200 " />
            Back to Branch Info
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Update Branch Info</h2>
          <p className="text-foreground mt-1">Fill in the details below to Update Branch info</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">
                Bank <span className="text-destructive">*</span>
              </label>
              <FormSelect
                name="bankId"
                control={control}
                rules={{ required: "Bank is required" }}
                errors={errors}
                placeholder="Select Bank"
                options={banks.map((bank) => ({ value: String(bank.id), label: String(bank.bankName) }))}
              />
              {errors.bankId && <p className="mt-1 text-sm text-destructive">{errors.bankId.message}</p>}
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
            <Link to="/bank/BankBranchInfo/Index" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2">
              Cancel
            </Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer disabled:opacity-60">
              {submitting ? "Saving..." : "Update Branch Info"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchInfoEditById;
