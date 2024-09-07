// src/components/ModelFilter.jsx

import React from 'react';

const ModelFilter = ({ filteredModels, setFilteredModels }) => {
  const models = ['Gemini', 'ChatGPT', 'Claude', 'Llama'];

  const handleToggle = (model) => {
    setFilteredModels((prevFiltered) => {
      if (prevFiltered.includes(model)) {
        return prevFiltered.filter((m) => m !== model);
      } else {
        return [...prevFiltered, model];
      }
    });
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg p-4 rounded-lg mt-4">
      <h2 className="text-lg font-bold mb-4 text-black">Model Filter</h2>
      <div className="space-y-4">
        {models.map((model, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-black">{model}</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={filteredModels.includes(model)}
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

export default ModelFilter;
