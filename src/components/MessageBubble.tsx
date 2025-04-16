import React from 'react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  message: string;
  username: string;
  isOwn: boolean;
  isSystem?: boolean;
  timestamp?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  username, 
  isOwn, 
  isSystem = false,
  timestamp 
}) => {
  if (isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="flex justify-center my-3"
      >
        <div className="px-4 py-2 bg-gray-100 rounded-full inline-flex items-center space-x-2 group">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
          <p className="text-sm text-gray-600">{message}</p>
          {timestamp && (
            <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {timestamp}
            </span>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 group`}
    >
      {!isOwn && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium mr-2 shadow-md flex-shrink-0">
          {username.charAt(0).toUpperCase()}
        </motion.div>
      )}
      <div className={`max-w-[70%] flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        {!isOwn && (
          <span className="text-xs text-gray-500 mb-1 ml-1">{username}</span>
        )}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className={`
            px-4 py-2 rounded-2xl shadow-sm
            ${isOwn 
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' 
              : 'bg-white text-gray-800 border border-gray-100'
            }
            ${isOwn ? 'rounded-tr-sm' : 'rounded-tl-sm'}
          `}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
          {timestamp && (
            <p className={`text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isOwn ? 'text-blue-100' : 'text-gray-400'}`}>
              {timestamp}
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
