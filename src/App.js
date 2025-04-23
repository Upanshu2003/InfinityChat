import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthContext';
import { ProtectedRoute } from './hooks/ProtectedRoute';
import { PublicRoute } from './hooks/PublicRoute';
import Chat from '../src/pages/chat';
import LoginSection from '../src/components/loginSection/login';
import RegisterSection from '../src/components/registerSection/registerSection';
import Navbar from './components/navbar/navbar';
import Home from './pages/home';
import Footer from './components/footer/footer';
import NotFound from './components/404/404';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><LoginSection /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterSection /></PublicRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;