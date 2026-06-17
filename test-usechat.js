const { useChat } = require('@ai-sdk/react');
const React = require('react');

// Simulate React hook environment
let mockChat;
try {
  mockChat = useChat({ api: '/api/chat' });
} catch (e) {
  console.log(e);
}
