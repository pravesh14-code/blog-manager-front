import React from 'react';

const SessionExpiredModal = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Session Expired</h2>
        <p className="text-sm text-gray-600 mb-4">
          Your session has expired. Please log in again to continue.
        </p>
        <button
          onClick={onConfirm}
          className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-6 rounded font-medium"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
