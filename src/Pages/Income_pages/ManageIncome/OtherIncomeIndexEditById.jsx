import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";
import { financeService } from "../../../services/financeService";

const toDateInput = (dateISO) => {
  if (!dateISO) return "";
  return new Date(dateISO).toISOString().slice(0, 10);
};

const OtherIncomeIndexEditById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [heads, setHeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    Promise.all([
      financeService.incomeHeads.getAll({ limit: 100 }),
      financeService.incomeEntries.getById(id),
    ])
      .then(([headsRes, entryRes]) => {
        setHeads(headsRes.data || []);
        const entry = entryRes.data;
        reset({
          headId: entry.headId,
          amount: entry.amount,
          date: toDateInput(entry.dateISO),
          note: entry.note || "",
        });
      })
      .catch((err) => setSubmitError(err.message || "Failed to load income record"))
      .finally(() => setLoading(false));
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await financeService.incomeEntries.update(id, {
        headId: data.headId,
        amount: Number(data.amount),
        note: data.note || "",
        date: data.date,
      });
      navigate("/income/OthersIncome/Index");
    } catch (err) {
      setSubmitError(err.message || "Failed to update income record");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/income/OthersIncome/Index" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            Back to Others Income
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Others Income</h2>
          <p className="text-foreground mt-1">Update the income details below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Head Name <span className="text-destructive">*</span>
              </label>
              <select
                {...register("headId", { required: "Head name is required" })}
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus-visible:ring-ring ${errors.headId ? "border-destructive" : "border-border"}`}
              >
                <option value="">Select Head Name</option>
                {heads.map((head) => (
                  <option key={head.id} value={head.id}>{head.incomeheadname || head.name}</option>
                ))}
              </select>
              {errors.headId && <p className="mt-1 text-sm text-destructive">{errors.headId.message}</p>}
            </div>

            <FormInput
              label="Amount"
              name="amount"
              type="number"
              step="0.01"
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

            <FormInput label="Note" name="note" register={register} isTextArea={true} errors={errors} />
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/income/OthersIncome/Index" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40">Close</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtherIncomeIndexEditById;
