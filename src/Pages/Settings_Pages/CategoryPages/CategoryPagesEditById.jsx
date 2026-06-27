import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { inventoryService } from "../../../services/inventoryService";

const CategoryPagesEditById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await inventoryService.categories.getById(id);
        setValue("name", res.data.name);
        setValue("details", res.data.details || "");
      } catch (err) {
        setSubmitError(err.message || "Failed to load category");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await inventoryService.categories.update(id, {
        name: data.name,
        details: data.details || "",
      });
      navigate("/WorkPeriod/inventory/category");
    } catch (err) {
      setSubmitError(err.message || "Failed to update category");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="max-w-7xl min-h-screen mx-auto p-6 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-7xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/WorkPeriod/inventory/category" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Categories
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Update Category</h2>
          <p className="text-gray-700 mt-1">Fill in the details below to update the category</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                placeholder="Enter category name"
                {...register("name", { required: "Category name is required", minLength: { value: 2, message: "Category name must be at least 2 characters" } })}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Detail</label>
              <textarea
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                placeholder="Enter category details"
                rows={4}
                {...register("details")}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/WorkPeriod/inventory/category" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2">
              Close
            </Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer disabled:opacity-60">
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryPagesEditById;
