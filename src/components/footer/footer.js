import React from 'react';
import logo from '../../assets/infinitychat_logo_basic.svg';

const Footer = () => {
  return (
    <footer className="text-purple-200 text-sm py-8 px-4 border-t border-purple-700 bg-black bg-opacity-100 backdrop-blur-lg relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-4">
          <img src={logo} alt="InfinityChat Logo" className="h-8 w-auto" />
          <p className="opacity-70">
            © {new Date().getFullYear()} InfinityChat. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/upanshu-choudhary-69611b289/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/Upanshu2003"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a
            href="https://www.freelancer.in/u/Upanshuuu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m14.096 3.076 1.634 2.292L24 3.076M5.503 20.924l4.474-4.374-2.692-2.89m6.133-10.584L11.027 5.23l4.022.15M4.124 3.077l.857 1.76 4.734.294m-3.058 7.072 3.497-6.522L0 5.13m7.064 7.485 3.303 3.548 3.643-3.57 1.13-6.652-4.439-.228z"></path>
            </svg>
            Freelancer
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;