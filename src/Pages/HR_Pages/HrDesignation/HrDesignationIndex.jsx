import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import ReusableModal from "../../../Shared/ReusableModal/ReusableModal";
import ReusableButton from "../../../Shared/ReusableButton/ReusableButton";
import PageBanner from "../../../Shared/PageBanner/PageBanner";
import FormInput from "../../../Shared/FormInput/FromInput";

const HrDesignationIndex = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const designations = [
    { ID: 1, name: "Admin", basic: "" },
    { ID: 2, name: "General Manager", basic: "23432" },
    { ID: 3, name: "Restaurant Walter", basic: "" },
    { ID: 4, name: "Software Engineer", basic: "2343234" },
  ];

  const columns = [
    {
      header: "Designation",
      accessor: "name",
    },
    {
      header: "Basic Salary",
      accessor: "basic",
      render: (row) =>
        row.basic ? (
          row.basic
        ) : (
          <span className="text-gray-400">Not specified</span>
        ),
    },
  ];

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
    reset();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedDesignation(null);
    reset();
  };

  const handleEdit = (row) => {
    setSelectedDesignation(row);
    setValue("designation", row.name);
    setValue("basicSalary", row.basic);
    setIsEditModalOpen(true);
  };

  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete "${row.name}"?`)) {
      console.log("Delete:", row);
      // Add your delete API call here
    }
  };

  const onSubmitCreate = (data) => {
    console.log("Create Designation:", data);
    // Add your create API call here
    handleCreateModalClose();
  };

  const onSubmitEdit = (data) => {
    console.log("Edit Designation:", { ...data, id: selectedDesignation.ID });
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
        title="Designations"
        subtitle="Manage your organization's designations"
        bgColor="from-blue-50 to-blue-100"
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

      <ReusableTable columns={columns} data={designations} actions={actions} />

      {designations.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No designations found
          </h3>
          <p className="text-gray-500 mb-6">
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

      {/* Create Modal */}
      <ReusableModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        title="Add New Designation"
        subtitle="Fill in the details below to create a new designation"
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
              Save Designation
            </ReusableButton>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmitCreate)}>
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

      {/* Edit Modal */}
      <ReusableModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Update Designation"
        subtitle="Update the designation details"
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
              Update Designation
            </ReusableButton>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmitEdit)}>
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
