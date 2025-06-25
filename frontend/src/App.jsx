import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AskQuestion from './pages/AskQuestion'
import AiChatbot from './pages/AIChatbot';
function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<SignUp />} />
            <Route path="/newQuestion" element={<AskQuestion />} />
            <Route path="/ask-ai" element={<AiChatbot/>}></Route>
      </Routes>
    </>
  );
}

export default App;
