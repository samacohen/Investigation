// src/components/ModelSelection.jsx

import React from 'react';

const ModelSelection = ({ selectedModels, setSelectedModels }) => {
  const models = ['Gemini', 'ChatGPT', 'Claude', 'Llama'];

  const handleToggle = (model) => {
    setSelectedModels((prevSelected) => {
      if (prevSelected.includes(model)) {
        return prevSelected.filter((m) => m !== model);
      } else {
        return [...prevSelected, model];
      }
    });
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4 text-black">Model Selection</h2>
      <div className="space-y-4">
        {models.map((model, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-black">{model}</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={selectedModels.includes(model)}
                onChange={() => handleToggle(model)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelection;
