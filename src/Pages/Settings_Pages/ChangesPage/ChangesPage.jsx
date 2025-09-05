import React, { useState } from 'react';

const ChargesPage = () => {
  const [vat, setVat] = useState(0.00);
  const [serviceCharge, setServiceCharge] = useState(0.00);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the changes to your backend
    setIsEditing(false);
    console.log('Updated charges:', { vat, serviceCharge });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-6 bg-red-100 p-6 rounded-2xl">Charges</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="vat" className="block text-sm font-medium text-gray-700 mb-1">
                VAT (%)
              </label>
              <input
                type="number"
                id="vat"
                value={vat}
                onChange={(e) => setVat(parseFloat(e.target.value) || 0)}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="serviceCharge" className="block text-sm font-medium text-gray-700 mb-1">
                Service Charge (%)
              </label>
              <input
                type="number"
                id="serviceCharge"
                value={serviceCharge}
                onChange={(e) => setServiceCharge(parseFloat(e.target.value) || 0)}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition-colors"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="mb-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">VAT (%)</span>
                <span className="font-medium">{vat.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Service Charge (%)</span>
                <span className="font-medium">{serviceCharge.toFixed(2)}</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition-colors"
            >
              Update
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChargesPage;