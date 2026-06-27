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

const EarningHeadingIndex = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEarningHead, setSelectedEarningHead] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const { data: earningHeads, loading, error, refetch } = useApiList(
    hrService.earningHeads.getAll,
    { searchTerm: "", currentPage: 1, entriesToShow: 100 }
  );

  const columns = [
    {
      header: "Earning Head Name",
      accessor: "name",
    },
    {
      header: "Description",
      accessor: "description",
      render: (row) =>
        row.description ? (
          row.description
        ) : (
          <span className="text-muted-foreground">No description</span>
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
    setSelectedEarningHead(null);
    setSubmitError("");
    reset();
  };

  const handleEdit = (row) => {
    setSelectedEarningHead(row);
    setValue("earningHeadName", row.name);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (row) => {
    const ok = await confirm({ description: `Are you sure you want to delete "${row.name}"?` });
    if (!ok) return;
    try {
        await hrService.earningHeads.delete(row.id);
        refetch();
      } catch (err) {
        toast.error(err.message || "Failed to delete earning head");
      }
  };

  const onSubmitCreate = async (data) => {
    setSubmitError("");
    try {
      await hrService.earningHeads.create({ name: data.earningHeadName });
      refetch();
      handleCreateModalClose();
    } catch (err) {
      setSubmitError(err.message || "Failed to create earning head");
    }
  };

  const onSubmitEdit = async (data) => {
    setSubmitError("");
    try {
      await hrService.earningHeads.update(selectedEarningHead.id, {
        name: data.earningHeadName,
      });
      refetch();
      handleEditModalClose();
    } catch (err) {
      setSubmitError(err.message || "Failed to update earning head");
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
        title="Earning Head"
        subtitle="Manage your organization's earning heads"
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
        <ReusableTable columns={columns} data={earningHeads} actions={actions} />
      )}

      {!loading && earningHeads.length === 0 && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-foreground mb-2">
            No earning heads found
          </h3>
          <p className="text-muted-foreground mb-6">
            Get started by creating a new earning head
          </p>
          <ReusableButton
            onClick={() => setIsCreateModalOpen(true)}
            icon={FaPlus}
            variant="primary"
          >
            Create Earning Head
          </ReusableButton>
        </div>
      )}

      <ReusableModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        title="Add Earning Head"
        subtitle="Fill in the details below to create a new earning head"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <ReusableButton onClick={handleCreateModalClose} variant="outline">
              Cancel
            </ReusableButton>
            <ReusableButton onClick={handleSubmit(onSubmitCreate)} variant="primary">
              Submit
            </ReusableButton>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmitCreate)}>
          {submitError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>
          )}
          <FormInput
            label="Earning Head Name"
            placeholder="e.g., Basic Salary, Overtime Pay, etc."
            name="earningHeadName"
            register={register}
            rules={{ required: "Earning Head name is required" }}
            errors={errors}
          />
        </form>
      </ReusableModal>

      <ReusableModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Edit Earning Head"
        subtitle="Update the details of the earning head"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <ReusableButton onClick={handleEditModalClose} variant="outline">
              Cancel
            </ReusableButton>
            <ReusableButton onClick={handleSubmit(onSubmitEdit)} variant="primary">
              Update Earning Head
            </ReusableButton>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmitEdit)}>
          {submitError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>
          )}
          <FormInput
            label="Earning Head Name"
            placeholder="Enter earning head name"
            name="earningHeadName"
            register={register}
            rules={{ required: "Earning head name is required" }}
            errors={errors}
          />
        </form>
      </ReusableModal>
    </div>
  );
};

export default EarningHeadingIndex;
