import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatSection from '../src/components/chatSection/chatSection';
import LoginSection from '../src/components/loginSection/login';
import RegisterSection from '../src/components/registerSection/registerSection';
import Navbar from './components/navbar/navbar';
import './backend/firebase.config';

function App() {
  return (
    <Router>
     <Navbar />
      <Routes>
        <Route path="/chat" element={<ChatSection />} />
        <Route path="/login" element={<LoginSection />} />
        <Route path="/register" element={<RegisterSection />} />
      </Routes>
    </Router>
  );
}

export default App;