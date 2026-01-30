import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Login from './components/Login';
import Signup from './components/Signup';
import HouseList from './components/HouseList';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Sync state with localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('userEmail');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  const handleLoginSuccess = (email) => {
    setUser(email);
    localStorage.setItem('userEmail', email);
  };

  return (
    <div className="App flex flex-col min-h-screen bg-slate-50 text-gray-900 font-secondary"> 
      <Header 
        user={user} 
        onLogout={handleLogout}
        onLoginClick={() => setIsLoginOpen(true)} 
        onSignupClick={() => setIsSignupOpen(true)} 
      />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Banner />} />
          
          {/* Protected Route Gatekeeper */}
          <Route 
            path="/results" 
            element={
              <ProtectedRoute user={user} onOpenLogin={() => setIsLoginOpen(true)}>
                <HouseList />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      {/* Login Modal with Success Callback */}
      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />
      
      {/* Signup Modal */}
      <Signup 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
      />

      <Footer />
    </div>
  );
}

export default App;