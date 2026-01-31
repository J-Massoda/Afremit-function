import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { kycAPI } from '../../../services/api';
import Icon from '../../../components/shared/Icon';

const ProviderKYCForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    businessRegistration: '',
    taxNumber: '',
    serviceCategory: '',
    operatingLocations: [''],
    bio: '',
    services: [''],
  });

  const [files, setFiles] = useState({
    businessRegistrationDoc: null,
    directorId: null,
    proofOfAddress: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ''],
    });
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray.length > 0 ? newArray : [''],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.businessName || !formData.businessRegistration || !formData.serviceCategory) {
      setError('Business name, registration, and service category are required');
      setLoading(false);
      return;
    }

    if (!files.businessRegistrationDoc || !files.directorId || !files.proofOfAddress) {
      setError('All three documents are required');
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append('businessName', formData.businessName);
      submitData.append('businessRegistration', formData.businessRegistration);
      submitData.append('taxNumber', formData.taxNumber);
      submitData.append('serviceCategory', formData.serviceCategory);
      submitData.append('operatingLocations', JSON.stringify(formData.operatingLocations.filter(l => l.trim())));
      submitData.append('bio', formData.bio);
      submitData.append('services', JSON.stringify(formData.services.filter(s => s.trim())));
      submitData.append('businessRegistrationDoc', files.businessRegistrationDoc);
      submitData.append('directorId', files.directorId);
      submitData.append('proofOfAddress', files.proofOfAddress);

      await kycAPI.submitProviderKYC(submitData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/provider/dashboard');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit KYC');
      setLoading(false);
    }
  };

  const FileDropzone = ({ name, label, accept, onDrop, file }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept,
      maxFiles: 1,
      maxSize: 5242880,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          onDrop(name, acceptedFiles[0]);
        }
      },
    });

    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} <span className="text-red-500">*</span>
        </label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
            ${file ? 'bg-green-50 border-green-500' : ''}`}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="text-green-600 text-sm">
              <svg className="mx-auto h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="font-medium">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          ) : (
            <div className="text-gray-500 text-sm">
              <svg className="mx-auto h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p>{isDragActive ? 'Drop here' : 'Click or drag'}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleFileDrop = (name, file) => {
    setFiles({
      ...files,
      [name]: file,
    });
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg text-center"
      >
        <div className="text-green-500 mb-4">
          <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Provider KYC Submitted!</h2>
        <p className="text-gray-600 mb-4">
          Your business documents are under review. Once approved, you'll be published in the provider directory.
        </p>
        <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Provider KYC Verification</h2>
        <p className="text-gray-600 mb-8">
          Submit your business documents to become a verified service provider.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Business Information */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Premier Builders Ltd"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Registration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessRegistration"
                  value={formData.businessRegistration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="REG123456"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Number (Optional)
                </label>
                <input
                  type="text"
                  name="taxNumber"
                  value={formData.taxNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="TAX789012"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="construction">Construction</option>
                  <option value="medical">Medical</option>
                  <option value="education">Education</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operating Locations
              </label>
              {formData.operatingLocations.map((location, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => handleArrayChange('operatingLocations', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Johannesburg"
                  />
                  {formData.operatingLocations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('operatingLocations', index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('operatingLocations')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Location
              </button>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services Offered
              </label>
              {formData.services.map((service, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={service}
                    onChange={(e) => handleArrayChange('services', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Residential Construction"
                  />
                  {formData.services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('services', index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('services')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Service
              </button>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell potential clients about your business..."
              />
            </div>
          </div>

          {/* Document Uploads */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FileDropzone
                name="businessRegistrationDoc"
                label="Business Registration"
                accept={{ 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.jpeg', '.png'] }}
                onDrop={handleFileDrop}
                file={files.businessRegistrationDoc}
              />

              <FileDropzone
                name="directorId"
                label="Director ID/Passport"
                accept={{ 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.jpeg', '.png'] }}
                onDrop={handleFileDrop}
                file={files.directorId}
              />

              <FileDropzone
                name="proofOfAddress"
                label="Proof of Address"
                accept={{ 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.jpeg', '.png'] }}
                onDrop={handleFileDrop}
                file={files.proofOfAddress}
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Icon name="clipboard" className="w-5 h-5" /> Verification Process:
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Admin reviews your documents (1-3 business days)</li>
              <li>• Once approved, you're verified and published</li>
              <li>• Verified badge displayed on your profile</li>
              <li>• Start receiving quote requests from clients</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Provider KYC'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProviderKYCForm;
