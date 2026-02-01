import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Icon from './Icon';

const ChatBox = ({ provider, isOpen, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock initial system message
  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: 1,
          sender: 'system',
          content: `Chat initiated with ${provider.businessName}. All communication is monitored for security purposes. Do not share personal contact information outside this platform.`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [isOpen, provider]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: 'client',
      senderName: user?.name || user?.fullName,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');
    setLoading(true);

    // Simulate provider response (in production, this would be real-time)
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        sender: 'provider',
        senderName: provider.businessName,
        content: `Thank you for your message. We'll review your inquiry and respond shortly.`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, response]);
      setLoading(false);
    }, 2000);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black bg-opacity-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white w-full md:w-[600px] h-[100vh] md:h-[600px] md:rounded-2xl shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-primary text-white p-4 flex items-center justify-between md:rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="building" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">{provider.businessName}</h3>
                <p className="text-xs text-gray-200">Secure Chat • Monitored</p>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-primary-700 p-2 rounded-full">
              <Icon name="close" className="w-6 h-6" />
            </button>
          </div>

          {/* Security Notice */}
          <div className="bg-yellow-50 border-b border-yellow-200 p-3">
            <div className="flex items-start gap-2 text-sm text-yellow-800">
              <Icon name="warning" className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Security Notice:</strong> Do not share phone numbers, email addresses, or
                other contact information. All communication must stay on the platform.
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'client' ? 'justify-end' : 'justify-start'
                } ${message.sender === 'system' ? 'justify-center' : ''}`}
              >
                {message.sender === 'system' ? (
                  <div className="bg-gray-100 text-gray-600 text-xs px-4 py-2 rounded-full max-w-[80%] text-center">
                    {message.content}
                  </div>
                ) : (
                  <div className={`max-w-[75%] ${message.sender === 'client' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'client'
                          ? 'bg-secondary text-white'
                          : 'bg-gray-100 text-neutral-800'
                      }`}
                    >
                      {message.sender === 'provider' && (
                        <p className="text-xs font-semibold mb-1 opacity-70">{message.senderName}</p>
                      )}
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">{formatTime(message.timestamp)}</p>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || loading}
                className="bg-secondary text-white px-6 py-3 rounded-full hover:bg-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                <span className="hidden sm:inline">Send</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatBox;
