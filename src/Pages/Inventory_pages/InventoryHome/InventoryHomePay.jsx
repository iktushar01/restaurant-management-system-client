import React, { useEffect, useState } from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";
import { inventoryService } from "../../../services/inventoryService";

const InventoryHomePay = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue, control } = useForm();

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

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await inventoryService.vendorPayments.create({
        vendorId: data.supplierName,
        purchaseId: data.memoNo,
        type: "PAY",
        paid: Number(data.paid),
        discount: Number(data.discount) || 0,
        paymentDate: data.transactionDate,
        note: data.particulars || "",
      });
      navigate("/inventory");
    } catch (err) {
      setSubmitError(err.message || "Failed to record payment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSupplierChange = (e) => {
    const supplierId = e.target.value;
    const supplier = suppliers.find((s) => s.id === supplierId);
    setSelectedSupplier(supplier || null);
    setSelectedMemo(null);
    setValue("memoNo", "");
    setValue("totalPayable", 0);
    setValue("due", 0);
  };

  const handleMemoChange = (e) => {
    const memoId = e.target.value;
    if (selectedSupplier) {
      const memo = selectedSupplier.memos.find((m) => m.id === memoId);
      setSelectedMemo(memo || null);
      setValue("totalPayable", memo ? memo.payable : 0);
      setValue("due", memo ? memo.payable : 0);
    }
  };

  const handleDiscountChange = (e) => {
    const discount = parseFloat(e.target.value) || 0;
    const totalPayable = selectedMemo ? selectedMemo.payable : 0;
    const paid = watch("paid") || 0;
    setValue("due", totalPayable - discount - paid);
  };

  const handlePaidChange = (e) => {
    const paid = parseFloat(e.target.value) || 0;
    const totalPayable = selectedMemo ? selectedMemo.payable : 0;
    const discount = watch("discount") || 0;
    setValue("due", totalPayable - discount - paid);
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
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">
            Make Payment to Supplier
          </h2>
          <p className="text-foreground mt-1">
            Fill in the details below to make a payment
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
                options={[
                ]}
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
                options={[
                ]}
              />
              {errors.memoNo && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.memoNo.message}
                </p>
              )}
            </div>

            <div>
              <FormInput
                label="Total Payable"
                name="totalPayable"
                type="number"
                register={register}
                rules={{ required: "Total payable is required" }}
                errors={errors}
                readOnly
              />
            </div>

            <div>
              <FormInput
                label="Discount"
                name="discount"
                type="number"
                register={register}
                errors={errors}
                onChange={handleDiscountChange}
              />
            </div>

            <div>
              <FormInput
                label="Paid"
                name="paid"
                type="number"
                register={register}
                rules={{ required: "Paid amount is required" }}
                errors={errors}
                onChange={handlePaidChange}
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

            <div>
              <FormInput
                label="Due"
                name="due"
                type="number"
                register={register}
                errors={errors}
                readOnly
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
                placeholder="Enter payment details"
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
              className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Processing..." : "Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryHomePay;
