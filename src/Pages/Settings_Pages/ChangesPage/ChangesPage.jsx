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
    return <div className="p-6    mx-auto text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="p-6    mx-auto">
      <h1 className="text-xl font-bold text-foreground mb-6 bg-muted/40 p-6 rounded-2xl border border-border">Charges</h1>

      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
            <div className="mb-4">
              <label htmlFor="vat" className="block text-sm font-medium text-foreground mb-1">
                VAT (%)
              </label>
              <input
                type="number"
                id="vat"
                value={vat}
                onChange={(e) => setVat(parseFloat(e.target.value) || 0)}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus-visible:ring-ring focus-visible:border-ring"
                autoFocus
              />
            </div>

            <div className="mb-6">
              <label htmlFor="serviceCharge" className="block text-sm font-medium text-foreground mb-1">
                Service Charge (%)
              </label>
              <input
                type="number"
                id="serviceCharge"
                value={serviceCharge}
                onChange={(e) => setServiceCharge(parseFloat(e.target.value) || 0)}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus-visible:ring-ring focus-visible:border-ring"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {submitting ? 'Updating...' : 'Update'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-muted text-foreground font-medium rounded-md hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="mb-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-foreground">VAT (%)</span>
                <span className="font-medium">{vat.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-foreground">Service Charge (%)</span>
                <span className="font-medium">{serviceCharge.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
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
