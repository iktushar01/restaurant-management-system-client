import React, { useState, useEffect } from 'react';
import { FiEdit2, FiSave, FiX, FiUpload, FiInfo } from 'react-icons/fi';
import { propertyService } from '../../../services/propertyService';

const emptyForm = {
  propertyName: '',
  propertyGrade: '',
  city: '',
  state: '',
  phone: '',
  email: '',
  registrationVAT: '',
  registrationCST: '',
  propertyType: '',
  address: '',
  postalCode: '',
  country: '',
  fax: '',
  website: '',
  registrationTIN: '',
  companyLogo: null,
};

const PropertyInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [savedData, setSavedData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    propertyService.get()
      .then((res) => {
        const data = { ...emptyForm, ...res.data, companyLogo: null };
        setFormData(data);
        setSavedData(data);
      })
      .catch((err) => setError(err.message || 'Failed to load property information'))
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, companyLogo: e.target.files[0] }));
  };

  const handleCancel = () => {
    setFormData(savedData);
    setIsEditing(false);
    setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      const { companyLogo, ...payload } = formData;
      const res = await propertyService.update(payload);
      const data = { ...emptyForm, ...res.data, companyLogo: null };
      setFormData(data);
      setSavedData(data);
      setIsEditing(false);
    } catch (err) {
      setSubmitError(err.message || 'Failed to update property');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-muted/40 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r bg-primary text-primary-foreground px-6 py-5 sm:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-primary-foreground">Property Information</h1>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-card/20 backdrop-blur-sm rounded-lg text-primary-foreground hover:bg-card/30 transition-all duration-200"
                >
                  <FiEdit2 className="mr-2" />
                  Edit Information
                </button>
              ) : (
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 bg-card/20 backdrop-blur-sm rounded-lg text-primary-foreground hover:bg-card/30 transition-all duration-200"
                >
                  <FiX className="mr-2" />
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8 sm:px-8">
            {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
            {isEditing ? (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {submitError && <div className="md:col-span-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
                {/* Left Column */}
                <div className="space-y-5">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Property Name</label>
                    <input
                      type="text"
                      name="propertyName"
                      value={formData.propertyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Property Grade</label>
                    <input
                      type="text"
                      name="propertyGrade"
                      value={formData.propertyGrade}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Registration VAT</label>
                    <input
                      type="text"
                      name="registrationVAT"
                      value={formData.registrationVAT}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Registration CST</label>
                    <input
                      type="text"
                      name="registrationCST"
                      value={formData.registrationCST}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Property Type</label>
                    <input
                      type="text"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Fax</label>
                    <input
                      type="text"
                      name="fax"
                      value={formData.fax}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Registration TIN</label>
                    <input
                      type="text"
                      name="registrationTIN"
                      value={formData.registrationTIN}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus-visible:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Company Logo</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-border transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FiUpload className="w-8 h-8 mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">Click to upload</p>
                          <p className="text-xs text-muted-foreground">JPG, PNG (142x140px)</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileChange}
                          accept=".jpg,.png" 
                        />
                      </label>
                    </div>
                    {formData.companyLogo && (
                      <p className="mt-2 text-sm text-success flex items-center">
                        <FiInfo className="mr-1" /> 
                        File selected: {formData.companyLogo.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 pt-6 border-t border-border flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center px-6 py-3 bg-gradient-to-r bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60"
                  >
                    <FiSave className="mr-2" />
                    {submitting ? 'Saving...' : 'Update Information'}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Left Column - Display Mode */}
                  <div className="space-y-4">
                    <InfoRow label="Property Name" value={savedData.propertyName} />
                    <InfoRow label="Property Grade" value={savedData.propertyGrade} />
                    <InfoRow label="City" value={savedData.city} />
                    <InfoRow label="State" value={savedData.state} />
                    <InfoRow label="Phone" value={savedData.phone} />
                    <InfoRow label="Email" value={savedData.email} />
                    <InfoRow label="Registration VAT" value={savedData.registrationVAT} />
                    <InfoRow label="Registration CST" value={savedData.registrationCST} />
                  </div>

                  {/* Right Column - Display Mode */}
                  <div className="space-y-4">
                    <InfoRow label="Property Type" value={savedData.propertyType} />
                    <InfoRow label="Address" value={savedData.address} />
                    <InfoRow label="Postal Code" value={savedData.postalCode} />
                    <InfoRow label="Country" value={savedData.country} />
                    <InfoRow label="Fax" value={savedData.fax} />
                    <InfoRow label="Website" value={savedData.website} />
                    <InfoRow label="Registration TIN" value={savedData.registrationTIN} />
                    <InfoRow label="Company Logo" value={savedData.companyLogo || "No file selected"} />
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <div className="bg-primary/5 rounded-xl p-4 max-w-md w-full">
                    <div className="flex items-start">
                      <FiInfo className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-sm text-primary">
                        To update your property information, click the "Edit Information" button at the top of the page.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable component for display mode rows
const InfoRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/40 rounded-lg hover:bg-muted/50 transition-colors">
    <span className="text-sm font-medium text-muted-foreground mb-1 sm:mb-0">{label}</span>
    <span className="text-sm font-semibold text-foreground text-right">{value || '-'}</span>
  </div>
);

export default PropertyInformation;