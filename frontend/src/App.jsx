import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "react-scroll-to-top";
import { AuthContext } from "./utils/context-API";
import useAuth from "./utils/hooks/Auth-hook";

import Login from './pages/Login';    
import Signup from './pages/SignUp'; 
import Home from './pages/Home';
import AskQuestion from './pages/AskQuestion';
import AiChatbot from './pages/AIChatbot';
import AboutPage from './pages/About';
import "react-toastify-modernize/dist/ReactToastify.css";
import Question from "./pages/Question";
import PrivateRoute from "./utils/PrivateRoute";
import RedirectLoggedIn from "./utils/RedirectLoggedIn";


function App() {
  const { userId, token, login, logout } = useAuth();

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn: !!token, token, userId, login, logout }}>
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="dark"
          
        />
        <ScrollToTop />

          <Routes>
            <Route path="/" element={<RedirectLoggedIn><Home></Home></RedirectLoggedIn>} />

            <Route path="/login" element={<RedirectLoggedIn><Login /></RedirectLoggedIn>} />

            <Route path="/signup" element={<RedirectLoggedIn><Signup /></RedirectLoggedIn>} />

            {/* Other public pages */}
            <Route path="/home" element={<Home />} /> 
            <Route path="/askAi" element={<AiChatbot />} />
            <Route path="/about" element={<AboutPage />} />
             <Route path="/questions" element={<Question />} />
            <Route path="/ask" element={<PrivateRoute><AskQuestion /></PrivateRoute>} />
          
          </Routes>
        
      </AuthContext.Provider>
    </>
  );
}

export default App;