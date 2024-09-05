// src/components/ModelSelection.jsx

import React from 'react';

const ModelSelection = () => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Model Selection</h2>
      <select className="w-full p-2 border border-gray-300 rounded">
        <option value="model1">Model 1</option>
        <option value="model2">Model 2</option>
        <option value="model3">Model 3</option>
      </select>
    </div>
  );
};

export default ModelSelection;
