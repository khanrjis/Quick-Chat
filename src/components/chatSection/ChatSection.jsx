import React, { useEffect, useRef, useState } from 'react'
import { LuSendHorizontal } from 'react-icons/lu'
import { useUserContext } from '../../context/UserContext'
import './ChatSection.css'

function ChatSection() {
  const { activeChat, sendMessage, isTyping } = useUserContext()
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeChat.messages, isTyping])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!inputValue.trim()) return
    sendMessage(activeChat.id, inputValue)
    setInputValue('')
  }

  return (
    <div className="chat-section">
      <div className="topSection">
        <div className="heading">
          <span>{activeChat.title}</span>
          <span>Your friendly AI companion</span>
          <span>Ask anything and get instant support.</span>
        </div>
        <div className="messages">
          {activeChat.messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`message ${message.role === 'assistant' ? 'assistant' : 'user'}`}
            >
              <div className="messageRole">{message.role}</div>
              <div className="messageText">{message.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="message assistant typing">
              <div className="messageRole">assistant</div>
              <div className="messageText">Typing...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bottomSection">
        <form className="inputBox" onSubmit={handleSubmit}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Type your message..."
          />
          <button type="submit">
            <LuSendHorizontal />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatSection;
