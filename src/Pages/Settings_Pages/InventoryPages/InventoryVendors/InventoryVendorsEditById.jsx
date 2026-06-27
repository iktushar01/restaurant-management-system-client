import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { inventoryService } from "../../../../services/inventoryService";

const InventoryVendorsEditById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    inventoryService.vendors.getById(id).then((res) => {
      setValue("name", res.data.name);
      setValue("address", res.data.address || "");
      setValue("contact", res.data.contact || "");
      setValue("openingBalance", res.data.openingBalance ?? 0);
    }).catch((err) => setSubmitError(err.message || "Failed to load supplier"))
      .finally(() => setLoading(false));
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await inventoryService.vendors.update(id, {
        name: data.name,
        address: data.address || "",
        contact: data.contact || "",
        openingBalance: Number(data.openingBalance) || 0,
      });
      navigate("/WorkPeriod/inventory/vendors");
    } catch (err) {
      setSubmitError(err.message || "Failed to update supplier");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="max-w-7xl mx-auto p-6 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/WorkPeriod/inventory/vendors" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            Back to Suppliers
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Update Supplier</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Supplier Name</label>
              <input type="text" className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none"
                {...register("name", { required: "Supplier name is required" })} />
              {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Address</label>
              <input type="text" className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none" {...register("address")} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Contact No</label>
              <input type="text" className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none" {...register("contact")} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Opening Balance</label>
              <input type="number" step="0.01" className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none"
                {...register("openingBalance", { min: { value: 0, message: "Cannot be negative" } })} />
              {errors.openingBalance && <p className="mt-1 text-sm text-destructive">{errors.openingBalance.message}</p>}
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/WorkPeriod/inventory/vendors" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40">Close</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryVendorsEditById;
