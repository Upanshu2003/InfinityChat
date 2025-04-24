import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/infinitychat_logo_basic.svg";

const MENU_ITEMS = [
  { id: 'chat', label: 'Chat', path: '/chat' },
  { id: 'features', label: 'Features' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
];

const MenuLink = ({ item, onClick, isMobile }) => {
  const location = useLocation();
  return item.path ? (
    location.pathname !== item.path && (
      <a href={item.path} 
         className={`text-white ${isMobile ? 'text-xl' : 'text-lg'} hover:text-purple-400 transition-colors duration-200`}
         onClick={(e) => {e.preventDefault(); onClick(item.path);}}>
        {item.label}
      </a>
    )
  ) : (
    <button onClick={() => onClick(item.id, isMobile)}
            className={`text-white ${isMobile ? 'text-xl' : 'text-lg'} hover:text-purple-400 transition-colors duration-200`}>
      {item.label}
    </button>
  );
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(user?.isLoggedIn || false);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate('/');
  };

  const scrollToSection = (sectionId, isMobile = false) => {
    const offset = 80;
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
    if (isMobile) setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex justify-between items-center p-6">
        <div className="flex-shrink-0 w-32">
          <img src={Logo} alt="InfinityChat Logo" className="h-8 w-auto cursor-pointer" 
               onClick={() => navigate('/')} />
        </div>


        <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
          {MENU_ITEMS.map(item => (
            <MenuLink key={item.id} item={item} onClick={item.path ? handleNavigation : scrollToSection} />
          ))}
        </div>

        <div className="flex items-center">
          {!isLoggedIn ? (
            <div className="hidden md:flex space-x-4">
              <button onClick={() => navigate("/login")}
                      className="text-white border border-purple-500 py-2 px-4 rounded-lg hover:bg-purple-500 transition">
                Login
              </button>
              <button onClick={() => navigate("/register")}
                      className="text-white bg-purple-800 px-5 py-2 rounded-full shadow-md hover:bg-purple-600 transition-all hover:scale-105">
                Get Started
              </button>
            </div>
          ) : (
            <div className="hidden md:block relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center focus:outline-none">
                <svg className="w-10 h-10 text-purple-500 hover:text-purple-600 transition" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <button onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden text-purple-500 focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-20 bg-black bg-opacity-95 z-30 flex flex-col items-center pt-10">
            <div className="flex flex-col items-center space-y-6 w-full">
              {MENU_ITEMS.map(item => (
                <MenuLink key={item.id} item={item} onClick={item.path ? handleNavigation : scrollToSection} isMobile />
              ))}
              
              {!isLoggedIn ? (
                <div className="flex flex-col space-y-4 mt-6 w-64">
                  <button onClick={() => handleNavigation("/login")}
                          className="text-white border border-purple-500 py-3 px-4 rounded-lg hover:bg-purple-500 transition w-full">
                    Login
                  </button>
                  <button onClick={() => handleNavigation("/register")}
                          className="text-white bg-purple-800 py-3 px-4 rounded-lg hover:bg-purple-600 transition w-full">
                    Get Started
                  </button>
                </div>
              ) : (
                <button onClick={handleSignOut}
                        className="text-white bg-purple-800 py-3 px-4 rounded-lg hover:bg-purple-600 transition mt-6 w-64">
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