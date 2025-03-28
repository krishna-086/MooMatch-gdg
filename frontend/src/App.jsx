import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import EduContent from './EduContent';
import CattleDashboard from './CattleDashboard'; 


import ImageModel from './components/ImageModel';
import Chatbot from './components/Chatbot';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <Router>
      <div className="font-sans">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <About />
              <ImageModel />
              <Contact />
              <Footer />
            </>
          } />

          {/* EduContent Page */}
          <Route path="/EduContent" element={<EduContent />} />

          {/* Cattle Management Dashboard Page */}
          <Route path="/dashboard" element={<CattleDashboard />} />

          
        </Routes>
        <BackToTop />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
