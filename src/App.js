import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './backend/hooks/AuthContext';
import { ProtectedRoute } from './backend/hooks/ProtectedRoute';
import ChatSection from '../src/components/chatSection/chatSection';
import LoginSection from '../src/components/loginSection/login';
import RegisterSection from '../src/components/registerSection/registerSection';
import Navbar from './components/navbar/navbar';
import Home from './pages/home';
import Footer from './components/footer/footer';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSection />} />
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <ChatSection />
              </ProtectedRoute>
            } 
          />
          <Route path="/register" element={<RegisterSection />} />
        </Routes>
        <Footer/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;