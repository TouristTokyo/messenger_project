import React, { createContext, useEffect, useState } from 'react';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [forwardedMessages, setForwardedMessages] = useState([]);

  useEffect(() => {
    // Load forwarded messages from localStorage on component mount
    const storedMessages = localStorage.getItem('forwardedMessages');
    if (storedMessages) {
      setForwardedMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    // Save forwarded messages to localStorage whenever it changes
    localStorage.setItem('forwardedMessages', JSON.stringify(forwardedMessages));
  }, [forwardedMessages]);

  const addForwardedMessage = (message) => {
    setForwardedMessages((prevMessages) => [...prevMessages, message]);
  };

  const clearForwardedMessages = () => {
    setForwardedMessages([]);
  };

  return (
    <MessageContext.Provider value={{ forwardedMessages, addForwardedMessage, clearForwardedMessages }}>
      {children}
    </MessageContext.Provider>
  );
};
