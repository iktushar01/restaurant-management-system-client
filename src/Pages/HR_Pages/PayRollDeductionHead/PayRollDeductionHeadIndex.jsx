import React, { useState } from "react";
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
    if (window.confirm(`Are you sure you want to delete "${row.name}"?`)) {
      try {
        await hrService.deductionHeads.delete(row.id);
        refetch();
      } catch (err) {
        alert(err.message || "Failed to delete deduction head");
      }
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
      className: "text-indigo-600 hover:text-indigo-900 cursor-pointer",
      onClick: handleEdit,
    },
    {
      label: "Delete",
      icon: FaTrash,
      className: "text-rose-600 hover:text-rose-900 cursor-pointer",
      onClick: handleDelete,
    },
  ];

  return (
    <div className="p-6 max-w-6xl min-h-screen mx-auto">
      <PageBanner
        title="Deduction Head"
        subtitle="Manage your organization's deduction heads"
        bgColor="from-purple-50 to-purple-100"
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

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : (
        <ReusableTable columns={columns} data={deductionHeads} actions={actions} />
      )}

      {!loading && deductionHeads.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No deduction heads found
          </h3>
          <p className="text-gray-500 mb-6">
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
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>
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
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>
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
