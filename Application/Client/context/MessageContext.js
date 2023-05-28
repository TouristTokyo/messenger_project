import React, { createContext, useEffect, useState } from 'react';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [forwardedMessages, setForwardedMessages] = useState([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem('forwardedMessages');
    if (storedMessages) {
      setForwardedMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
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
