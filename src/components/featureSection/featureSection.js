import React, { useEffect, useRef } from 'react';

const FeatureSection = () => {
  const featureRefs = useRef([]);

  const features = [
    {
      title: "Natural Language Understanding",
      description: "Understands and responds in a human-like way."
    },
    {
      title: "Contextual Awareness",
      description: "Remembers what you said earlier for better replies."
    },
    {
      title: "Versatile Info Retrieval",
      description: "Answers, summaries, and explanations on any topic."
    },
    {
      title: "Personalized Interactions",
      description: "Learns your style for a unique experience."
    },
    {
      title: "24/7 Availability",
      description: "Always there when you need it, anytime, anywhere."
    },
    {
      title: "Multi-Language Support",
      description: "Communicate seamlessly in multiple languages."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-6");
        }
      });
    }, { threshold: 0.1 });

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div id="features" className="px-4 md:p-16 mb-6 bg-white bg-opacity-5 mx-4 md:mx-auto my-16 max-w-7xl rounded-2xl shadow-xl border border-purple-800 text-white">
      <h2 className="text-center text-4xl mb-12 font-bold text-purple-300">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => (featureRefs.current[index] = el)}
            className="opacity-0 translate-y-6 transition-all duration-500 ease-out p-6 bg-black bg-opacity-30 border border-purple-500 backdrop-blur-md rounded-xl hover:scale-110 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/20 transform-gpu"
          >
            <h3 className="text-xl mb-3 text-purple-200 font-semibold">{feature.title}</h3>
            <p className="text-purple-100">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;