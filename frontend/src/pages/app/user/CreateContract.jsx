import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../../components/shared/Card';
import Button from '../../../components/shared/Button';
import Input, { TextArea, Select } from '../../../components/shared/Input';
import Icon from '../../../components/shared/Icon';
import { contractsAPI } from '../../../services/api';

const CreateContract = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    provider: '',
    totalAmount: '',
    startDate: '',
    endDate: '',
    milestones: [
      { title: '', amount: '', order: 1, description: '' }
    ]
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [
        ...formData.milestones,
        { title: '', amount: '', order: formData.milestones.length + 1, description: '' }
      ]
    });
  };

  const removeMilestone = (index) => {
    const newMilestones = formData.milestones.filter((_, i) => i !== index);
    setFormData({ ...formData, milestones: newMilestones });
  };

  const updateMilestone = (index, field, value) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index][field] = value;
    setFormData({ ...formData, milestones: newMilestones });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mock contract creation
      console.log('Creating contract:', formData);
      alert('Contract created successfully! (Demo)');
      navigate('/client/dashboard');
    } catch (error) {
      console.error('Error creating contract:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Create Construction Contract</h1>
        <p className="text-neutral-600">Define your project with clear milestones and payment terms</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {['Project Details', 'Define Milestones', 'Review & Submit'].map((label, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step > index ? 'bg-secondary text-white' : step === index + 1 ? 'bg-secondary text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm ${step >= index + 1 ? 'text-primary font-semibold' : 'text-neutral-400'}`}>
                {label}
              </span>
              {index < 2 && <div className={`flex-1 h-1 mx-4 ${step > index + 1 ? 'bg-secondary' : 'bg-neutral-200'}`} />}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Project Details */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <h3 className="text-2xl font-bold mb-6">Project Information</h3>
              
              <Input
                label="Project Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., House Construction in Johannesburg"
                required
              />

              <TextArea
                label="Project Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your construction project in detail..."
                rows={5}
                required
              />

              <Select
                label="Service Provider"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                options={[
                  { label: 'Select a provider...', value: '' },
                  { label: 'ABC Contractors (5★)', value: 'abc' },
                  { label: 'XYZ Builders (4.8★)', value: 'xyz' },
                  { label: 'Premium Construction (4.9★)', value: 'premium' }
                ]}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Expected End Date"
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="Total Project Amount (ZAR)"
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                placeholder="500000"
                required
              />

              <div className="flex justify-end">
                <Button type="button" onClick={() => setStep(2)} variant="primary">
                  Next: Define Milestones →
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Milestones */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Define Milestones</h3>
                <Button type="button" onClick={addMilestone} variant="secondary" size="sm" className="flex items-center gap-2">
                  <Icon name="plus" className="w-4 h-4" /> Add Milestone
                </Button>
              </div>

              <p className="text-neutral-600 mb-6">
                Break down your project into clear milestones. Payments will be released as each milestone is completed and approved.
              </p>

              <div className="space-y-6">
                {formData.milestones.map((milestone, index) => (
                  <div key={index} className="p-6 bg-neutral-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold">Milestone {index + 1}</h4>
                      {formData.milestones.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMilestone(index)}
                          className="text-danger hover:underline text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <Input
                      label="Milestone Title"
                      value={milestone.title}
                      onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                      placeholder="e.g., Foundation Complete"
                      required
                    />

                    <TextArea
                      label="Description"
                      value={milestone.description}
                      onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                      placeholder="What needs to be completed for this milestone?"
                      rows={3}
                      required
                    />

                    <Input
                      label="Payment Amount (ZAR)"
                      type="number"
                      value={milestone.amount}
                      onChange={(e) => updateMilestone(index, 'amount', e.target.value)}
                      placeholder="100000"
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <Button type="button" onClick={() => setStep(1)} variant="outline">
                  ← Back
                </Button>
                <Button type="button" onClick={() => setStep(3)} variant="primary">
                  Review Contract →
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <h3 className="text-2xl font-bold mb-6">Review Your Contract</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-2">Project Details</h4>
                  <div className="bg-neutral-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-semibold">Title:</span> {formData.title}</p>
                    <p><span className="font-semibold">Description:</span> {formData.description}</p>
                    <p><span className="font-semibold">Total Amount:</span> R{Number(formData.totalAmount).toLocaleString()}</p>
                    <p><span className="font-semibold">Duration:</span> {formData.startDate} to {formData.endDate}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Milestones ({formData.milestones.length})</h4>
                  <div className="space-y-3">
                    {formData.milestones.map((milestone, index) => (
                      <div key={index} className="bg-neutral-50 p-4 rounded-lg">
                        <p className="font-semibold">{index + 1}. {milestone.title}</p>
                        <p className="text-sm text-neutral-600 mb-1">{milestone.description}</p>
                        <p className="text-secondary font-bold">R{Number(milestone.amount).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-accent-50 border-2 border-accent rounded-lg p-4 mt-6">
                <p className="font-semibold text-accent-900 mb-2 flex items-center gap-2">
                  <Icon name="warning" className="w-5 h-5" /> Important
                </p>
                <p className="text-sm text-neutral-700">
                  Once created, you'll need to fund the escrow account before the provider can begin work. 
                  Funds will be held securely and released only when you approve each milestone.
                </p>
              </div>

              <div className="flex justify-between mt-8">
                <Button type="button" onClick={() => setStep(2)} variant="outline">
                  ← Back
                </Button>
                <Button type="submit" variant="primary" size="lg">
                  Create Contract & Fund Escrow
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default CreateContract;
