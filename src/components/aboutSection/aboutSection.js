import React, { useEffect, useRef } from 'react';

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add('opacity-100', 'translate-y-0');
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      id="about"
      ref={sectionRef}
      className="px-4 md:px-8 py-20 max-w-5xl mx-auto opacity-0 translate-y-10 transition-all duration-1000 ease-out"
    >
      <h2 className="text-center text-4xl mb-4 font-bold text-purple-300 relative">
        About This Project
      </h2>

      <div className="mt-10 text-base md:text-lg text-purple-100 leading-relaxed bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-purple-800 shadow-lg shadow-purple-900/30">
        <p className="mb-6 text-center md:text-left">
          Welcome to <span className="text-purple-400 font-semibold">InfinityChat</span>! This is a chat application that I built to provide a seamless communication experience for users. I've developed this platform using modern technologies to ensure smooth performance and an intuitive interface.
        </p>
        <p className="text-center md:text-left">
          The goal of this project is to create a space where people can connect and communicate
          effectively. Whether you're here for casual conversations or professional networking, this
          platform has got you covered.
        </p>
      </div>
    </div>
  );
};