import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LegalModals } from './components/LegalModals';
import LoginModal from './components/LoginModal';
import ScrollToTop from './components/ScrollToTop';
import { useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Tipsters from './pages/Tipsters';
import Calculator from './pages/Calculator';
import LiveScores from './pages/LiveScores';
import TopScorers from './pages/TopScorers';
import Bookmakers from './pages/Bookmakers';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import TipsterProfile from './pages/TipsterProfile';
import Clasificacion from './pages/Clasificacion';
import Legal from './pages/Legal';
import Help from './pages/Help';
import Dashboard from './pages/Dashboard';

function App() {
  const { isLoginOpen, setIsLoginOpen } = useAuth();
  
  return (
    <div className="min-h-screen bg-light-50 font-sans flex flex-col">
      <ScrollToTop />
      <LegalModals />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live" element={<LiveScores />} />
          <Route path="/clasificacion" element={<Clasificacion />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/scorers" element={<TopScorers />} />
          <Route path="/tipsters" element={<Tipsters />} />
          <Route path="/bookmakers" element={<Bookmakers />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/tipster/:id" element={<TipsterProfile />} />
          <Route path="/ayuda" element={<Help />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
}

export default App;
