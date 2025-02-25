import React, { useState } from 'react';
import Logo from "../assets/cybercrewlogo.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-100 text-white p-3 shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <img src={Logo} alt="Logo" className="h-14 md:h-16" />
        <nav className="hidden md:flex flex-grow justify-center">
          <div className="flex space-x-6 md:space-x-10 text-lg md:text-xl">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/about" className="hover:text-gray-300">About</a>
            <a href="/blog" className="hover:text-gray-300">Blog</a>
            <a href="/projects" className="hover:text-gray-300">Projects</a>
            <a href="/contact" className="hover:text-gray-300">Contact</a>
          </div>
        </nav>
        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded hidden md:block">
          Login
        </button>
        <div className="md:hidden flex items-center">
          <button 
            className="text-white text-2xl" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div className={`md:hidden bg-black bg-opacity-90 p-4 absolute top-16 left-0 w-full flex flex-col items-center space-y-4 transition-transform duration-300 ease-in-out ${
        isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}>
        <a href="/" className="hover:text-gray-300">Home</a>
        <a href="/about" className="hover:text-gray-300">About</a>
        <a href="/blog" className="hover:text-gray-300">Blog</a>
        <a href="/projects" className="hover:text-gray-300">Projects</a>
        <a href="/contact" className="hover:text-gray-300">Contact</a>
        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Login</button>
      </div>
    </header>
  );
}

export default Header;
