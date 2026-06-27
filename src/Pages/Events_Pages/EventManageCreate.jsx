import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FormPageShell from "@/Shared/FormPageShell/FormPageShell";
import { inventoryService } from "../../services/inventoryService";
import EventFormFields from "./EventFormFields";
import { toast } from "sonner";

const EventManageCreate = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, control } = useForm();

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
      toast.success("Event created successfully");
      navigate("/event/manage");
    } catch (err) {
      setSubmitError(err.message || "Failed to create event");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormPageShell
      backTo="/event/manage"
      backLabel="Back to Events"
      title="Create New Event"
      subtitle="Fill in the details below to schedule a new event"
      error={submitError}
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" render={<Link to="/event/manage" />}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save Event"}
          </Button>
        </div>
      }
    >
      <EventFormFields register={register} control={control} errors={errors} />
    </FormPageShell>
  );
};

export default EventManageCreate;
