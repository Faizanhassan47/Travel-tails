import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import CursorCustom from './components/CursorCustom';
import PageTransition from './components/PageTransition';
import ScrollProgress from './components/ScrollProgress';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const UploadPage = lazy(() => import('./pages/UploadPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const PhotoDetailsPage = lazy(() => import('./pages/PhotoDetailsPage'));

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen key="splash" finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="film-grain"></div>
      <ScrollProgress />
      <CursorCustom />
      
      {!isLoading && (
        <>
          <Navbar />
          <main style={{ minHeight: '100vh' }}>
            <AnimatePresence mode="wait">
              <Suspense fallback={null}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                  <Route path="/photo/:id" element={<PageTransition><PhotoDetailsPage /></PageTransition>} />
                  <Route path="/search" element={<PageTransition><SearchPage /></PageTransition>} />
                  <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
                  <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
                  <Route path="/upload" element={<PageTransition><UploadPage /></PageTransition>} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
