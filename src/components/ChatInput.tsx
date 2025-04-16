import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ inputRef, onSend }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 backdrop-blur-sm border-t border-gray-100 p-4 sticky bottom-0 shadow-lg"
    >
      <div className="max-w-4xl mx-auto">
        <div 
          className={`
            flex items-center space-x-4 p-2 rounded-2xl
            ${isFocused ? 'bg-white shadow-lg' : 'bg-gray-50'}
            transition-all duration-300
          `}
        >
          <input
            ref={inputRef}
            type="text"
            className="
              flex-1 px-4 py-3 bg-transparent rounded-xl
              focus:outline-none placeholder-gray-400
              transition-all duration-300
            "
            placeholder="Type your message..."
            onKeyDown={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <motion.button
            onClick={onSend}
            className="
              px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600
              text-white font-medium rounded-xl shadow-md
              hover:shadow-lg hover:from-blue-500 hover:to-purple-500
              transition-all duration-200
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send
          </motion.button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </motion.div>
  );
};

export default ChatInput;
