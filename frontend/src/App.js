import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://mern-message-board-nzbs.onrender.com/api/messages';


function App() {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ name: '', message: '' });

  // Function to fetch all messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await axios.get(API_URL);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert("Please fill in both name and message!");
      return;
    }
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: '', message: '' }); // Clear the form
      fetchMessages(); // Refresh the message list
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Message Board</h1>
      </header>
      <main>
        <div className="message-form-container">
          <h2>Post a New Message</h2>
          <form onSubmit={handleSubmit} className="message-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            <button type="submit">Post Message</button>
          </form>
        </div>
        <div className="message-list-container">
          <h2>Messages</h2>
          <div className="message-list">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div key={msg._id} className="message-card">
                  <p className="message-text">"{msg.message}"</p>
                  <p className="message-author">- {msg.name}</p>
                  <span className="message-time">
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p>No messages yet. Be the first to post!</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
