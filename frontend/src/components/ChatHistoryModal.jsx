// src/components/ChatHistoryModal.jsx

import React from 'react';

function ChatHistoryModal({ chats, onClose }) {
  console.log(chats)

  if (!Array.isArray(chats)) {
    return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 w-3/4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chat History</h2>
        <button onClick={onClose} className="mb-4 px-4 py-2 bg-red-500 text-white rounded-lg">
          Close
        </button>
        NULL ARRAY FOR CHATS
      </div>
    </div>
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 w-3/4 max-h-[90vh]">
      <h2 className="text-xl font-bold mb-4">Chat History</h2>
      <div className="bg-white rounded-lg p-4 max-h-[70vh] overflow-y-auto">
        <ul>
          {chats.map((chat, index) => (
            <li key={index} className="mb-4 p-2 border-b">
              <p><strong>Prompt:</strong> {chat.prompt}</p>
              <div>
                <strong>Responses:</strong>
                <ul className="ml-4">
                  {Object.entries(chat.response).map(([model, response], idx) => (
                    <li key={idx} className="mt-1">
                      <strong>{model}:</strong> {response}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={onClose} className="mb-4 px-4 py-2 bg-red-500 text-white rounded-lg float-right mt-5">
          Close
        </button>
      </div>
</div>
    </div>
  );
};

export default ChatHistoryModal;
