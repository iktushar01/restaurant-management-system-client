import React, { useState } from 'react';
import { FiEdit2, FiSave, FiX, FiUpload, FiInfo } from 'react-icons/fi';

const PropertyInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    propertyName: 'DineFlow',
    propertyGrade: '1st Grade',
    city: 'Chittagong',
    state: 'Chittagong',
    phone: '+8801818699845',
    email: 'email@email.com',
    registrationVAT: '12345678',
    registrationCST: '',
    propertyType: 'First',
    address: 'Chittagong, Bangladesh',
    postalCode: '4000',
    country: 'Bangladesh',
    fax: '',
    website: 'www.web.com',
    registrationTIN: '',
    companyLogo: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      companyLogo: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save data logic here
    console.log('Form data submitted:', formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-5 sm:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Property Information</h1>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-200"
                >
                  <FiEdit2 className="mr-2" />
                  Edit Information
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-200"
                >
                  <FiX className="mr-2" />
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8 sm:px-8">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-5">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
                    <input
                      type="text"
                      name="propertyName"
                      value={formData.propertyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Grade</label>
                    <input
                      type="text"
                      name="propertyGrade"
                      value={formData.propertyGrade}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration VAT</label>
                    <input
                      type="text"
                      name="registrationVAT"
                      value={formData.registrationVAT}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration CST</label>
                    <input
                      type="text"
                      name="registrationCST"
                      value={formData.registrationCST}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <input
                      type="text"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fax</label>
                    <input
                      type="text"
                      name="fax"
                      value={formData.fax}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration TIN</label>
                    <input
                      type="text"
                      name="registrationTIN"
                      value={formData.registrationTIN}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">Click to upload</p>
                          <p className="text-xs text-gray-500">JPG, PNG (142x140px)</p>
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
                      <p className="mt-2 text-sm text-green-600 flex items-center">
                        <FiInfo className="mr-1" /> 
                        File selected: {formData.companyLogo.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 pt-6 border-t border-gray-200 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <FiSave className="mr-2" />
                    Update Information
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Left Column - Display Mode */}
                  <div className="space-y-4">
                    <InfoRow label="Property Name" value={formData.propertyName} />
                    <InfoRow label="Property Grade" value={formData.propertyGrade} />
                    <InfoRow label="City" value={formData.city} />
                    <InfoRow label="State" value={formData.state} />
                    <InfoRow label="Phone" value={formData.phone} />
                    <InfoRow label="Email" value={formData.email} />
                    <InfoRow label="Registration VAT" value={formData.registrationVAT} />
                    <InfoRow label="Registration CST" value={formData.registrationCST} />
                  </div>

                  {/* Right Column - Display Mode */}
                  <div className="space-y-4">
                    <InfoRow label="Property Type" value={formData.propertyType} />
                    <InfoRow label="Address" value={formData.address} />
                    <InfoRow label="Postal Code" value={formData.postalCode} />
                    <InfoRow label="Country" value={formData.country} />
                    <InfoRow label="Fax" value={formData.fax} />
                    <InfoRow label="Website" value={formData.website} />
                    <InfoRow label="Registration TIN" value={formData.registrationTIN} />
                    <InfoRow label="Company Logo" value="No file selected" />
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <div className="bg-blue-50 rounded-xl p-4 max-w-md w-full">
                    <div className="flex items-start">
                      <FiInfo className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-sm text-blue-700">
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
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <span className="text-sm font-medium text-gray-600 mb-1 sm:mb-0">{label}</span>
    <span className="text-sm font-semibold text-gray-800 text-right">{value || '-'}</span>
  </div>
);

export default PropertyInformation;