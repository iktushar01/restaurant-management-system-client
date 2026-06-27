import React, { useEffect, useState } from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { dineTableService } from "../../../../services/dineTableService";
import { dineLocationService } from "../../../../services/dineLocationService";

const STATUS_TO_API = { Vacant: "AVAILABLE", Occupied: "OCCUPIED", Reserved: "RESERVED" };
const STATUS_FROM_API = { AVAILABLE: "Vacant", OCCUPIED: "Occupied", RESERVED: "Reserved" };

const DineTableIndexEditById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm();

  useEffect(() => {
    Promise.all([
      dineLocationService.getAllSimple(),
      dineTableService.getById(id),
    ])
      .then(([locRes, tableRes]) => {
        setLocations(locRes.data || []);
        const table = tableRes.data;
        reset({
          tableNo: table.tableNo,
          capacity: table.capacity,
          status: STATUS_FROM_API[table.statusRaw] || table.status || "Vacant",
          locationId: table.locationId,
        });
      })
      .catch((err) => setSubmitError(err.message || "Failed to load table"))
      .finally(() => setLoading(false));
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await dineTableService.update(id, {
        locationId: data.locationId,
        tableNo: data.tableNo,
        capacity: Number(data.capacity),
        status: STATUS_TO_API[data.status] || "AVAILABLE",
      });
      navigate("/WorkPeriod/dine/tables");
    } catch (err) {
      setSubmitError(err.message || "Failed to update table");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading...</div>;

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
          <h2 className="text-2xl font-bold text-foreground">Update Table</h2>
          <p className="text-foreground mt-1">Update the details below for this table</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Table No</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none"
                {...register("tableNo", { required: "Table number is required" })}
              />
              {errors.tableNo && <p className="mt-1 text-sm text-destructive">{errors.tableNo.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Capacity</label>
              <input
                type="number"
                min="1"
                max="20"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none"
                {...register("capacity", { required: "Capacity is required", min: { value: 1, message: "Min 1" }, max: { value: 20, message: "Max 20" } })}
              />
              {errors.capacity && <p className="mt-1 text-sm text-destructive">{errors.capacity.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Status</label>
              <FormSelect
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                errors={errors}
                placeholder="Select..."
                options={[
                  { value: "Vacant", label: "Vacant" },
                  { value: "Occupied", label: "Occupied" },
                  { value: "Reserved", label: "Reserved" },
                ]}
              />
              {errors.status && <p className="mt-1 text-sm text-destructive">{errors.status.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Dining Location</label>
              <FormSelect
                name="locationId"
                control={control}
                rules={{ required: "Dining location is required" }}
                errors={errors}
                placeholder="Select a dining location"
                options={locations.map((loc) => ({ value: String(loc.id), label: String(loc.name) }))}
              />
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

export default DineTableIndexEditById;
