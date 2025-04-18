import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const contacts = [
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/upanshu-choudhary-69611b289/',
    icon: <FaLinkedin className="text-blue-500 text-3xl" />,
  },
  {
    name: 'GitHub',
    link: 'https://github.com/Upanshu2003',
    icon: <FaGithub className="text-white text-3xl" />,
  },
  {
    name: 'Freelancer',
    link: 'https://www.freelancer.in/u/Upanshuuu',
    icon: <img 
      src="https://www.vectorlogo.zone/logos/freelancer/freelancer-ar21.svg" 
      alt="Freelancer"
      className="h-8 w-auto"
    />,
  },
];

const ContactSection = () => {
  return (
    <div id="contact" className="py-20 px-4 md:px-8 max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-purple-300 mb-4">Connect With Me</h2>
      <p className="text-purple-100 mb-12">
        Let’s collaborate, chat, or build something cool together!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-4 p-6 rounded-xl bg-white/5 backdrop-blur-md border border-purple-800 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-purple-500/30"
          >
            {contact.icon}
            <span className="text-purple-100 font-medium">{contact.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactSection;
