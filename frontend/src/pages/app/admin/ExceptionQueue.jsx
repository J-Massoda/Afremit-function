import React, { useState } from 'react';
import Card from '../../../components/shared/Card';
import Button from '../../../components/shared/Button';
import Badge from '../../../components/shared/Badge';
import Icon from '../../../components/shared/Icon';
import {
  mockExceptions,
  mockStudents,
  getPendingExceptions
} from '../../../mock/educationEscrow';

/**
 * EXCEPTION QUEUE MODULE
 * Admin-only intervention for low AI confidence matches
 */
const ExceptionQueue = () => {
  const [selectedStudent, setSelectedStudent] = useState({});
  const pendingExceptions = getPendingExceptions();

  const handleManualAllocate = (transactionId) => {
    const studentId = selectedStudent[transactionId];
    if (!studentId) {
      alert('Please select a student for allocation');
      return;
    }
    alert(`Transaction ${transactionId} manually allocated to student ${studentId}`);
  };

  const handleReturnToPayer = (transactionId) => {
    if (window.confirm('Return funds to payer? This action cannot be undone.')) {
      alert(`Transaction ${transactionId} returned to payer`);
    }
  };

  const handleRequestClarification = (transactionId) => {
    alert(`Clarification request sent to payer for transaction ${transactionId}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Exception Queue</h1>
              <p className="text-orange-100">Manual intervention required for low-confidence matches</p>
            </div>
            <Badge variant="error" className="bg-white text-red-600 text-lg px-4 py-2">
              {pendingExceptions.length} Pending
            </Badge>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {pendingExceptions.length === 0 ? (
          <Card className="text-center py-16">
            <Icon name="check" className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-green-600 mb-2">All Clear!</h2>
            <p className="text-neutral-600">No exceptions pending. AI is handling all allocations.</p>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-4">
                <Icon name="alert" className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h3 className="font-bold text-yellow-800 mb-1">Action Required</h3>
                  <p className="text-sm text-yellow-700">
                    These transactions have low AI confidence scores and require manual review.
                    Please allocate to correct student, return to payer, or request additional information.
                  </p>
                </div>
              </div>
            </Card>

            {pendingExceptions.map((exception) => (
              <Card key={exception.transaction_id} className="border-l-4 border-red-500 bg-red-50/30">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-red-700">{exception.transaction_id}</h3>
                      <Badge variant="error">
                        Match Score: {exception.match_score}%
                      </Badge>
                      <Badge variant="error">
                        {exception.match_confidence.toUpperCase()} CONFIDENCE
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-semibold text-neutral-700">Payer:</span>{' '}
                        <span className="text-neutral-600">{exception.payer_name}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-700">Institution:</span>{' '}
                        <span className="text-neutral-600">{exception.institution_name}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-700">Amount:</span>{' '}
                        <span className="text-primary font-bold">${exception.invoice_amount.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-700">Payment Date:</span>{' '}
                        <span className="text-neutral-600">
                          {new Date(exception.payment_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-red-600 mb-1">
                      ${exception.gross_amount.toFixed(2)}
                    </div>
                    <p className="text-xs text-neutral-500">Held in escrow</p>
                  </div>
                </div>

                {/* Flagged Reason */}
                <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-bold text-red-800 mb-2">⚠️ Exception Reason:</h4>
                  <p className="text-sm text-red-700">{exception.flagged_reason}</p>
                </div>

                {/* Available Information */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
                    <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                      Provided Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Student ID:</span>
                        <span className={exception.student_id ? 'text-green-600 font-semibold' : 'text-red-600'}>
                          {exception.student_id || 'Not provided'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Invoice Number:</span>
                        <span className={exception.invoice_number ? 'text-green-600 font-semibold' : 'text-red-600'}>
                          {exception.invoice_number || 'Not provided'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Student Name:</span>
                        <span className={exception.student_name ? 'text-green-600 font-semibold' : 'text-red-600'}>
                          {exception.student_name || 'Not provided'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
                    <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                      Possible Matches
                    </h4>
                    <div className="space-y-2">
                      {mockStudents
                        .filter(s => s.parent_payer_id === exception.payer_id)
                        .map(student => (
                          <div
                            key={student.student_id}
                            className="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={`student-${exception.transaction_id}`}
                              value={student.student_id}
                              onChange={(e) => setSelectedStudent({
                                ...selectedStudent,
                                [exception.transaction_id]: e.target.value
                              })}
                              className="text-primary"
                            />
                            <div className="flex-1 text-sm">
                              <p className="font-semibold text-neutral-800">{student.name}</p>
                              <p className="text-xs text-neutral-500">
                                {student.student_number} • {student.institution_id}
                              </p>
                            </div>
                          </div>
                        ))}
                      {mockStudents.filter(s => s.parent_payer_id === exception.payer_id).length === 0 && (
                        <p className="text-sm text-red-600">No linked students found</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Financial Breakdown */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <p className="text-xs text-neutral-600 mb-1">Invoice</p>
                    <p className="font-bold text-blue-600">${exception.invoice_amount.toFixed(2)}</p>
                  </div>
                  <div className="bg-orange-50 rounded p-3 text-center">
                    <p className="text-xs text-neutral-600 mb-1">Payer Fee</p>
                    <p className="font-bold text-orange-600">${exception.payer_fee.toFixed(2)}</p>
                  </div>
                  <div className="bg-red-50 rounded p-3 text-center">
                    <p className="text-xs text-neutral-600 mb-1">Inst. Fee</p>
                    <p className="font-bold text-red-600">${exception.institution_fee.toFixed(2)}</p>
                  </div>
                  <div className="bg-green-50 rounded p-3 text-center">
                    <p className="text-xs text-neutral-600 mb-1">Net to School</p>
                    <p className="font-bold text-green-600">${exception.net_to_institution.toFixed(2)}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid md:grid-cols-3 gap-3">
                  <Button
                    variant="success"
                    className="w-full"
                    onClick={() => handleManualAllocate(exception.transaction_id)}
                  >
                    <Icon name="check" className="w-4 h-4 mr-2" />
                    Manual Allocate
                  </Button>
                  <Button
                    variant="warning"
                    className="w-full"
                    onClick={() => handleRequestClarification(exception.transaction_id)}
                  >
                    <Icon name="mail" className="w-4 h-4 mr-2" />
                    Request Clarification
                  </Button>
                  <Button
                    variant="error"
                    className="w-full"
                    onClick={() => handleReturnToPayer(exception.transaction_id)}
                  >
                    <Icon name="x" className="w-4 h-4 mr-2" />
                    Return to Payer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExceptionQueue;
