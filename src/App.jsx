
import './App.css'
import Login from './Login'
import { Toaster } from "react-hot-toast";
import Signup from './Signup'
import Home from './Home'

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {


  return (
    <Router>

     <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/Signup" element={<Signup/>} />
    <Route path="/Home" element={<Home/>} />

    </Routes>
    <Toaster position="bottom-center"/>
    </Router>
  )
}

export default App
