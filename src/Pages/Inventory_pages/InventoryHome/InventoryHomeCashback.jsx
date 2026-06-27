import React, { useEffect, useState } from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";
import { inventoryService } from "../../../services/inventoryService";

const InventoryHomeCashback = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm();

  const supplierId = watch("supplierName");
  const memoId = watch("memoNo");

  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    inventoryService.vendorsDuePurchases.getAll()
      .then((res) => setSuppliers(res.data || []))
      .catch(() => setSuppliers([]));
  }, []);

  useEffect(() => {
    const supplier = suppliers.find((s) => String(s.id) === String(supplierId));
    setSelectedSupplier(supplier || null);
    setSelectedMemo(null);
    setValue("memoNo", "");
    setValue("totalReceivable", 0);
    setValue("paid", "");
  }, [supplierId, suppliers, setValue]);

  useEffect(() => {
    if (!selectedSupplier || !memoId) {
      setSelectedMemo(null);
      setValue("totalReceivable", 0);
      return;
    }
    const memo = selectedSupplier.memos.find((m) => String(m.id) === String(memoId));
    setSelectedMemo(memo || null);
    setValue("totalReceivable", memo ? memo.payable : 0);
  }, [memoId, selectedSupplier, setValue]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await inventoryService.vendorPayments.create({
        vendorId: data.supplierName,
        purchaseId: data.memoNo,
        type: "CASHBACK",
        paid: Number(data.paid),
        paymentDate: data.transactionDate,
        note: data.particulars || "",
      });
      navigate("/inventory");
    } catch (err) {
      setSubmitError(err.message || "Failed to record cash back");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/inventory"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200 " />
            Back to Inventory
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-success/15 text-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">
            Cash Back From Supplier
          </h2>
          <p className="text-foreground mt-1">
            Fill in the details below to receive cash back from supplier
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">
                Supplier Name
              </label>
              <FormSelect
                name="supplierName"
                control={control}
                rules={{
                  required: "Supplier is required",
                }}
                errors={errors}
                placeholder="--Select Supplier--"
                options={suppliers.map((s) => ({
                  value: String(s.id),
                  label: s.name,
                }))}
              />
              {errors.supplierName && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.supplierName.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">
                Memo No
              </label>
              <FormSelect
                name="memoNo"
                control={control}
                rules={{ required: "Memo number is required" }}
                errors={errors}
                placeholder="--Select Memo--"
                options={(selectedSupplier?.memos || []).map((m) => ({
                  value: String(m.id),
                  label: m.no,
                }))}
                disabled={!selectedSupplier}
              />
              {errors.memoNo && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.memoNo.message}
                </p>
              )}
            </div>

            <div>
              <FormInput
                label="Total Receivable"
                name="totalReceivable"
                type="number"
                register={register}
                rules={{ required: "Total receivable is required" }}
                errors={errors}
                readOnly
              />
            </div>

            <div>
              <FormInput
                label="Paid"
                name="paid"
                type="number"
                register={register}
                rules={{
                  required: "Paid amount is required",
                  max: {
                    value: selectedMemo ? selectedMemo.payable : 0,
                    message: "Paid amount cannot exceed total receivable",
                  },
                }}
                errors={errors}
              />
            </div>

            <div>
              <FormInput
                label="Tran. Date"
                name="transactionDate"
                type="date"
                register={register}
                rules={{ required: "Transaction date is required" }}
                errors={errors}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">
                Particulars
              </label>
              <textarea
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none transition-all"
                {...register("particulars")}
                rows={3}
                placeholder="Enter cash back details"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/inventory"
              className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2"
            >
              Close
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r bg-success/15 text-foreground text-foreground font-medium rounded-lg hover:bg-success/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Processing..." : "Receive Cash Back"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryHomeCashback;
