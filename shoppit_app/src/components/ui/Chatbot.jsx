import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const chatbotRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    try {
      const response = await axios.post('http://localhost:2000/shopapp/api/chat/', {
        message: input,
      });

      setMessages([...newMessages, { text: response.data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Minimize when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={chatbotRef}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: isOpen ? '400px' : '60px',
        height: isOpen ? '500px' : '60px',
        backgroundColor: '#2e3a47',
        color: '#fff',
        borderRadius: '15px',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
        zIndex: 999,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: '#333',
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
      }}>
        <div style={{
          color: '#fff',
          fontSize: '18px',
          fontWeight: 'bold',
        }}>Askly</div>
        {isOpen && (
          <button
            onClick={() => {
              setIsOpen(false);
              setMessages([]); // Clear messages
            }}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* Messages */}
      {isOpen && (
        <div style={{
          flexGrow: 1,
          padding: '12px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '12px',
            }}>
              <div style={{
                backgroundColor: msg.sender === 'user' ? '#4CAF50' : '#444',
                color: '#fff',
                padding: '12px',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                maxWidth: '80%',
                fontSize: '14px',
              }}>
                <strong>{msg.sender === 'user' ? 'You' : 'Askly'}:</strong> {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input */}
      {isOpen && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px',
          borderTop: '1px solid #444',
          backgroundColor: '#222',
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            style={{
              flexGrow: 1,
              padding: '12px',
              backgroundColor: '#444',
              color: '#fff',
              border: '1px solid #555',
              borderRadius: '10px',
              marginRight: '8px',
              fontSize: '16px',
            }}
          />
          <button onClick={handleSend} style={{
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}>
            Send
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '-2px',
          right: '-1px',
          backgroundColor: '#4CAF50',
          border: 'none',
          color: '#fff',
          fontSize: '24px',
          padding: '15px',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }} onClick={() => setIsOpen(true)}>
          💬
        </div>
      )}
    </div>
  );
}

export default Chatbot;
