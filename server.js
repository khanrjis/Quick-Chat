import http from 'node:http'
import process from 'node:process'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

dotenv.config()

const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_KEY
const PORT = process.env.PORT || 5174

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const server = http.createServer(async (req, res) => {

  // ✅ CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers)
    res.end()
    return
  }

  // ✅ Only POST /api/chat allowed
  if (req.method !== 'POST' || req.url !== '/api/chat') {
    res.writeHead(404, headers)
    res.end(JSON.stringify({ error: 'Not found' }))
    return
  }

  // ✅ Read body
  let body = ''
  for await (const chunk of req) {
    body += chunk
  }

  let data
  try {
    data = JSON.parse(body)
  } catch {
    res.writeHead(400, headers)
    res.end(JSON.stringify({ error: 'Invalid JSON' }))
    return
  }

  const messages = data.messages || []

  try {
    // ✅ Gemini setup using the newer SDK and a supported model
    const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY })

    // ✅ Only send the final user message to the model
    const lastMessage = messages[messages.length - 1]?.content || ""

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: lastMessage,
    })

    const text = result.text ?? ""

    // ✅ Send response
    res.writeHead(200, headers)
    res.end(JSON.stringify({ assistant: text }))

  } catch (error) {
    console.error("FULL ERROR:", error.message)

    res.writeHead(500, headers)
    res.end(JSON.stringify({
      assistant: "❌ Error aa gaya bhai 😅 API ya server check kar"
    }))
  }
})

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})