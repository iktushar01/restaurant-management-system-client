import React, { useEffect, useState } from 'react';
import { propertyService } from '../../../services/propertyService';

const ChargesPage = () => {
  const [vat, setVat] = useState(0.00);
  const [serviceCharge, setServiceCharge] = useState(0.00);
  const [savedVat, setSavedVat] = useState(0.00);
  const [savedServiceCharge, setSavedServiceCharge] = useState(0.00);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    propertyService.get()
      .then((res) => {
        const vatPercent = Number(res.data?.vatPercent ?? 0);
        const serviceChargePercent = Number(res.data?.serviceChargePercent ?? 0);
        setVat(vatPercent);
        setServiceCharge(serviceChargePercent);
        setSavedVat(vatPercent);
        setSavedServiceCharge(serviceChargePercent);
      })
      .catch((err) => setError(err.message || 'Failed to load charges'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      const res = await propertyService.update({
        vatPercent: vat,
        serviceChargePercent: serviceCharge,
      });
      const vatPercent = Number(res.data?.vatPercent ?? vat);
      const serviceChargePercent = Number(res.data?.serviceChargePercent ?? serviceCharge);
      setVat(vatPercent);
      setServiceCharge(serviceChargePercent);
      setSavedVat(vatPercent);
      setSavedServiceCharge(serviceChargePercent);
      setIsEditing(false);
    } catch (err) {
      setSubmitError(err.message || 'Failed to update charges');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setVat(savedVat);
    setServiceCharge(savedServiceCharge);
    setIsEditing(false);
    setSubmitError('');
  };

  if (loading) {
    return <div className="p-6 max-w-7xl mx-auto text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-6 bg-red-100 p-6 rounded-2xl">Charges</h1>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            {submitError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>}
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
                disabled={submitting}
                className="px-4 py-2 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition-colors disabled:opacity-60"
              >
                {submitting ? 'Updating...' : 'Update'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
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
