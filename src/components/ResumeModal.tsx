import React from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-5xl w-full h-[95vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Nick Chen - Resume</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="flex-1 overflow-hidden p-4">
          <iframe
            src="/Nick_Chen_Resume.pdf"
            className="w-full h-full border-0 rounded"
            title="Nick Chen Resume PDF"
          />
        </div>
      </div>
    </div>
  );
};
