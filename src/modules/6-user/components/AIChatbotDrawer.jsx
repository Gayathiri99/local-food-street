import React, { useState, useRef, useEffect } from 'react';

export default function AIChatbotDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'How can I assist you today?\nPlease select an option below 👇',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showOptions: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const quickOptions = [
    'Order Food',
    'Track Order',
    'View Menu',
    'Offers & Discounts',
    'Contact Support',
    'Ask AI',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // --- WEBSITE AI RESPONSE ENGINE ---
  const getWebsiteBotResponse = (input) => {
    const q = input.toLowerCase().trim();

    // Greetings
    if (q.match(/\b(hi|hello|hey|greetings|good morning|good evening|namaste)\b/)) {
      return "Hello! 👋 Welcome to Local Food Street. How can I help you with your order today?";
    }

    // Order Tracking & Status
    if (q.includes('track') || q.includes('where is my food') || q.includes('status') || q.includes('delay') || q.includes('late')) {
      return "📍 You can track your active order in real-time under the 'My Orders' section in the top navigation menu.";
    }

    // Menu & Food Listing
    if (q.includes('menu') || q.includes('food') || q.includes('item') || q.includes('dish') || q.includes('special') || q.includes('listing')) {
      return "🍕 You can explore our full food menu by clicking on the 'Listing' or 'Explore Today's Special' buttons on the homepage!";
    }

    // Offers, Coupons & Discounts
    if (q.includes('offer') || q.includes('discount') || q.includes('coupon') || q.includes('promo') || q.includes('code') || q.includes('deal')) {
      return "🎉 Use promo code FOODSTREET20 at checkout to get 20% off on your order!";
    }

    // Dietary Preferences (Veg, Vegan, Gluten-free)
    if (q.includes('veg') || q.includes('vegan') || q.includes('jain') || q.includes('diet') || q.includes('allergy') || q.includes('healthy')) {
      return "🥗 We have dietary filters on our menu page! You can easily filter dishes by Vegetarian, Vegan, and Allergy preferences.";
    }

    // Payment Methods
    if (q.includes('pay') || q.includes('upi') || q.includes('card') || q.includes('cash') || q.includes('cod') || q.includes('netbanking')) {
      return "💳 We accept all major payment methods including UPI (Google Pay, PhonePe), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD).";
    }

    // Delivery Charges & Delivery Time
    if (q.includes('delivery charge') || q.includes('delivery fee') || q.includes('time') || q.includes('how long') || q.includes('speed')) {
      return "🚀 Our average delivery time is 30–40 minutes. Delivery is FREE for all orders above ₹299!";
    }

    // Cancellations & Refunds
    if (q.includes('cancel') || q.includes('refund') || q.includes('return') || q.includes('wrong item') || q.includes('damaged')) {
      return "🔄 Orders can be canceled within 2 minutes of placing them in the 'My Orders' tab. For refunds on incorrect items, please reach out to Support.";
    }

    // Customer Support & Contact
    if (q.includes('contact') || q.includes('support') || q.includes('help') || q.includes('call') || q.includes('agent') || q.includes('number')) {
      return "📞 You can contact our support team at support@localfoodstreet.com or call our toll-free hotline at 1800-123-4567.";
    }

    // Specific Food Item Query
    if (q.includes('pizza') || q.includes('burger') || q.includes('biryani') || q.includes('dessert') || q.includes('drink') || q.includes('beverage')) {
      return `😋 Looking for ${input}? Head over to the 'Listing' page to filter by your favorite food category!`;
    }

    // Default Fallback
    return `I am here to help! Here are a few things you can ask me about:\n\n• Browsing the Food Menu\n• Live Order Tracking\n• Active Coupons & Offers\n• Payment & Delivery Information\n• Customer Support`;
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Generate response using the Website Bot Engine
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: getWebsiteBotResponse(text),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showOptions: false,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: 'How can I assist you today?\nPlease select an option below 👇',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showOptions: true,
      },
    ]);
  };

  return (
    <div style={styles.container}>
      {isOpen && (
        <div style={styles.box}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerInfo}>
              <div style={styles.avatarCircle}>
                <BotIcon size={20} color="#ffffff" />
              </div>
              <div>
                <h3 style={styles.title}>AI</h3>
                <div style={styles.status}>
                  <span style={styles.statusDot}></span> Online
                </div>
              </div>
            </div>
            <div style={styles.headerActions}>
              <button 
                type="button"
                onClick={resetChat} 
                style={styles.iconBtn} 
                title="Reset Chat"
              >
                <RefreshIcon size={16} color="#ffffff" />
              </button>
              <button 
                type="button"
                onClick={() => setIsOpen(false)} 
                style={styles.iconBtn} 
                title="Close"
              >
                <CloseIcon size={18} color="#ffffff" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div style={styles.messagesArea}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {msg.timestamp && <div style={styles.timestamp}>{msg.timestamp}</div>}
                
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start'
                }}>
                  {msg.sender === 'bot' && (
                    <div style={styles.botIconSmall}>
                      <BotIcon size={14} color="#ffffff" />
                    </div>
                  )}
                  <div style={{
                    ...styles.bubble,
                    ...(msg.sender === 'user' ? styles.userBubble : styles.botBubble)
                  }}>
                    {msg.text}
                  </div>
                </div>

                {/* Quick Option Pills */}
                {msg.showOptions && (
                  <div style={styles.optionsContainer}>
                    {quickOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSend(opt)}
                        style={styles.optionPill}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f95738';
                          e.target.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#fecdd3';
                          e.target.style.color = '#2c2c2c';
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div style={styles.footer}>
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
              style={styles.inputForm}
            >
              <input
                type="text"
                placeholder="Type Here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={styles.inputField}
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim()} 
                style={{
                  ...styles.sendBtn,
                  opacity: inputValue.trim() ? 1 : 0.4
                }}
              >
                <SendIcon size={18} color="#ffffff" />
              </button>
            </form>
            <div style={styles.poweredBy}>
              Powered by <span style={{ color: '#f95738', fontWeight: 'bold' }}>AI</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Launcher Button */}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        style={styles.launcherBtn}
      >
        <BotIcon size={28} color="#ffffff" />
      </button>
    </div>
  );
}

// Inline SVGs (No external icon packages required)
const BotIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);

const RefreshIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const CloseIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SendIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// Fully Encapsulated Inline Styles Object
const styles = {
  container: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 9999,
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    boxSizing: 'border-box',
  },
  box: {
    width: '340px',
    height: '520px',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    marginBottom: '12px',
    border: '1px solid #ffe3d1',
  },
  header: {
    backgroundColor: '#f95738',
    color: '#ffffff',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatarCircle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 1.2,
  },
  status: {
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.9)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '2px',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#4cd964',
    borderRadius: '50%',
    display: 'inline-block',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  },
  messagesArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: '14px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  timestamp: {
    textAlign: 'center',
    fontSize: '11px',
    color: '#a0a0a0',
    margin: '4px 0',
  },
  botIconSmall: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#f95738',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '78%',
    padding: '10px 14px',
    borderRadius: '16px',
    fontSize: '13px',
    lineHeight: '1.4',
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
  },
  botBubble: {
    backgroundColor: '#ffffff',
    color: '#2c2c2c',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    borderBottomLeftRadius: '2px',
    border: '1px solid #f0f0f0',
  },
  userBubble: {
    backgroundColor: '#f95738',
    color: '#ffffff',
    borderBottomRightRadius: '2px',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '4px',
    paddingLeft: '32px',
  },
  optionPill: {
    width: '100%',
    backgroundColor: '#fecdd3',
    color: '#2c2c2c',
    border: 'none',
    padding: '9px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  footer: {
    padding: '12px 14px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #f0f0f0',
  },
  inputForm: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f2f4f7',
    borderRadius: '24px',
    padding: '4px 6px 4px 16px',
  },
  inputField: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    padding: '8px 0',
    fontSize: '13px',
    outline: 'none',
    color: '#2c2c2c',
  },
  sendBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#f95738',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  poweredBy: {
    textAlign: 'center',
    fontSize: '10px',
    color: '#a0a0a0',
    marginTop: '6px',
  },
  launcherBtn: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#f95738',
    border: 'none',
    boxShadow: '0 6px 16px rgba(249, 87, 56, 0.4)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease',
    outline: 'none',
  },
};