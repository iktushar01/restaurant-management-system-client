import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { dineLocationService } from "../../../../services/dineLocationService";

const DineLocationIndexCreate = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await dineLocationService.create({ name: data.name, type: data.type || "" });
      navigate("/WorkPeriod/dine/location");
    } catch (err) {
      setSubmitError(err.message || "Failed to create location");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/WorkPeriod/dine/location"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200 " />
            Back to Locations
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">
            Add Location
          </h2>
          <p className="text-foreground mt-1">
            Fill in the details below to add a new location
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6">
            {/* Location Name Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Location Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring transition-all duration-200 outline-none"
                placeholder="Enter location name"
                {...register("name", { 
                  required: "Location name is required",
                  minLength: {
                    value: 2,
                    message: "Location name must be at least 2 characters"
                  }
                })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* Location Type Input (Text field instead of dropdown) */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Location Type
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring transition-all duration-200 outline-none"
                placeholder="Enter location type (e.g., Indoor, Outdoor, Bar)"
                {...register("type", { 
                  required: "Location type is required",
                  minLength: {
                    value: 2,
                    message: "Location type must be at least 2 characters"
                  }
                })}
              />
              {errors.type && (
                <p className="mt-1 text-sm text-destructive">{errors.type.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/WorkPeriod/dine/location"
              className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2"
            >
              Close
            </Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DineLocationIndexCreate;