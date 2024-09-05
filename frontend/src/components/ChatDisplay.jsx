// src/components/ChatDisplay.jsx

import React from 'react';

const ChatDisplay = ({ messages }) => {
  return (
    <div className="space-y-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4">
      {messages.map((message, index) => (
        <div key={index} className={`p-4 rounded-lg ${message.isUser ? 'bg-blue-100' : 'bg-gray-200'}`}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
