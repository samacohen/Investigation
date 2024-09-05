// src/pages/DashboardPage.jsx

import React, { useState } from 'react';
import ModelSelection from '../components/ModelSelection';
import ChatInput from '../components/ChatInput';
import ChatDisplay from '../components/ChatDisplay';

const DashboardPage = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="flex h-screen">
      {/* Left 1/8 Model Selection */}
      <div className="w-1/8 bg-gray-200 p-4">
        <ModelSelection />
      </div>

      {/* Right 7/8 - Chatbot Interface */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Chat Display */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          <ChatDisplay messages={messages} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-gray-300">
          <ChatInput addMessage={addMessage} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
