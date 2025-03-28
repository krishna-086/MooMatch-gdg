import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import BottomNavbar from './components/BottomNavbar';
import EduContent from './EduContent';
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
          {/* Home Page with Navbar */}
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Services />
              <ImageModel />
              <Testimonials />
              <Contact />
              <Footer />
            </>
          } />

          {/* EduContent Page */}
          <Route path="/EduContent" element={<EduContent />} />
        </Routes>
        
        
        <BottomNavbar />
        <BackToTop />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
