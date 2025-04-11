import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-black backdrop-blur-sm flex justify-between items-center p-6 fixed top-0 left-0 w-full z-40">
      {/* Logo */}
      <div href="/" className="text-3xl font-bold cursor-pointer bg-gradient-to-r from-purple-600 via-pink-300 to-purple-700 text-transparent bg-clip-text">
  InfinityChat
</div>

      {/* Navbar Menu */}
      <div className="space-x-6">
        <a
          href="/"
          className="text-white text-lg hover:underline transition"
        >
          Home
        </a>
        <a
          href="/chat"
          className="text-white text-lg hover:underline transition"
        >
          Chat
        </a>
        <a
          href="/about"
          className="text-white text-lg hover:underline transition"
        >
          About
        </a>
        <a
          href="/contact"
          className="text-white text-lg hover:underline transition"
        >
          Contact
        </a>
      </div>

      {/* Avatar or Login/Register Buttons */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="relative">
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
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}
