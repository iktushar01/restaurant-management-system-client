import React, { useEffect, useState } from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";
import { bankService } from "../../../services/bankService";

const BankAccountInfoCreate = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, control } = useForm();

  useEffect(() => {
    bankService.branches.getAll({ limit: 100 }).then((res) => setBranches(res.data || [])).catch(() => {});
  }, []);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await bankService.accounts.create({
        branchId: data.branchId,
        accountName: data.accountName,
        accountNo: data.accountNo,
        note: data.note || "",
      });
      navigate("/bank/BankAccountInfo/Index");
    } catch (err) {
      setSubmitError(err.message || "Failed to create bank account");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="  mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/bank/BankAccountInfo/Index" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200 " />
            Back to Bank Accounts
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Add New Bank Account</h2>
          <p className="text-foreground mt-1">Fill in the details below to create a new bank account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
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
              <label className="block text-sm font-medium text-foreground mb-1">
                Branch <span className="text-destructive">*</span>
              </label>
              <FormSelect
                name="branchId"
                control={control}
                rules={{ required: "Branch is required" }}
                errors={errors}
                placeholder="Select Branch"
                options={[
                ]}
              />
              {errors.branchId && (
                <p className="mt-1 text-sm text-destructive">{errors.branchId.message}</p>
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
            <Link to="/bank/BankAccountInfo/Index" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2">
              Cancel
            </Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer flex items-center disabled:opacity-60">
              {submitting ? "Saving..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankAccountInfoCreate;
