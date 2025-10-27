import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import ReusableModal from "../../../Shared/ReusableModal/ReusableModal";
import FormInput from "../../../Shared/FormInput/FromInput";

const EarningHeadingIndex = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEarningHead, setSelectedEarningHead] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  // Corrected data structure for earning heads
  const earningHeads = [
    { ID: 1, name: "Basic Salary", description: "Basic monthly compensation" },
    { ID: 2, name: "Overtime Pay", description: "Additional pay for extra hours" },
    { ID: 3, name: "Bonus", description: "Performance-based incentive" },
    { ID: 4, name: "Allowances", description: "Various employee allowances" },
  ];

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
          <span className="text-gray-400">No description</span>
        ),
    },
  ];

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
    reset();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedEarningHead(null);
    reset();
  };

  const handleEdit = (row) => {
    setSelectedEarningHead(row);
    setValue("earningHeadName", row.name);
    setValue("description", row.description);
    setIsEditModalOpen(true);
  };

  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete "${row.name}"?`)) {
      console.log("Delete:", row);
      // Add your delete API call here
    }
  };

  const onSubmitCreate = (data) => {
    console.log("Create Earning Head:", data);
    // Add your create API call here
    handleCreateModalClose();
  };

  const onSubmitEdit = (data) => {
    console.log("Edit Earning Head:", { ...data, id: selectedEarningHead.ID });
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gray-50 sm:bg-gray-100 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Earning Head
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage your organization's earning heads
          </p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base"
        >
          <FaPlus className="mr-2" />
          Create New
        </button>
      </div>

      {/* ✅ Reusable Table */}
      <ReusableTable columns={columns} data={earningHeads} actions={actions} />

      {earningHeads.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No earning heads found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating a new earning head
          </p>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center"
          >
            <FaPlus className="mr-2" />
            Create Earning Head
          </button>
        </div>
      )}

      {/* Create Modal */}
      <ReusableModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        title="Add Earning Head"
        subtitle="Fill in the details below to create a new earning head"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCreateModalClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmitCreate)}
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer"
            >
              Submit
            </button>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmitCreate)}>
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

      {/* Edit Modal */}
      <ReusableModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Edit Earning Head"
        subtitle="Update the details of the earning head"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleEditModalClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmitEdit)}
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer"
            >
              Update Earning Head
            </button>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmitEdit)}>
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