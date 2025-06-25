import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
