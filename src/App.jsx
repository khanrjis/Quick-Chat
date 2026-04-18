import './App.css'
import SideBar from './components/sideBar/SideBar'
import ChatSection from './components/chatSection/ChatSection'
import Seperation from './components/seperation/Seperation'
import { UserContextProvider } from './context/UserContext'


function App() {
  return (
    <UserContextProvider>
      <div className="app">
        <SideBar/>
        <Seperation/>
        <ChatSection />
      </div>
    </UserContextProvider>
  )
}

export default App
