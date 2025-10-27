import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import ReusableModal from "../../../Shared/ReusableModal/ReusableModal";
import ReusableButton from "../../../Shared/ReusableButton/ReusableButton";
import PageBanner from "../../../Shared/PageBanner/PageBanner";
import FormInput from "../../../Shared/FormInput/FromInput";

const PayRollDeductionHeadIndex = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDeductionHead, setSelectedDeductionHead] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const deductionHeads = [
    { ID: 1, name: "Tax Deduction" },
    { ID: 2, name: "PF Deduction" },
    { ID: 3, name: "Loan Deduction" },
  ];

  const columns = [
    {
      header: "Deduction Head Name",
      accessor: "name",
    },
  ];

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
    reset();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedDeductionHead(null);
    reset();
  };

  const handleEdit = (row) => {
    setSelectedDeductionHead(row);
    setValue("deductionHeadName", row.name);
    setIsEditModalOpen(true);
  };

  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete "${row.name}"?`)) {
      console.log("Delete:", row);
      // Add your delete API call here
    }
  };

  const onSubmitCreate = (data) => {
    console.log("Create Deduction Head:", data);
    // Add your create API call here
    handleCreateModalClose();
  };

  const onSubmitEdit = (data) => {
    console.log("Edit Deduction Head:", { ...data, id: selectedDeductionHead.ID });
    // Add your update API call here
    handleEditModalClose();
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

      <ReusableTable columns={columns} data={deductionHeads} actions={actions} />

      {deductionHeads.length === 0 && (
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

      {/* Create Modal */}
      <ReusableModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        title="Add Deduction Head"
        subtitle="Fill in the details below to create a new deduction head"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <ReusableButton
              onClick={handleCreateModalClose}
              variant="outline"
            >
              Cancel
            </ReusableButton>
            <ReusableButton
              onClick={handleSubmit(onSubmitCreate)}
              variant="primary"
            >
              Submit
            </ReusableButton>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmitCreate)}>
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

      {/* Edit Modal */}
      <ReusableModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Edit Deduction Head"
        subtitle="Update the details of the deduction head"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <ReusableButton
              onClick={handleEditModalClose}
              variant="outline"
            >
              Cancel
            </ReusableButton>
            <ReusableButton
              onClick={handleSubmit(onSubmitEdit)}
              variant="primary"
            >
              Update Deduction Head
            </ReusableButton>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmitEdit)}>
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
