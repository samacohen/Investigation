// src/components/ChatInput.jsx

import React, { useState } from 'react';

const ChatInput = ({ addMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage({ text: input, isUser: true });
      setInput(''); // Clear input field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 border border-gray-400 rounded-l-lg"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">
        Send
      </button>
    </form>
  );
};

export default ChatInput;
