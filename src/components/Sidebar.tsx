import React from 'react';

interface User {
  username: string;
  isCurrentUser: boolean;
}

interface SidebarProps {
  roomId: string;
  users: User[];
  onLeaveRoom: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ roomId, users, onLeaveRoom }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen p-4 flex flex-col">
      {/* Room Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <h2 className="text-lg font-semibold text-gray-700">Room: {roomId}</h2>
          </div>
        </div>
        <button
          onClick={onLeaveRoom}
          className="px-4 py-1 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          Leave Room
        </button>
      </div>

      {/* Chat Title */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Vibe Chat
        </h3>
      </div>

      {/* Online Users */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Online Users
        </h3>
        <div className="space-y-2">
          {users.map((user, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${user.isCurrentUser ? 'bg-blue-500' : 'bg-purple-500'} text-white font-medium`}>
                {user.username[0].toUpperCase()}
              </div>
              <span className="text-sm text-gray-700">
                {user.username} {user.isCurrentUser && '(You)'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Section */}
      <div className="mt-auto">
        <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </h3>
        <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
          Change Theme
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
