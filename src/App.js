import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import About from './screens/About';
import Blog from './screens/Blog';
import Contact from './screens/Contact';
import Projects from './screens/Projects';
import Login from './screens/Login';

function App() {
  return (
    <Router>
      <Header />
      <main className="pt-20"> {/* Adjust padding to avoid overlap */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;