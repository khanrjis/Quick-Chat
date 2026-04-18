import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const UserContextAPI = createContext()

const initialChats = [
  {
    id: 'welcome-chat',
    title: 'Welcome Chat',
    messages: [
      {
        role: 'assistant',
        text: 'Hello! I am your AI assistant. Ask me anything related to code, UI, or project ideas, and I will answer like ChatGPT.',
      },
    ],
  },
]

export function UserContextProvider({ children }) {
  const [chats, setChats] = useState(initialChats)
  const [activeChatId, setActiveChatId] = useState(initialChats[0].id)
  const [isTyping, setIsTyping] = useState(false)

  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === activeChatId) ?? chats[0],
    [activeChatId, chats],
  )

  const addChat = useCallback(() => {
    const newChat = {
      id: `chat-${Date.now()}`,
      title: 'New Chat',
      messages: [
        {
          role: 'assistant',
          text: 'This chat is ready. Ask your question and I will answer with a ChatGPT-style response.',
        },
      ],
    }

    setChats((current) => [newChat, ...current])
    setActiveChatId(newChat.id)
  }, [])

  const sendMessage = useCallback(
    async (chatId, text) => {
      const trimmed = text.trim()
      if (!trimmed) return

      const userMessage = { role: 'user', text: trimmed }
      const titleSnippet = trimmed.length > 22 ? `${trimmed.slice(0, 22)}...` : trimmed

      setChats((current) =>
        current.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                title:
                  chat.title === 'New Chat' || chat.title === 'Welcome Chat'
                    ? titleSnippet
                    : chat.title,
                messages: [...chat.messages, userMessage],
              }
            : chat,
        ),
      )

      setIsTyping(true)

      const currentChat = chats.find((chat) => chat.id === chatId) ?? activeChat
      const messagesToSend = [
        {
          role: 'system',
          content: 'You are a helpful assistant that answers user questions clearly and politely, similar to ChatGPT.',
        },
        ...currentChat.messages.map((message) => ({
          role: message.role,
          content: message.text,
        })),
        { role: 'user', content: trimmed },
      ]

      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5174'
        const response = await fetch(`${apiUrl}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: messagesToSend }),
        })

        const data = await response.json()
        const assistantText = data.assistant ?? 'Sorry, I could not generate a response at the moment.'

        setChats((current) =>
          current.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [...chat.messages, { role: 'assistant', text: assistantText }],
                }
              : chat,
          ),
        )
      } catch (error) {
        const fallbackAnswer =
          'I am unable to reach the chat service right now. Please start the backend server or check your network connection.'

        setChats((current) =>
          current.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [...chat.messages, { role: 'assistant', text: fallbackAnswer }],
                }
              : chat,
          ),
        )
      } finally {
        setIsTyping(false)
      }
    },
    [activeChat, chats],
  )

  return (
    <UserContextAPI.Provider
      value={{
        chats,
        activeChat,
        activeChatId,
        addChat,
        setActiveChatId,
        sendMessage,
        isTyping,
      }}
    >
      {children}
    </UserContextAPI.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContextAPI)
  if (!context) {
    throw new Error('useUserContext must be used within UserContextProvider')
  }
  return context
}

export default UserContextAPI