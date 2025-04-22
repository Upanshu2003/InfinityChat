import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    navigate(`/chat?message=${encodeURIComponent(inputValue)}`);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-2">
          <h1 className="text-4xl md:text-5xl font-bold whitespace-nowrap text-white">An AI that can</h1>
          <span className="text-4xl text-purple-500 md:text-5xl font-bold min-w-[280px] md:min-w-[400px]">
            <ReactTyped
              strings={["Help","Explain", "Solve", "Assist", "Generate"]}
              typeSpeed={100}
              backSpeed={60}
              loop
            />
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-[90%] max-w-2xl mx-auto">
        <div className="flex gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything..."
            aria-label="Ask a question"
            disabled={isLoading}
            className={`w-full px-6 py-3 rounded-full 
              border border-purple-700 
              text-white placeholder-purple-200 
              bg-white/5 backdrop-blur-md 
              focus:outline-none focus:ring-4 focus:ring-purple-600 
              transition-all duration-300
              ${isLoading ? 'opacity-40 cursor-not-allowed' : 'opacity-90'}
            `}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="rounded-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-900 h active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 ease-in-out text-white font-medium whitespace-nowrap flex items-center gap-2 shadow-lg shadow-purple-500 hover:shadow-purple-500 transform hover:-translate-y-0.5"
          >
            {isLoading ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2  border-t-white rounded-full"></span>
                Processing...
              </>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </form>
      <p className="text-purple-100 mt-4 text-sm md:text-base opacity-75">
        Your AI companion for endless possibilities
      </p>
    </div>
  );
};

export default HeroSection;