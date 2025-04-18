import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/infinitychat_logo_basic.svg"; 

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && location.pathname === '/') {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const scrollToSection = (sectionId, isMobile = false) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
    if (isMobile) setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative flex justify-between items-center p-6">
        {/* Logo Placeholder */}
        <div className="flex-shrink-0 w-32">
          <img
            src={Logo}
            alt="InfinityChat Logo"
            className="h-8 w-auto cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>

        {/* Desktop Menu - Hidden on small screens */}
        <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => scrollToSection('features')}
            className="text-white text-lg hover:text-purple-400 transition-colors duration-200"
          >
            Features
          </button>
          <a
            href="/chat"
            className="text-white text-lg hover:text-purple-400 transition-colors duration-200"
          >
            Chat
          </a>
          <button
            onClick={() => scrollToSection('about')}
            className="text-white text-lg hover:text-purple-400 transition-colors duration-200"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-white text-lg hover:text-purple-400 transition-colors duration-200"
          >
            Contact
          </button>
        </div>

        {/* Authentication Section */}
        <div className="flex items-center">
          {/* Desktop Auth Buttons - Hidden on small screens */}
          {!isLoggedIn ? (
            <div className="hidden md:flex space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="text-white border border-purple-500 py-2 px-4 rounded-lg hover:bg-purple-500 hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="text-white bg-purple-500 py-2 px-4 rounded-lg hover:bg-purple-600 transition"
              >
                Register
              </button>
            </div>
          ) : (
            <div className="hidden md:block relative">
              {/* Avatar Button */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                <svg
                  className="w-10 h-10 text-purple-500 hover:text-purple-600 transition"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={handleSignOut}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 lg:ml-4"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-purple-500 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-8 h-8" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-20 bg-black bg-opacity-95 z-30 flex flex-col items-center pt-10">
            <div className="flex flex-col items-center space-y-6 w-full">
              <button
                onClick={() => scrollToSection('features', true)}
                className="text-white text-xl hover:text-purple-500 transition"
              >
                Features
              </button>
              <a
                href="/chat"
                onClick={(e) => {e.preventDefault(); handleNavigation("/chat")}}
                className="text-white text-xl hover:text-purple-500 transition"
              >
                Chat
              </a>
              <button
                onClick={() => scrollToSection('about', true)}
                className="text-white text-xl hover:text-purple-500 transition"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact', true)}
                className="text-white text-xl hover:text-purple-500 transition"
              >
                Contact
              </button>
              
              {/* Mobile Auth Buttons - Only shown for non-logged-in users */}
              {!isLoggedIn ? (
                <div className="flex flex-col space-y-4 mt-6 w-64">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/login");
                    }}
                    className="text-white border border-purple-500 py-3 px-4 rounded-lg hover:bg-purple-500 hover:text-white transition w-full"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/register");
                    }}
                    className="text-white bg-purple-500 py-3 px-4 rounded-lg hover:bg-purple-600 transition w-full"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSignOut}
                  className="text-white bg-purple-500 py-3 px-4 rounded-lg hover:bg-purple-600 transition mt-6 w-64"
                >
                  Sign out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}