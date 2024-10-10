// src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import ModelSelection from '../components/ModelSelection';
import ModelFilter from '../components/ModelFilter'; // Import the new ModelFilter component
import ChatInput from '../components/ChatInput';
import ChatDisplay from '../components/ChatDisplay';
import Header from '../components/Header';
import backgroundImage from '../assets/background.png'; // Import background image
import ChatHistoryModal from '../components/ChatHistoryModal'; // Import Modal component
import axios from 'axios'; //Used for fetching data

const DashboardPage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]); // For selecting models to send prompts to
  const [filteredModels, setFilteredModels] = useState([]); // For filtering displayed model responses
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [chatHistory, setChatHistory] = useState([]); // State to store chat history
  const [loading, setLoading] = useState(false);

  // Function to send prompt to Flask backend
  const sendPromptToLLM = async (prompt, selectedModels) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          models: selectedModels,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      return {};
    }
  };

  const addMessage = async (message) => {
    // Add user's message to the chat
    setMessages((prevMessages) => [...prevMessages, { text: message.text, isUser: true }]);

    // Send the prompt to selected models
    const responses = await sendPromptToLLM(message.text, selectedModels);

    if (responses && Object.keys(responses).length > 0) {
      // Add responses from each model to the chat
      const responseMessages = Object.keys(responses).map((model) => ({
        text: `${model} response: ${responses[model]}`,
        isUser: false,
        model: model, // Add the model key to track which model the response came from
      }));
      setMessages((prevMessages) => [...prevMessages, ...responseMessages]);
    } else {
      console.error('No valid response received from the backend');
    }
  };

  // Function to clear chat messages
  const clearChat = () => {
    setMessages([]);
  };


  // Function to fetch chat history from MongoDB
  const fetchChatHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/chats');
      setChatHistory(response.data);
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const showChatHistory = async () => {
    fetchChatHistory()
  }

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
            <ModelFilter filteredModels={filteredModels} setFilteredModels={setFilteredModels} />
            {/* Clear Chat Button */}
            <button
              className="w-full mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={clearChat}
            >
              Clear Chat
            </button>

            <button
              className="w-full mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              onClick={showChatHistory} // Function to open the modal
            >
              Chat History
            </button>
            {/*isModalOpen && <Modal chatHistory={chatHistory} onClose={closeModal} />*/}

          </div>

          {/* Right 5/6 - Chatbot Interface */}
          <div className="flex-1 flex flex-col ml-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4">
            {/* Chat Display */}
            <div className="flex-1 overflow-y-auto p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg">
              <ChatDisplay messages={messages.filter((message) =>
                message.isUser || filteredModels.includes(message.model)
              )} />
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
            {/* Loading Spinner */}
            {loading && (
              <div className="flex justify-center items-center mt-4">
                <div className="loader"></div>
              </div>  
            )}
          </div>
        </div>

        {/* Modal for Chat History */}
        {isModalOpen && (
          <ChatHistoryModal chats={chatHistory} onClose={() => setIsModalOpen(false)}>
            
          </ChatHistoryModal>
        )}

      </div>
    </div>
  );
};

export default DashboardPage;
