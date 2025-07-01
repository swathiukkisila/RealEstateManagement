import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Fraudflag = ({ isFraudulent }) => {
  return (
    <div className="flex items-center mt-2">
      {isFraudulent ? (
        <div className="flex items-center text-red-600 bg-red-50 border border-red-300 px-3 py-1 rounded-xl">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">⚠️ Suspicious Listing Detected</span>
        </div>
      ) : (
        <div className="flex items-center text-green-700 bg-green-50 border border-green-300 px-3 py-1 rounded-xl">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Verified Location</span>
        </div>
      )}
    </div>
  );
};

export default Fraudflag;
