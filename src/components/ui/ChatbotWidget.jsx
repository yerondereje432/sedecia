import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatbotWidget.css';

const WELCOME = "Hi. I can help you find the right way to work with SEDECIA.";
const QUICK_REPLIES = ['What does SEDECIA build?', 'I want to start a project', 'Show me your work'];

function getBotResponse(message) {
  const lower = message.toLowerCase();
  if (lower.includes('service') || lower.includes('build')) return 'SEDECIA focuses on web development, web design, custom software, and UI/UX design for schools, universities, hotels, tour guides, and gyms.';
  if (lower.includes('project') || lower.includes('consult')) return 'Tell us what you want to build or improve. You can start a project conversation from the Contact page.';
  if (lower.includes('work') || lower.includes('portfolio')) return 'You can explore our selected work, including the HUSSS website, GROOT learning product, and Sunday School Portal on the Portfolio page.';
  return 'That is worth discussing. Share a little more context, or contact SEDECIA directly and we will help you find the right next step.';
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', text: WELCOME }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);
  const sendMessage = (text) => {
    if (!text.trim() || typing) return;
    setMessages((prev) => [...prev, { role: 'user', text }]); setInput(''); setTyping(true);
    window.setTimeout(() => { setMessages((prev) => [...prev, { role: 'bot', text: getBotResponse(text) }]); setTyping(false); }, 850);
  };
  return <div className="chatbot"><motion.button className="chatbot__bubble" onClick={() => setOpen(!open)} aria-label={open ? 'Close chat' : 'Open SEDECIA assistant'} whileHover={{ scale: 1.08 }} whileTap={{ scale: .95 }}>{open ? <span>×</span> : <span className="chatbot__bubble-mark">SD</span>}{!open && <span className="chatbot__ping" />}</motion.button><AnimatePresence>{open && <motion.div className="chatbot__window" initial={{ opacity: 0, scale: .86, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .86, y: 18 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}><div className="chatbot__header"><div className="chatbot__avatar">SD</div><div><div className="chatbot__name">SEDECIA assistant</div><div className="chatbot__status"><span className="chatbot__dot" /> Here to help you find a next step</div></div><button className="chatbot__close" onClick={() => setOpen(false)} aria-label="Close">×</button></div><div className="chatbot__messages">{messages.map((message, index) => <motion.div key={index} className={`chatbot__msg chatbot__msg--${message.role}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{message.text}</motion.div>)}{typing && <div className="chatbot__msg chatbot__msg--bot"><div className="chatbot__typing"><span /><span /><span /></div></div>}<div ref={endRef} /></div>{messages.length === 1 && <div className="chatbot__quick">{QUICK_REPLIES.map((reply) => <button key={reply} className="chatbot__chip" onClick={() => sendMessage(reply)}>{reply}</button>)}</div>}<div className="chatbot__input-row"><input className="chatbot__input" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && sendMessage(input)} placeholder="Ask about a project..." aria-label="Chat message" /><button className="chatbot__send" onClick={() => sendMessage(input)} disabled={!input.trim() || typing} aria-label="Send message">↗</button></div></motion.div>}</AnimatePresence></div>;
}
