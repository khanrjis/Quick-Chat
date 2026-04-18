import React, { useState } from 'react'
import { MdMessage } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useUserContext } from '../../context/UserContext'
import './SideBar.css'

function SideBar() {
  const [extend, setExtend] = useState(true)
  const { chats, activeChatId, addChat, setActiveChatId } = useUserContext()

  return (
    <div className={extend ? 'sidebar extended' : 'sidebar'}>
      <div className="top-section">
        <button
          className="hamburger-icon"
          onClick={() => setExtend((prev) => !prev)}
          aria-label="Toggle sidebar"
        >
          <GiHamburgerMenu size={28} />
        </button>
      </div>

      <button className="newchat" onClick={addChat}>
        <FaPlus />
        {extend && <span>New Chat</span>}
      </button>

      <div className="recent-section">
        {extend && <p className="recent-title">Conversations</p>}
        {chats.map((chat) => {
          const latestText = chat.messages[chat.messages.length - 1]?.text || ''
          const preview = latestText.length > 28 ? `${latestText.slice(0, 28)}...` : latestText
          return (
            <button
              key={chat.id}
              className={`recent-item ${chat.id === activeChatId ? 'active' : ''}`}
              onClick={() => setActiveChatId(chat.id)}
            >
              <MdMessage />
              {extend && (
                <div className="chat-meta">
                  <span>{chat.title}</span>
                  <span className="recent-item-description">{preview}</span>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SideBar;
