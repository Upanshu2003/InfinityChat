import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user || !user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
