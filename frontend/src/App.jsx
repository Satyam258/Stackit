import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import AskQuestion from "./pages/AskQuestion"
import QuestionDetails from "./pages/QuestionDetails"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"



function App() {

  return (
    <>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/ask" element={<AskQuestion/>}/>
      <Route path="/login" element ={<Login/>}/>
      <Route path="/question/:id" element ={<QuestionDetails/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </>
    
  )
}

export default App
