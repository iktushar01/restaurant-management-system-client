import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { inventoryService } from "../../../services/inventoryService";

const SubCategoryEditByID = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    const load = async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          inventoryService.categories.getAll({ limit: 100 }),
          inventoryService.subCategories.getById(id),
        ]);
        setCategories(catRes.data || []);
        setValue("name", subRes.data.name);
        setValue("categoryId", subRes.data.categoryId);
      } catch (err) {
        setSubmitError(err.message || "Failed to load subcategory");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await inventoryService.subCategories.update(id, { name: data.name, categoryId: data.categoryId });
      navigate("/WorkPeriod/inventory/sub-category");
    } catch (err) {
      setSubmitError(err.message || "Failed to update subcategory");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="max-w-7xl mx-auto p-6 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/WorkPeriod/inventory/sub-category" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            Back to SubCategories
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Update SubCategory</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Sub Category Name</label>
              <input type="text" className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none"
                {...register("name", { required: "Subcategory name is required" })} />
              {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <select className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none"
                {...register("categoryId", { required: "Category is required" })}>
                <option value="">Select Category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.categoryId && <p className="mt-1 text-sm text-destructive">{errors.categoryId.message}</p>}
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/WorkPeriod/inventory/sub-category" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40">Close</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCategoryEditByID;
