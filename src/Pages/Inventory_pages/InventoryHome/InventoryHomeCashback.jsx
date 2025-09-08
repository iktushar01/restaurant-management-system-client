import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";

const InventoryHomeCashback = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    setValue,
  } = useForm();

  const [suppliers] = useState([
    {
      id: 1,
      name: "Supplier A",
      memos: [{ id: 101, no: "MEM-001", receivable: 1500 }],
    },
    {
      id: 2,
      name: "Supplier B",
      memos: [{ id: 102, no: "MEM-002", receivable: 2500 }],
    },
    {
      id: 3,
      name: "Supplier C",
      memos: [{ id: 103, no: "MEM-003", receivable: 3500 }],
    },
  ]);

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedMemo, setSelectedMemo] = useState(null);

  const onSubmit = (data) => {
    console.log("Cashback Form Data:", data);
    // Add your API call here
  };

  const handleSupplierChange = (e) => {
    const supplierId = e.target.value;
    const supplier = suppliers.find((s) => s.id === parseInt(supplierId));
    setSelectedSupplier(supplier);
    setSelectedMemo(null);
    setValue("memoNo", "");
    setValue("totalReceivable", 0);
    setValue("paid", "");
  };

  const handleMemoChange = (e) => {
    const memoId = e.target.value;
    if (selectedSupplier) {
      const memo = selectedSupplier.memos.find(
        (m) => m.id === parseInt(memoId)
      );
      setSelectedMemo(memo);
      setValue("totalReceivable", memo.receivable);
    }
  };

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/inventory"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Inventory
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-green-200 to-green-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Cash Back From Supplier
          </h2>
          <p className="text-gray-700 mt-1">
            Fill in the details below to receive cash back from supplier
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Supplier Selection */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier Name
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-300 outline-none transition-all"
                {...register("supplierName", {
                  required: "Supplier is required",
                })}
                onChange={handleSupplierChange}
              >
                <option value="">--Select Supplier--</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              {errors.supplierName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.supplierName.message}
                </p>
              )}
            </div>

            {/* Memo Selection */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Memo No
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-300 outline-none transition-all"
                {...register("memoNo", { required: "Memo number is required" })}
                onChange={handleMemoChange}
                disabled={!selectedSupplier}
              >
                <option value="">--Select Memo--</option>
                {selectedSupplier?.memos.map((memo) => (
                  <option key={memo.id} value={memo.id}>
                    {memo.no}
                  </option>
                ))}
              </select>
              {errors.memoNo && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.memoNo.message}
                </p>
              )}
            </div>

            {/* Total Receivable */}
            <div>
              <FormInput
                label="Total Receivable"
                name="totalReceivable"
                type="number"
                register={register}
                rules={{ required: "Total receivable is required" }}
                errors={errors}
                readOnly
              />
            </div>

            {/* Paid */}
            <div>
              <FormInput
                label="Paid"
                name="paid"
                type="number"
                register={register}
                rules={{ 
                  required: "Paid amount is required",
                  max: {
                    value: selectedMemo ? selectedMemo.receivable : 0,
                    message: "Paid amount cannot exceed total receivable"
                  }
                }}
                errors={errors}
              />
            </div>

            {/* Transaction Date */}
            <div>
              <FormInput
                label="Tran. Date"
                name="transactionDate"
                type="date"
                register={register}
                rules={{ required: "Transaction date is required" }}
                errors={errors}
              />
            </div>

            {/* Particulars */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Particulars
              </label>
              <textarea
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-300 outline-none transition-all"
                {...register("particulars")}
                rows={3}
                placeholder="Enter cash back details"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/inventory"
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Close
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-green-200 to-green-400 text-gray-900 font-medium rounded-lg hover:from-green-300 hover:to-green-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 cursor-pointer"
            >
              Receive Cash Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryHomeCashback;