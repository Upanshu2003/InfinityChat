import React from 'react';

const Footer = () => {
  return (
    <footer className="text-purple-200 text-sm py-6 px-4 border-t border-purple-700 bg-black opacity-80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
        <p className="opacity-70">
          © {new Date().getFullYear()} InfinityChat. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/upanshu-choudhary-69611b289/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Upanshu2003"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            GitHub
          </a>
          <a
            href="https://www.freelancer.in/u/Upanshuuu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            Freelancer
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;