import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { dineTableService } from "../../../../services/dineTableService";
import { dineLocationService } from "../../../../services/dineLocationService";

const DineTableIndexCreate = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    dineLocationService.getAllSimple().then((res) => setLocations(res.data || [])).catch(() => {});
  }, []);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await dineTableService.create({
        locationId: data.locationId,
        tableNo: data.tableNo,
        capacity: Number(data.capacity),
      });
      navigate("/WorkPeriod/dine/tables");
    } catch (err) {
      setSubmitError(err.message || "Failed to create table");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/WorkPeriod/dine/tables" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            Back to Tables
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Add Table</h2>
          <p className="text-foreground mt-1">Fill in the details below to add a new table</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Table No</label>
              <input type="text" className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none" placeholder="e.g., A1, KABIN 1"
                {...register("tableNo", { required: "Table number is required" })} />
              {errors.tableNo && <p className="mt-1 text-sm text-destructive">{errors.tableNo.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Capacity</label>
              <input type="number" min="1" max="20" className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none"
                {...register("capacity", { required: "Capacity is required", min: { value: 1, message: "Min 1" }, max: { value: 20, message: "Max 20" } })} />
              {errors.capacity && <p className="mt-1 text-sm text-destructive">{errors.capacity.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Dining Location</label>
              <select className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none"
                {...register("locationId", { required: "Dining location is required" })}>
                <option value="">Select a dining location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
              {errors.locationId && <p className="mt-1 text-sm text-destructive">{errors.locationId.message}</p>}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/WorkPeriod/dine/tables" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40">Close</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DineTableIndexCreate;
