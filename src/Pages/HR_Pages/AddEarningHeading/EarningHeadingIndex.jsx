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
          <span className="text-gray-400">No description</span>
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
    if (window.confirm(`Are you sure you want to delete "${row.name}"?`)) {
      try {
        await hrService.earningHeads.delete(row.id);
        refetch();
      } catch (err) {
        alert(err.message || "Failed to delete earning head");
      }
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
        title="Earning Head"
        subtitle="Manage your organization's earning heads"
        bgColor="from-amber-50 to-amber-100"
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
        <ReusableTable columns={columns} data={earningHeads} actions={actions} />
      )}

      {!loading && earningHeads.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No earning heads found
          </h3>
          <p className="text-gray-500 mb-6">
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
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>
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
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>
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
