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

const PayRollDeductionHeadIndex = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDeductionHead, setSelectedDeductionHead] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const { data: deductionHeads, loading, error, refetch } = useApiList(
    hrService.deductionHeads.getAll,
    { searchTerm: "", currentPage: 1, entriesToShow: 100 }
  );

  const columns = [
    {
      header: "Deduction Head Name",
      accessor: "name",
    },
  ];

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
    setSubmitError("");
    reset();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedDeductionHead(null);
    setSubmitError("");
    reset();
  };

  const handleEdit = (row) => {
    setSelectedDeductionHead(row);
    setValue("deductionHeadName", row.name);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (row) => {
    const ok = await confirm({ description: `Are you sure you want to delete "${row.name}"?` });
    if (!ok) return;
    try {
        await hrService.deductionHeads.delete(row.id);
        refetch();
      } catch (err) {
        toast.error(err.message || "Failed to delete deduction head");
      }
  };

  const onSubmitCreate = async (data) => {
    setSubmitError("");
    try {
      await hrService.deductionHeads.create({ name: data.deductionHeadName });
      refetch();
      handleCreateModalClose();
    } catch (err) {
      setSubmitError(err.message || "Failed to create deduction head");
    }
  };

  const onSubmitEdit = async (data) => {
    setSubmitError("");
    try {
      await hrService.deductionHeads.update(selectedDeductionHead.id, {
        name: data.deductionHeadName,
      });
      refetch();
      handleEditModalClose();
    } catch (err) {
      setSubmitError(err.message || "Failed to update deduction head");
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
    <div className="p-6   mx-auto">
      <PageBanner
        title="Deduction Head"
        subtitle="Manage your organization's deduction heads"
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
        <ReusableTable columns={columns} data={deductionHeads} actions={actions} />
      )}

      {!loading && deductionHeads.length === 0 && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-foreground mb-2">
            No deduction heads found
          </h3>
          <p className="text-muted-foreground mb-6">
            Get started by creating a new deduction head
          </p>
          <ReusableButton
            onClick={() => setIsCreateModalOpen(true)}
            icon={FaPlus}
            variant="primary"
          >
            Create Deduction Head
          </ReusableButton>
        </div>
      )}

      <ReusableModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        title="Add Deduction Head"
        subtitle="Fill in the details below to create a new deduction head"
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
            label="Deduction Head Name"
            placeholder="Enter deduction head name"
            name="deductionHeadName"
            register={register}
            rules={{ required: "Deduction head name is required" }}
            errors={errors}
          />
        </form>
      </ReusableModal>

      <ReusableModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Edit Deduction Head"
        subtitle="Update the details of the deduction head"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <ReusableButton onClick={handleEditModalClose} variant="outline">
              Cancel
            </ReusableButton>
            <ReusableButton onClick={handleSubmit(onSubmitEdit)} variant="primary">
              Update Deduction Head
            </ReusableButton>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmitEdit)}>
          {submitError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>
          )}
          <FormInput
            label="Deduction Head Name"
            placeholder="Enter deduction head name"
            name="deductionHeadName"
            register={register}
            rules={{ required: "Deduction head name is required" }}
            errors={errors}
          />
        </form>
      </ReusableModal>
    </div>
  );
};

export default PayRollDeductionHeadIndex;
