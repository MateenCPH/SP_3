import React from "react";

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Loading...</h2>
        <p className="text-gray-500">Please wait while we fetch the data for you.</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
