const express = require('express');
const router = express.Router();
const Message = require('../models/message');


router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 }); // Get newest first
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/', async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  try {
    const newMessage = new Message({ name, message });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;