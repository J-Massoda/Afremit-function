import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ percentage, showLabel = true, color = 'secondary' }) => {
  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    success: 'bg-success',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-neutral-700">Progress</span>
          <span className="text-sm font-medium text-neutral-700">{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full ${colors[color]} rounded-full`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
