import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function PublicRoute({ children }) {
  const { user } = useAuth();
  
  if (user && user.isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
