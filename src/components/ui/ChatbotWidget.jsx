import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatbotWidget.css';

const WELCOME = "Hello! I'm SmartBot, your AI assistant. How can I help you today?";

const QUICK_REPLIES = [
  "Tell me about your services",
  "How can AI help my business?",
  "Request a consultation",
  "Pricing information",
];

export default function ChatbotWidget() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', text: WELCOME }]);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const endRef                = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botReply = getBotResponse(text);
      setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
      setTyping(false);
    }, 1200);
  };

  const getBotResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('service')) return "We offer AI Automation, Custom Software, Web & Mobile Development, Cybersecurity, Machine Learning, Cloud Solutions, and more. Visit our Services page for full details!";
    if (lower.includes('price') || lower.includes('cost')) return "Our pricing is tailored to each project's scope. Contact our team at yerondereje432@gmail.com for a free consultation and custom quote.";
    if (lower.includes('ai') || lower.includes('machine learning')) return "We specialize in AI solutions including automation, chatbots, predictive analytics, and enterprise AI integration. Ready to transform your business?";
    if (lower.includes('consult')) return "We'd love to discuss your needs! You can book a free consultation on our Contact page, or email us at yerondereje432@gmail.com.";
    return "That's a great question! Our team of experts would be happy to help. Please visit our Contact page or email yerondereje432@gmail.com for personalized support.";
  };

  return (
    <div className="chatbot">
      {/* Bubble Button */}
      <motion.button
        className="chatbot__bubble"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={open ? {} : { y: [0, -6, 0] }}
        transition={open ? {} : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>✕</motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>💬</motion.span>
          )}
        </AnimatePresence>
        {!open && <span className="chatbot__ping" aria-hidden="true" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot__window"
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="chatbot__header">
              <div className="chatbot__avatar">🤖</div>
              <div>
                <div className="chatbot__name">SmartBot</div>
                <div className="chatbot__status">
                  <span className="chatbot__dot" />
                  Online · Powered by AI
                </div>
              </div>
              <button className="chatbot__close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>

            {/* Messages */}
            <div className="chatbot__messages">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`chatbot__msg chatbot__msg--${m.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {m.text}
                </motion.div>
              ))}
              {typing && (
                <div className="chatbot__msg chatbot__msg--bot">
                  <div className="chatbot__typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="chatbot__quick">
                {QUICK_REPLIES.map(r => (
                  <button key={r} className="chatbot__chip" onClick={() => sendMessage(r)}>{r}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="chatbot__input-row">
              <input
                className="chatbot__input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Type a message..."
                aria-label="Chat message"
              />
              <button
                className="chatbot__send"
                onClick={() => sendMessage(input)}
                aria-label="Send message"
                disabled={!input.trim()}
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
