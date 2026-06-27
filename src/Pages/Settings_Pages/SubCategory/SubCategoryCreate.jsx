import React, { useState, useEffect } from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { inventoryService } from "../../../services/inventoryService";

const SubCategoryCreate = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, control } = useForm();

  useEffect(() => {
    inventoryService.categories.getAll({ limit: 100 }).then((res) => setCategories(res.data || [])).catch(() => {});
  }, []);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await inventoryService.subCategories.create({ categoryId: data.categoryId, name: data.name });
      navigate("/WorkPeriod/inventory/sub-category");
    } catch (err) {
      setSubmitError(err.message || "Failed to create subcategory");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="   mx-auto p-6">
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
          <h2 className="text-2xl font-bold text-foreground">Add SubCategory</h2>
          <p className="text-foreground mt-1">Fill in the details below to add a new subcategory</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Sub Category Name</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring transition-all duration-200 outline-none"
                placeholder="Enter subcategory name"
                {...register("name", { required: "Subcategory name is required", minLength: { value: 2, message: "Subcategory name must be at least 2 characters" } })}
              />
              {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <FormSelect
                name="categoryId"
                control={control}
                rules={{ required: "Category is required" }}
                errors={errors}
                placeholder="Select Category"
                options={categories.map((cat) => ({ value: String(cat.id), label: String(cat.name) }))}
              />
              {errors.categoryId && <p className="mt-1 text-sm text-destructive">{errors.categoryId.message}</p>}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/WorkPeriod/inventory/sub-category" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40">Close</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCategoryCreate;
