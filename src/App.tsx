import { useRef, useState, useEffect } from 'react';
import RoomJoin from './components/RoomJoin';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import Sidebar from './components/Sidebar';

interface Message {
  text: string;
  username: string;
  isOwn: boolean;
  timestamp: string;
  isSystem?: boolean;
}

interface User {
  username: string;
  isCurrentUser: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const handleJoinRoom = (roomId: string, usernameProp: string, isCreate: boolean) => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      wsRef.current = ws;
      setUsername(usernameProp);

      ws.send(JSON.stringify({
        type: isCreate ? 'create' : 'join',
        payload: {
          roomId,
          username: usernameProp
        }
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'chat':
          // Only add messages from other users
          if (data.payload.username !== usernameProp) {
            setMessages(m => [...m, {
              text: data.payload.message,
              username: data.payload.username || 'Anonymous',
              isOwn: false,
              timestamp: new Date().toLocaleTimeString()
            }]);
          }
          break;

        case 'system':
          if (data.payload.roomId) {
            setCurrentRoom(data.payload.roomId);
          }
          // Update online users when someone joins/leaves
          if (data.payload.message.includes('joined the room')) {
            const joinedUsername = data.payload.message.split(' joined')[0];
            setOnlineUsers(prev => [
              ...prev,
              { username: joinedUsername, isCurrentUser: joinedUsername === usernameProp }
            ]);
          } else if (data.payload.message.includes('left the room')) {
            const leftUsername = data.payload.message.split(' left')[0];
            setOnlineUsers(prev => prev.filter(u => u.username !== leftUsername));
          }
          setMessages(m => [...m, {
            text: data.payload.message,
            username: 'System',
            isOwn: false,
            timestamp: new Date().toLocaleTimeString(),
            isSystem: true
          }]);
          break;

        case 'error':
          alert(data.payload.message);
          break;
      }
    };

    ws.onerror = () => {
      alert('Failed to connect to chat server');
    };

    ws.onclose = () => {
      setCurrentRoom(null);
      setUsername(null);
      setMessages([]);
      setOnlineUsers([]);
    };
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const messageList = messagesContainerRef.current;
    if (messageList) {
      const isAtBottom = messageList.scrollHeight - messageList.scrollTop <= messageList.clientHeight + 100;
      if (isAtBottom) {
        scrollToBottom();
      }
    }
  }, [messages]);

  useEffect(() => {
    if (username && currentRoom) {
      setOnlineUsers(prev => [
        { username, isCurrentUser: true },
        ...prev.filter(u => u.username !== username)
      ]);
    }
  }, [username, currentRoom]);

  const handleSendMessage = () => {
    const message = chatInputRef.current?.value?.trim();
    if (!message || !wsRef.current || !username) return;

    wsRef.current.send(JSON.stringify({
      type: 'chat',
      payload: {
        message: message
      }
    }));

    // Add message immediately for the sender
    setMessages(m => [...m, {
      text: message,
      username: username,
      isOwn: true,
      timestamp: new Date().toLocaleTimeString()
    }]);

    if (chatInputRef.current) {
      chatInputRef.current.value = '';
      chatInputRef.current.focus();
    }
  };

  const handleLeaveRoom = () => {
    wsRef.current?.close();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!currentRoom ? (
        <RoomJoin onJoin={handleJoinRoom} />
      ) : (
        <div className="flex min-h-screen bg-white">
          <Sidebar 
            roomId={currentRoom}
            users={onlineUsers}
            onLeaveRoom={handleLeaveRoom}
          />
          <div className="flex-1 flex flex-col min-h-screen">
            <div 
              className="flex-1 overflow-y-auto custom-scrollbar p-4" 
              ref={messagesContainerRef}
            >
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <MessageBubble
                    key={`${message.timestamp}-${index}`}
                    message={message.text}
                    username={message.username}
                    isOwn={message.isOwn}
                    isSystem={message.isSystem}
                    timestamp={message.timestamp}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <ChatInput inputRef={chatInputRef} onSend={handleSendMessage} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;