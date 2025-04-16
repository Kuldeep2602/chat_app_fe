import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RoomJoinProps {
  onJoin: (roomId: string, username: string, isCreate: boolean) => void;
}

const RoomJoin: React.FC<RoomJoinProps> = ({ onJoin }) => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = () => {
    if (!username || !roomId) return;
    onJoin(roomId, username, isCreating);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isCreating ? 'Create Room' : 'Join Room'}
          </h2>
          <p className="text-center text-gray-500 mb-8">Connect and chat with your friends</p>

          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/50 backdrop-blur-sm"
                placeholder="Enter your username"
              />
              <label className="absolute -top-2.5 left-4 px-2 bg-white text-sm text-gray-600">Username</label>
            </div>

            <div className="relative">
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/50 backdrop-blur-sm"
                placeholder="Enter room ID"
              />
              <label className="absolute -top-2.5 left-4 px-2 bg-white text-sm text-gray-600">Room ID</label>
            </div>

            <motion.button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl
                       hover:shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isCreating ? 'Create Room' : 'Join Room'}
            </motion.button>

            <div className="text-center">
              <button
                onClick={() => setIsCreating(!isCreating)}
                className="text-blue-600 hover:text-purple-600 text-sm font-medium transition-colors"
              >
                {isCreating ? 'Join an existing room instead?' : 'Create a new room instead?'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RoomJoin;
