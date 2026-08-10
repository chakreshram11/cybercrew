import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import About from './screens/About';
import Blog from './screens/Blog';
import Contact from './screens/Contact';
import Projects from './screens/Projects';
import ProjectDetails from './screens/ProjectDetails';
import Login from './screens/Login';
import Admin from './screens/Admin';
import Tools from './screens/Tools';
import BlogDetails from './screens/BlogDetails';
import Bugs from './screens/Bugs';
import BugsDetails from './screens/BugsDetails';
import DeepNetGaurd from './projects/DeepNetGaurd';
import EmojiChipher from './projects/EmojiChipher';
import EncryptoWeb from './projects/EncryptoWeb';
import SafeHospatialNetworking from './projects/SafeHospatialNetworking';
import WebScanner from './projects/WebScanner';
import ScrollToTop from './components/ScrollToTop';
import CyberMatrixBackground from './components/CyberMatrixBackground';

function App() {
  return (
    <Router>
      <CyberMatrixBackground />
      <div className="flex flex-col min-h-screen relative z-10">
        <Header />
        <main className="flex-1 pt-16">
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/bug/:id" element={<BugsDetails />} />
            <Route path="/bugs" element={<Bugs />}/>
            <Route path='/projects' element={<Projects />} />
            <Route path='/project/:id' element={<ProjectDetails />} />
            <Route path='/tools' element={<Tools />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/deepnetgaurd' element={<DeepNetGaurd />} />
            <Route path='/emojicipher' element={<EmojiChipher />} />
            <Route path='/encryptoweb' element={<EncryptoWeb />} />
            <Route path='/safehospitalnetworks' element={<SafeHospatialNetworking />} />
            <Route path='/webscanner' element={<WebScanner />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;