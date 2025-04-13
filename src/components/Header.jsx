import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white p-6 shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="text-white text-2xl hover:text-cyan-400 font-bold" style={{ fontFamily: 'RachelaClaudie' }}>
            Cyber Crew
          </Link>
        </div>


        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-6 md:space-x-10 text-lg md:text-xl">
            {["ABOUT", "BLOG","BUG", "PROJECTS", "CONTACT"].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase()}`} className="hover:text-cyan-400 font-bold font-serif">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <Link to="/login">
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">
            <span className="hover:text-cyan-400 font-bold font-serif">Login</span>
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none ml-auto"
          aria-label="Toggle Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-black bg-opacity-90 p-4 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4">
          {["About", "Blog", "Projects", "Contact"].map((item) => (
            <li key={item}>
              <Link to={`/${item.toLowerCase()}`} className="hover:text-gray-300" onClick={handleMenuClose}>
                {item}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/login" onClick={handleMenuClose}>
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleMenuClose = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full bg-black text-white p-6 shadow-md z-50">
//       <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
//         {/* Logo Section */}
//         <div className="flex items-center">
//           <Link to="/" className="text-white text-2xl hover:text-cyan-400 font-bold" style={{ fontFamily: 'RachelaClaudie' }}>
//             Cyber Crew
//           </Link>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex flex-grow justify-center">
//           <ul className="flex space-x-6 md:space-x-10 text-lg md:text-xl">
//             {["ABOUT", "BLOG", "PROJECTS", "CONTACT"].map((item) => (
//               <li key={item}>
//                 <Link
//                   to={`/${item.toLowerCase()}`}
//                   className="hover:text-cyan-400 font-bold"
//                   style={{ fontFamily: '"Copperplate Gothic Bold", serif' }}
//                 >
//                   {item}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Desktop Login Button */}
//         <div className="hidden md:block">
//           <Link to="/login">
//             <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">
//               <span className="hover:text-cyan-400 font-bold font-serif">Login</span>
//             </button>
//           </Link>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-white text-2xl focus:outline-none ml-auto"
//           aria-label="Toggle Menu"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden fixed top-16 left-0 w-full bg-black bg-opacity-90 p-4 transition-all duration-300 ease-in-out ${
//           isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
//         }`}
//       >
//         <ul className="flex flex-col items-center space-y-4">
//           {["About", "Blog", "Projects", "Contact"].map((item) => (
//             <li key={item}>
//               <Link
//                 to={`/${item.toLowerCase()}`}
//                 className="hover:text-gray-300"
//                 style={{ fontFamily: '"Copperplate Gothic Bold", serif' }}
//                 onClick={handleMenuClose}
//               >
//                 {item}
//               </Link>
//             </li>
//           ))}
//           <li>
//             <Link to="/login" onClick={handleMenuClose}>
//               <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
//                 Login
//               </button>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </header>
//   );
// }

// export default Header;
