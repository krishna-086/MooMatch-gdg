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
import CattleDashboard from './CattleDashboard'; 


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
              <Services />
              <Testimonials />
              <Contact />
            </>
          } />

          {/* EduContent Page */}
          <Route path="/EduContent" element={<EduContent />} />

          {/* Cattle Management Dashboard Page */}
          <Route path="/dashboard" element={<CattleDashboard />} />

          
        </Routes>
        
        <BottomNavbar />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
