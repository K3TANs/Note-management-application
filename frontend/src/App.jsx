import { Routes,Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home"
import Folder from "./pages/Folder"
import { RefreshContextProvider } from "../Context/RefreshContext"
import './App.css'
import { useAuthContext } from "./context/AuthContext"

import Signup from "./pages/Signup"
import Login from "./pages/Login"


const App = () => {

  const {authUser} = useAuthContext();

  return (
    <div className="relative h-screen overflow-hidden bg-pink-100">
      <RefreshContextProvider>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={`/login`} />} />
        <Route path="Folder/:id" element={authUser ? <Folder /> : <Navigate to={`/login`} /> } />
        <Route path='/login' element={authUser ? <Navigate to={`/`} /> : <Login /> } />
        <Route path='/signup' element={ authUser ? <Navigate to={`/`} /> : <Signup /> } />
      </Routes>
      <Toaster />
      </RefreshContextProvider>
    </div>
  )
}

export default App