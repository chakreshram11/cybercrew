import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-gray-400 p-6 mt-10 w-full">
      <div className="container mx-auto text-center max-w-screen-lg px-4">
        <nav className="mb-4 flex flex-wrap justify-center space-x-4 md:space-x-6">
          <a href="/privacy" className="hover:text-white text-sm md:text-base">Privacy Policy</a>
          <a href="#terms" className="hover:text-white text-sm md:text-base">Terms of Service</a>
          <a href="#support" className="hover:text-white text-sm md:text-base">Support</a>
          <a href="/contact" className="hover:text-white text-sm md:text-base">Contact</a>
        </nav>
        <p className="text-xs md:text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
