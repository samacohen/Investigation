import React, { useEffect, useMemo } from 'react';

const ModelFilter = ({ filteredModels, setFilteredModels }) => {
  // Memoize the models array to avoid recreating it on every render
  const models = useMemo(() => ['Gemini', 'ChatGPT', 'Claude', 'Llama'], []);

  // Initialize filteredModels with all models selected by default
  useEffect(() => {
    if (filteredModels.length === 0) {
      setFilteredModels(models);  // Enable all models by default
    }
  }, [filteredModels, setFilteredModels, models]); // 'models' is now stable and won't cause unnecessary renders

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
