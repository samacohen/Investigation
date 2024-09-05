// src/pages/DashboardPage.jsx

import React, { useState } from 'react';
import ModelSelection from '../components/ModelSelection';
import ChatInput from '../components/ChatInput';
import ChatDisplay from '../components/ChatDisplay';
import Header from '../components/Header';
import backgroundImage from '../assets/background.png'; // Import background image

const DashboardPage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  const addMessage = (message) => {
    const responses = selectedModels.map((model) => ({
      text: `${model} response: ${message.text}`,
      isUser: false,
      model: model,
    }));
    setMessages([...messages, { text: message.text, isUser: true }, ...responses]);
  };

  return (
    <div
      className="relative flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background blur overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-lg"></div>

      {/* Page content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex h-full flex-grow p-4">
          {/* Left 1/6 Model Selection */}
          <div className="w-1/6 p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg">
            <ModelSelection selectedModels={selectedModels} setSelectedModels={setSelectedModels} />
          </div>

          {/* Right 5/6 - Chatbot Interface */}
          <div className="flex-1 flex flex-col ml-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4">
            {/* Chat Display */}
            <div className="flex-1 overflow-y-auto p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg">
              <ChatDisplay messages={messages} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg">
              {selectedModels.length > 0 ? (
                <ChatInput addMessage={addMessage} />
              ) : (
                <p className="text-center text-gray-600 font-bold">
                  Please select at least one model to chat with.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
