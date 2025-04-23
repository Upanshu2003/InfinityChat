import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user || !user.isLoggedIn) {
    localStorage.setItem('redirectUrl', window.location.pathname);
    return <Navigate to="/login" replace />;
  }

  return children;
}
