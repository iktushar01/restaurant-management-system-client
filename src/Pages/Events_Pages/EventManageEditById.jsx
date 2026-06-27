import React, { useState, useEffect } from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { inventoryService } from "../../services/inventoryService";

const toDatetimeLocal = (dateStr) => {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const EventManageEditById = () => {
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
    inventoryService.events.getById(id).then((res) => {
      const e = res.data;
      setValue("title", e.subject);
      setValue("customerName", e.customerName);
      setValue("phone", e.phone || "");
      setValue("date", toDatetimeLocal(e.date));
      setValue("noOfPerson", e.noOfPerson);
      setValue("menu", e.menu || "");
      setValue("description", e.description || "");
      setValue("advanceAmount", e.advanceAmount);
    }).catch((err) => setSubmitError(err.message || "Failed to load event"))
      .finally(() => setLoading(false));
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await inventoryService.events.update(id, {
        subject: data.title,
        customerName: data.customerName,
        phone: data.phone || "",
        date: new Date(data.date).toISOString(),
        noOfPerson: Number(data.noOfPerson),
        advanceAmount: Number(data.advanceAmount) || 0,
        menu: data.menu || "",
        description: data.description || "",
      });
      navigate("/event/manage");
    } catch (err) {
      setSubmitError(err.message || "Failed to update event");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="   mx-auto p-6 text-center text-muted-foreground">Loading event...</div>;
  }

  return (
    <div className="   mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/event/manage"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            Back to Events
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">
            Update Event
          </h2>
          <p className="text-foreground mt-1">
            Update the details of your event
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Title Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus:border-primary outline-none transition-colors duration-200"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            {/* Customer Name Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">
                Customer Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus:border-primary outline-none transition-colors duration-200"
                {...register("customerName", { required: "Customer name is required" })}
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-destructive">{errors.customerName.message}</p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus:border-primary outline-none transition-colors duration-200"
                {...register("phone", { 
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "Please enter a valid phone number"
                  }
                })}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Date
              </label>
              <input
                type="datetime-local"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus:border-primary outline-none transition-colors duration-200"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-destructive">{errors.date.message}</p>
              )}
            </div>

            {/* No Of Person Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                No Of Person
              </label>
              <input
                type="number"
                min="1"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus:border-primary outline-none transition-colors duration-200"
                {...register("noOfPerson", { 
                  required: "Number of persons is required",
                  min: {
                    value: 1,
                    message: "Must be at least 1 person"
                  }
                })}
              />
              {errors.noOfPerson && (
                <p className="mt-1 text-sm text-destructive">{errors.noOfPerson.message}</p>
              )}
            </div>

            {/* Advance Amount Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Advance Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-muted-foreground">$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full pl-8 pr-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus:border-primary outline-none transition-colors duration-200"
                  {...register("advanceAmount", { 
                    required: "Advance amount is required",
                    min: {
                      value: 0,
                      message: "Amount cannot be negative"
                    }
                  })}
                />
              </div>
              {errors.advanceAmount && (
                <p className="mt-1 text-sm text-destructive">{errors.advanceAmount.message}</p>
              )}
            </div>

            {/* Menu Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Menu
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus:border-primary outline-none transition-colors duration-200"
                {...register("menu")}
              />
            </div>

            {/* Theme Color Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Theme Color
              </label>
              <FormSelect
                name="themeColor"
                control={control}
                errors={errors}
                placeholder="Select..."
                options={[
                  { value: "blue", label: "Blue" },
                  { value: "red", label: "Red" },
                  { value: "green", label: "Green" },
                  { value: "purple", label: "Purple" },
                  { value: "orange", label: "Orange" },
                  { value: "pink", label: "Pink" },
                ]}
              />
            </div>

            {/* Description Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus:border-primary outline-none transition-colors duration-200"
                {...register("description")}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/event/manage"
              className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2"
            >
              Close
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventManageEditById;