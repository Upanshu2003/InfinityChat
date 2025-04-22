import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function PublicRoute({ children }) {
  const { user } = useAuth();
  
  if (user && user.isLoggedIn && window.location.pathname === '/login') {
    const redirectUrl = localStorage.getItem('redirectUrl') || '/';
    localStorage.removeItem('redirectUrl');
    return <Navigate to={redirectUrl} replace />;
  }

  return children;
}
