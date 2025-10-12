import React from 'react';
import TeamChat from '../components/TeamChat';
import '../styles/Chat.css';

function Chat() {
  return (
    <div className="chat-page-container">
      <h1>💬 Team Chat</h1>
      <p className="chat-description">
        Collaborate with your team in real-time! Send messages, share updates, and stay connected.
      </p>
      <TeamChat />
    </div>
  );
}

export default Chat;




