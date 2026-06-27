import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { inventoryService } from "../../../services/inventoryService";

const SubCategoryCreate = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

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
    <div className="max-w-7xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/WorkPeriod/inventory/sub-category" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to SubCategories
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Add SubCategory</h2>
          <p className="text-gray-700 mt-1">Fill in the details below to add a new subcategory</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category Name</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                placeholder="Enter subcategory name"
                {...register("name", { required: "Subcategory name is required", minLength: { value: 2, message: "Subcategory name must be at least 2 characters" } })}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                {...register("categoryId", { required: "Category is required" })}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/WorkPeriod/inventory/sub-category" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Close</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCategoryCreate;
