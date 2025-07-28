import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
// import Footer from './components/Footer';
import Home from './screens/Home';
import About from './screens/About';
import Blog from './screens/Blog';
import Contact from './screens/Contact';
import Projects from './screens/Projects';
import Login from './screens/Login';
import BlogDetails from './screens/BlogDetails';
import Bugs from './screens/Bugs';
import BugsDetails from './screens/BugsDetails';
import DeepNetGaurd from './projects/DeepNetGaurd';
import EmojiChipher from './projects/EmojiChipher';
import EncryptoWeb from './projects/EncryptoWeb';
import SafeHospatialNetworking from './projects/SafeHospatialNetworking';
import WebScanner from './projects/WebScanner';
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <Header />
      <main className="pt-20"> {/* Adjust padding to avoid overlap */}
         <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path="/blogs" element={<Blog />} />  {/* All Blogs */}
          <Route path="/blog/:id" element={<BlogDetails />} />  {/* Single Blog */}
          <Route path="/bug/:id" element={<BugsDetails />} />
          <Route path="/bugs" element={<Bugs />}/>
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/deepnetgaurd' element={<DeepNetGaurd />} />
          <Route path='/emojicipher' element={<EmojiChipher />} />
          <Route path='/encryptoweb' element={<EncryptoWeb />} />
          <Route path='/safehospitalnetworks' element={<SafeHospatialNetworking />} />
          <Route path='/webscanner' element={<WebScanner />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;