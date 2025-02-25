import React from 'react';

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-100 text-white p-6 shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <h1 className="text-xl md:text-2xl font-bold">Logo</h1>
        <nav className="flex-grow flex justify-center">
          <div className="flex space-x-10 text-lg md:text-xl">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/about" className="hover:text-gray-300">About</a>
            <a href="/blog" className="hover:text-gray-300">Blog</a>
            <a href="/projects" className="hover:text-gray-300">Projects</a>
            <a href="/contact" className="hover:text-gray-300">Contact</a>
          </div>
        </nav>
        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Login</button>
      </div>
    </header>
  );
}

export default Header;
