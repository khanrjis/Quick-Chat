# ChatApp - AI Chat Application

A modern ChatGPT-like chat application built with React, Vite, and Node.js backend powered by **Google Generative AI (Gemini)**.

## Features

✅ **Real-time Chat** - Send and receive messages instantly with Google Gemini AI  
✅ **Multiple Conversations** - Manage multiple chat threads  
✅ **Auto-updating Titles** - Chat titles update based on first message  
✅ **Message History** - See conversation previews in sidebar  
✅ **Local AI Responses** - Works without API key (fallback mode)  
✅ **Google Gemini Integration** - Powered by Google's advanced AI model  
✅ **Modern UI** - Clean, responsive design with smooth animations  

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the App

```bash
npm run dev
```

This starts both the backend server (http://localhost:5174) and frontend (http://localhost:5173) automatically.

## Configuration

### Your API Key is Already Set Up! ✅

The app comes with a Google Generative AI API key already configured in `.env`:

```env
GOOGLE_GENERATIVE_AI_KEY=AIzaSyBwXEv-E1IeXUHKhbhchEBhpMe1mt4M_Jg
```

Just run `npm run dev` and start chatting!

### If You Need a New API Key

1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Get API key"**
4. Update `.env` with your new key:
   ```env
   GOOGLE_GENERATIVE_AI_KEY=your_new_key_here
   ```
5. Restart: `npm run dev`

## Project Structure

```
ChatApp/
├── src/
│   ├── components/          # React components
│   │   ├── chatSection/    # Main chat display
│   │   ├── sideBar/        # Chat history sidebar
│   │   └── seperation/     # Visual divider
│   ├── context/             # React context for state
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── server.js               # Node.js backend API (Google Gemini)
├── dev-start.js            # Dev startup script
├── package.json            # Dependencies
└── vite.config.js          # Vite config
```

## Available Scripts

- `npm run dev` - Start development server (backend + frontend)
- `npm run server` - Start only the backend
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## How It Works

1. **Frontend** - React app running on http://localhost:5173
2. **Backend** - Node.js API server on http://localhost:5174
3. **Communication** - Frontend sends messages to `/api/chat` endpoint
4. **AI Responses** - Uses Google Generative AI if key is set, otherwise local responses

## Troubleshooting

### "Unable to reach the chat service"

This means the backend isn't running. Make sure:
- Run `npm run dev` (not just `npm run start`)
- Both the backend and frontend windows should show active logs
- Check that port 5174 is available

### Need more help?

The app includes helpful error messages. Check the browser console and terminal output for details.

## Tech Stack

- **Frontend**: React 19, Vite, React Icons
- **Backend**: Node.js HTTP Server
- **Styling**: CSS3 with modern gradients
- **AI**: Google Generative AI / Gemini, Local responses (built-in)

## License

MIT
