import React, { useState } from "react";
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import ReusableModal from "../../../Shared/ReusableModal/ReusableModal";
import ReusableButton from "../../../Shared/ReusableButton/ReusableButton";
import PageBanner from "../../../Shared/PageBanner/PageBanner";
import FormInput from "../../../Shared/FormInput/FromInput";
import { hrService } from "../../../services/hrService";
import { useApiList } from "../../../hooks/useApiList";

const HrDesignationIndex = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const { data: designations, loading, error, refetch } = useApiList(
    hrService.designations.getAll,
    { searchTerm: "", currentPage: 1, entriesToShow: 100 }
  );

  const columns = [
    {
      header: "Designation",
      accessor: "name",
    },
    {
      header: "Basic Salary",
      accessor: "basic",
      render: (row) =>
        row.basic !== "" && row.basic != null ? (
          row.basic
        ) : (
          <span className="text-muted-foreground">Not specified</span>
        ),
    },
  ];

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
    setSubmitError("");
    reset();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedDesignation(null);
    setSubmitError("");
    reset();
  };

  const handleEdit = (row) => {
    setSelectedDesignation(row);
    setValue("designation", row.name);
    setValue("basicSalary", row.basic ?? "");
    setIsEditModalOpen(true);
  };

  const handleDelete = async (row) => {
    const ok = await confirm({ description: `Are you sure you want to delete "${row.name}"?` });
    if (!ok) return;
    try {
        await hrService.designations.delete(row.id);
        refetch();
      } catch (err) {
        toast.error(err.message || "Failed to delete designation");
      }
  };

  const onSubmitCreate = async (data) => {
    setSubmitError("");
    try {
      await hrService.designations.create({
        name: data.designation,
        basic: Number(data.basicSalary),
      });
      refetch();
      handleCreateModalClose();
    } catch (err) {
      setSubmitError(err.message || "Failed to create designation");
    }
  };

  const onSubmitEdit = async (data) => {
    setSubmitError("");
    try {
      await hrService.designations.update(selectedDesignation.id, {
        name: data.designation,
        basic: Number(data.basicSalary),
      });
      refetch();
      handleEditModalClose();
    } catch (err) {
      setSubmitError(err.message || "Failed to update designation");
    }
  };

  const actions = [
    {
      label: "Edit",
      icon: FaEdit,
      className: "text-primary hover:text-primary/80 cursor-pointer",
      onClick: handleEdit,
    },
    {
      label: "Delete",
      icon: FaTrash,
      className: "text-destructive hover:text-destructive/80 cursor-pointer",
      onClick: handleDelete,
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <PageBanner
        title="Designations"
        subtitle="Manage your organization's designations"
        bgColor=""
      >
        <ReusableButton
          onClick={() => setIsCreateModalOpen(true)}
          icon={FaPlus}
          iconPosition="left"
          variant="primary"
        >
          Create New
        </ReusableButton>
      </PageBanner>

      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : (
        <ReusableTable columns={columns} data={designations} actions={actions} />
      )}

      {!loading && designations.length === 0 && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-foreground mb-2">
            No designations found
          </h3>
          <p className="text-muted-foreground mb-6">
            Get started by creating a new designation
          </p>
          <ReusableButton
            onClick={() => setIsCreateModalOpen(true)}
            icon={FaPlus}
            variant="primary"
          >
            Create Designation
          </ReusableButton>
        </div>
      )}

      <ReusableModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        title="Add New Designation"
        subtitle="Fill in the details below to create a new designation"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <ReusableButton onClick={handleCreateModalClose} variant="outline">
              Cancel
            </ReusableButton>
            <ReusableButton onClick={handleSubmit(onSubmitCreate)} variant="primary">
              Save Designation
            </ReusableButton>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmitCreate)}>
          {submitError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>
          )}
          <div className="grid grid-cols-1 gap-6">
            <FormInput
              label="Designation"
              placeholder="e.g., Senior Software Engineer"
              name="designation"
              register={register}
              rules={{ required: "Designation name is required" }}
              errors={errors}
            />
            <FormInput
              label="Basic Salary"
              placeholder="e.g., 50000"
              type="number"
              name="basicSalary"
              register={register}
              rules={{
                required: "Basic Salary is required",
                min: { value: 0, message: "Salary must be positive" },
              }}
              errors={errors}
            />
          </div>
        </form>
      </ReusableModal>

      <ReusableModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Update Designation"
        subtitle="Update the designation details"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <ReusableButton onClick={handleEditModalClose} variant="outline">
              Cancel
            </ReusableButton>
            <ReusableButton onClick={handleSubmit(onSubmitEdit)} variant="primary">
              Update Designation
            </ReusableButton>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmitEdit)}>
          {submitError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>
          )}
          <div className="grid grid-cols-1 gap-6">
            <FormInput
              label="Designation"
              placeholder="e.g., Senior Software Engineer"
              name="designation"
              register={register}
              rules={{ required: "Designation name is required" }}
              errors={errors}
            />
            <FormInput
              label="Basic Salary"
              placeholder="e.g., 50000"
              type="number"
              name="basicSalary"
              register={register}
              rules={{
                required: "Basic Salary is required",
                min: { value: 0, message: "Salary must be positive" },
              }}
              errors={errors}
            />
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default HrDesignationIndex;
