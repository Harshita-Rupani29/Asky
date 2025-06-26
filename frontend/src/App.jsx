import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AskQuestion from './pages/AskQuestion'
import AiChatbot from './pages/AIChatbot';
import LandingPage from './components/LandingPage'
import AboutPage from './pages/About';
function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<SignUp />} />
            <Route path="/newQuestion" element={<AskQuestion />} />
            <Route path="/askAi" element={<AiChatbot/>}></Route>
            <Route path="/about" element={<AboutPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
