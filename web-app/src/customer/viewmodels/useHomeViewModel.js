import { useState } from 'react';

const useHomeViewModel = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggleChat = () => {
    setIsChatOpen((previous) => !previous);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((previous) => !previous);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    // Gemini chatbot API integration will be added later.
    console.log('Chat message:', message);
    setMessage('');
  };

  return {
    isChatOpen,
    isMobileMenuOpen,
    message,
    setMessage,
    toggleChat,
    toggleMobileMenu,
    closeMobileMenu,
    sendMessage,
  };
};

export default useHomeViewModel;
