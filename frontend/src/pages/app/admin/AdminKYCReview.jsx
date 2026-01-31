import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminAPI } from '../../../services/api';
import Icon from '../../../components/shared/Icon';

const AdminKYCReview = () => {
  const [kycs, setKycs] = useState([]);
  const [selectedKYC, setSelectedKYC] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(null);

  useEffect(() => {
    fetchKYCs();
  }, [filter]);

  const fetchKYCs = async () => {
    setLoading(true);
    try {
      const response = filter === 'pending' 
        ? await adminAPI.getPendingKYC()
        : await adminAPI.getAllKYC({ status: filter === 'all' ? undefined : filter });
      setKycs(response.data.kyc);
    } catch (error) {
      console.error('Failed to fetch KYCs:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = async (kycId) => {
    try {
      const response = await adminAPI.getKYCById(kycId);
      setSelectedKYC(response.data);
    } catch (error) {
      console.error('Failed to fetch KYC details:', error);
    }
  };

  const handleApprove = async (kycId) => {
    if (!confirm('Are you sure you want to approve this KYC submission?')) return;

    try {
      await adminAPI.approveKYC(kycId);
      alert('KYC approved successfully!');
      setSelectedKYC(null);
      fetchKYCs();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to approve KYC');
    }
  };

  const handleReject = async (kycId) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    try {
      await adminAPI.rejectKYC(kycId, rejectionReason);
      alert('KYC rejected');
      setRejectionReason('');
      setShowRejectModal(null);
      setSelectedKYC(null);
      fetchKYCs();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to reject KYC');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">KYC Review</h1>
        <p className="text-gray-600">Review and approve user and provider KYC submissions</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex gap-4">
          {['pending', 'approved', 'rejected', 'all'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <svg className="animate-spin h-12 w-12 mx-auto text-blue-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : kycs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No KYC submissions found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {kycs.map((kyc) => (
            <motion.div
              key={kyc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {kyc.userType === 'client' ? kyc.fullName : kyc.businessName}
                  </h3>
                  <p className="text-sm text-gray-600">{kyc.userEmail}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Type: <span className="font-medium">{kyc.userType}</span> | 
                    Submitted: {new Date(kyc.submittedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(kyc.status)}
                </div>
              </div>

              {kyc.userType === 'client' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-600">DOB:</span>
                    <p className="font-medium">{kyc.dateOfBirth}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Country:</span>
                    <p className="font-medium">{kyc.country}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">ID Number:</span>
                    <p className="font-medium">{kyc.idNumber}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-600">Registration:</span>
                    <p className="font-medium">{kyc.businessRegistration}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <p className="font-medium capitalize">{kyc.serviceCategory}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Locations:</span>
                    <p className="font-medium">{kyc.operatingLocations?.join(', ')}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => viewDetails(kyc.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
                {kyc.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => handleApprove(kyc.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setShowRejectModal(kyc.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reject KYC Submission</h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              rows={4}
              placeholder="Provide reason for rejection..."
            />
            <div className="flex gap-3">
              <button
                onClick={() => handleReject(showRejectModal)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Confirm Reject
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(null);
                  setRejectionReason('');
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Details Modal */}
      {selectedKYC && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-8 max-w-3xl w-full my-8"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">KYC Details</h2>
                <p className="text-gray-600">
                  {selectedKYC.userType === 'client' ? selectedKYC.fullName : selectedKYC.businessName}
                </p>
              </div>
              <button
                onClick={() => setSelectedKYC(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">User Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <p className="font-medium">{selectedKYC.user?.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <p className="font-medium">{selectedKYC.user?.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <p>{getStatusBadge(selectedKYC.status)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Submitted:</span>
                    <p className="font-medium">{new Date(selectedKYC.submittedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {selectedKYC.userType === 'client' ? 'Personal Details' : 'Business Details'}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {selectedKYC.userType === 'client' ? (
                    <>
                      <div>
                        <span className="text-gray-600">Full Name:</span>
                        <p className="font-medium">{selectedKYC.fullName}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Date of Birth:</span>
                        <p className="font-medium">{selectedKYC.dateOfBirth}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Country:</span>
                        <p className="font-medium">{selectedKYC.country}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">ID Number:</span>
                        <p className="font-medium">{selectedKYC.idNumber}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="text-gray-600">Business Name:</span>
                        <p className="font-medium">{selectedKYC.businessName}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Registration:</span>
                        <p className="font-medium">{selectedKYC.businessRegistration}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Tax Number:</span>
                        <p className="font-medium">{selectedKYC.taxNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Category:</span>
                        <p className="font-medium capitalize">{selectedKYC.serviceCategory}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Operating Locations:</span>
                        <p className="font-medium">{selectedKYC.operatingLocations?.join(', ')}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Documents</h3>
                <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                  <Icon name="warning" className="w-4 h-4" /> Document viewing would be implemented with proper file server/CDN
                </p>
                <div className="space-y-2 text-sm">
                  {selectedKYC.userType === 'client' ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">ID Document:</span>
                        <a href={`http://localhost:5000${selectedKYC.idDocument}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View Document
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Proof of Identity:</span>
                        <a href={`http://localhost:5000${selectedKYC.proofOfIdentity}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View Document
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Business Registration:</span>
                        <a href={`http://localhost:5000${selectedKYC.businessRegistrationDoc}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View Document
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Director ID:</span>
                        <a href={`http://localhost:5000${selectedKYC.directorId}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View Document
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Proof of Address:</span>
                        <a href={`http://localhost:5000${selectedKYC.proofOfAddress}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View Document
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {selectedKYC.status === 'PENDING' && (
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => handleApprove(selectedKYC.id)}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                  >
                    Approve KYC
                  </button>
                  <button
                    onClick={() => {
                      setShowRejectModal(selectedKYC.id);
                      setSelectedKYC(null);
                    }}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                  >
                    Reject KYC
                  </button>
                </div>
              )}

              {selectedKYC.rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Rejection Reason:</h4>
                  <p className="text-sm text-red-800">{selectedKYC.rejectionReason}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminKYCReview;
