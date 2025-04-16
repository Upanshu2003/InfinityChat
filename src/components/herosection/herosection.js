import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import Planet from "../../assets/genrated_image.webp";

const HeroSection = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue);
    setInputValue("");
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${Planet})`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0"></div>

      <div className="relative z-10 text-center mb-8">
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

      <form onSubmit={handleSubmit} className="relative z-10 w-[90%] max-w-2xl mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything..."
            className="w-full min-w-0 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-pink-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-pink-500 rounded-lg hover:bg-pink-600 transition-colors duration-300 text-white font-medium whitespace-nowrap"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroSection;
