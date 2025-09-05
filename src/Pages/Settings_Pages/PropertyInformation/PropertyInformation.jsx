import React, { useState } from "react";

const PropertyInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    propertyName: "GYOROOM",
    propertyGrade: "1st Grade",
    city: "Chittagong",
    state: "Chittagong",
    phone: "+8801818699845",
    email: "email@email.com",
    registrationVAT: "12345678",
    registrationCST: "",
    propertyType: "First",
    address: "Chittagong, Bangladesh",
    postalCode: "4000",
    country: "Bangladesh",
    fax: "",
    website: "www.web.com",
    registrationTIN: "",
    companyLogo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      companyLogo: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the data to your backend
    console.log("Form data submitted:", formData);
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 bg-red-100 p-6 rounded-2xl">
        Property Information
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name
                </label>
                <input
                  type="text"
                  name="propertyName"
                  value={formData.propertyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Grade
                </label>
                <input
                  type="text"
                  name="propertyGrade"
                  value={formData.propertyGrade}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration VAT
                </label>
                <input
                  type="text"
                  name="registrationVAT"
                  value={formData.registrationVAT}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration CST
                </label>
                <input
                  type="text"
                  name="registrationCST"
                  value={formData.registrationCST}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <input
                  type="text"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fax
                </label>
                <input
                  type="text"
                  name="fax"
                  value={formData.fax}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration TIN
                </label>
                <input
                  type="text"
                  name="registrationTIN"
                  value={formData.registrationTIN}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Logo
                </label>
                <input
                  type="file"
                  name="companyLogo"
                  onChange={handleFileChange}
                  accept=".jpg,.png"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Valid Image Formats: .jpg / .png
                  <br />
                  Dimension: 142px X 140px
                </p>
                {formData.companyLogo && (
                  <p className="text-sm text-green-600 mt-1">
                    File selected: {formData.companyLogo.name}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="px-6 py-2 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition-colors"
              >
                Update
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Left Column - Display Mode */}
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Property Name</span>
                  <span className="font-medium">{formData.propertyName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Property Grade</span>
                  <span className="font-medium">{formData.propertyGrade}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">City</span>
                  <span className="font-medium">{formData.city}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">State</span>
                  <span className="font-medium">{formData.state}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Registration VAT</span>
                  <span className="font-medium">
                    {formData.registrationVAT || "-"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Registration CST</span>
                  <span className="font-medium">
                    {formData.registrationCST || "-"}
                  </span>
                </div>
              </div>

              {/* Right Column - Display Mode */}
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-medium">{formData.propertyType}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Address</span>
                  <span className="font-medium text-right">
                    {formData.address}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Postal Code</span>
                  <span className="font-medium">{formData.postalCode}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Country</span>
                  <span className="font-medium">{formData.country}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Fax</span>
                  <span className="font-medium">{formData.fax || "-"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Website</span>
                  <span className="font-medium">{formData.website}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Registration TIN</span>
                  <span className="font-medium">
                    {formData.registrationTIN || "-"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Company Logo</span>
                  <span className="font-medium text-sm text-gray-500">
                    No file selected
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition-colors"
            >
              Update
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyInformation;
