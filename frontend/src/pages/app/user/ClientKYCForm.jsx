import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { kycAPI } from '../../../services/api';
import Icon from '../../../components/shared/Icon';

const ClientKYCForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    country: '',
    idNumber: '',
  });

  const [files, setFiles] = useState({
    idDocument: null,
    proofOfIdentity: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.fullName || !formData.dateOfBirth || !formData.country || !formData.idNumber) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (!files.idDocument || !files.proofOfIdentity) {
      setError('Both ID document and proof of identity are required');
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append('fullName', formData.fullName);
      submitData.append('dateOfBirth', formData.dateOfBirth);
      submitData.append('country', formData.country);
      submitData.append('idNumber', formData.idNumber);
      submitData.append('idDocument', files.idDocument);
      submitData.append('proofOfIdentity', files.proofOfIdentity);

      await kycAPI.submitUserKYC(submitData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/client/dashboard');
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
      maxSize: 5242880, // 5MB
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
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
            ${file ? 'bg-green-50 border-green-500' : ''}`}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="text-green-600">
              <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          ) : (
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-1">
                {isDragActive ? 'Drop file here...' : 'Drag & drop or click to select'}
              </p>
              <p className="text-xs">PDF, JPG, PNG (max 5MB)</p>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">KYC Submitted Successfully!</h2>
        <p className="text-gray-600 mb-4">
          Your documents are under review. You'll be notified once verified.
        </p>
        <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete KYC Verification</h2>
        <p className="text-gray-600 mb-8">
          Submit your identification documents to verify your account and access all features.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Country</option>
                <option value="South Africa">South Africa</option>
                <option value="Zimbabwe">Zimbabwe</option>
                <option value="Botswana">Botswana</option>
                <option value="Namibia">Namibia</option>
                <option value="Zambia">Zambia</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID/Passport Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ID123456789"
                required
              />
            </div>
          </div>

          <FileDropzone
            name="idDocument"
            label="ID/Passport Document"
            accept={{ 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.jpeg', '.png'] }}
            onDrop={handleFileDrop}
            file={files.idDocument}
          />

          <FileDropzone
            name="proofOfIdentity"
            label="Proof of Identity (e.g., Utility Bill, Bank Statement)"
            accept={{ 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.jpeg', '.png'] }}
            onDrop={handleFileDrop}
            file={files.proofOfIdentity}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Icon name="clipboard" className="w-5 h-5" /> Requirements:
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Documents must be clear and readable</li>
              <li>• Files must be less than 5MB each</li>
              <li>• Accepted formats: PDF, JPG, PNG</li>
              <li>• Review typically takes 1-2 business days</li>
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
              'Submit KYC Verification'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ClientKYCForm;
