import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FormPageShell from "@/Shared/FormPageShell/FormPageShell";
import { LoadingState } from "@/Shared/PageStates/PageStates";
import { inventoryService } from "../../services/inventoryService";
import EventFormFields from "./EventFormFields";
import { toDatetimeLocal } from "@/lib/eventUtils";
import { toast } from "sonner";

const STATUS_TO_API = {
  Booked: "BOOKED",
  Confirmed: "CONFIRMED",
  Resolved: "RESOLVED",
  Cancelled: "CANCELLED",
};

const EventManageEditById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, control } = useForm();

  useEffect(() => {
    inventoryService.events
      .getById(id)
      .then((res) => {
        const e = res.data;
        setValue("title", e.subject);
        setValue("customerName", e.customerName);
        setValue("phone", e.phone || "");
        setValue("date", toDatetimeLocal(e.dateISO || e.date));
        setValue("noOfPerson", e.noOfPerson);
        setValue("menu", e.menu || "");
        setValue("description", e.description || "");
        setValue("advanceAmount", e.advanceAmount);
        setValue("status", STATUS_TO_API[e.status] || "BOOKED");
      })
      .catch((err) => setSubmitError(err.message || "Failed to load event"))
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
        status: data.status,
      });
      toast.success("Event updated successfully");
      navigate("/event/manage");
    } catch (err) {
      setSubmitError(err.message || "Failed to update event");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 w-full">
        <LoadingState message="Loading event..." />
      </div>
    );
  }

  return (
    <FormPageShell
      backTo="/event/manage"
      backLabel="Back to Events"
      title="Update Event"
      subtitle="Edit event details and status"
      error={submitError}
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" render={<Link to="/event/manage" />}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      }
    >
      <EventFormFields register={register} control={control} errors={errors} showStatus />
    </FormPageShell>
  );
};

export default EventManageEditById;
