import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { inventoryService } from "../../services/inventoryService";

const EventManageCreate = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await inventoryService.events.create({
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
      setSubmitError(err.message || "Failed to create event");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
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
            Create New Event
          </h2>
          <p className="text-foreground mt-1">
            Fill in the details below to create a new event
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
                placeholder="e.g., Birthday Party"
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
                placeholder="e.g., John Smith"
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
                placeholder="e.g., 123-456-7890"
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
                placeholder="e.g., 50"
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
                  placeholder="e.g., 500.00"
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
                placeholder="e.g., Buffet style"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus:border-primary outline-none transition-colors duration-200"
                {...register("menu")}
              />
            </div>

            {/* Theme Color Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Theme Color
              </label>
              <select
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus:border-primary outline-none transition-colors duration-200"
                {...register("themeColor")}
              >
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
                <option value="pink">Pink</option>
              </select>
            </div>

            {/* Description Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                placeholder="Event description and special instructions..."
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
              {submitting ? "Saving..." : "Save Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventManageCreate;