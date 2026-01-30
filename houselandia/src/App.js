import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Login from './components/Login';
import Signup from './components/Signup';
import HouseList from './components/HouseList';
import ProtectedRoute from './components/ProtectedRoute';
import HouseDetails from './components/HouseDetails';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(false); // New State

  useEffect(() => {
    const savedUser = localStorage.getItem('userEmail');
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  const handleLoginSuccess = (email) => {
    setUser(email);
    localStorage.setItem('userEmail', email);
    
    // Trigger the Welcome Toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000); 
  };

  return (
    <div className="App flex flex-col min-h-screen bg-slate-50 text-gray-900 font-secondary relative"> 
      <Header 
        user={user} 
        onLogout={handleLogout}
        onLoginClick={() => setIsLoginOpen(true)} 
        onSignupClick={() => setIsSignupOpen(true)} 
      />

      {/* Welcome Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 right-10 z-[100] animate-in slide-in-from-right-10 duration-500">
          <div className="bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-gray-700">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">
              👋
            </div>
            <div>
              <p className="font-bold">Welcome back!</p>
              <p className="text-sm text-gray-400">Successfully unlocked property details.</p>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/results" element={<HouseList />} />
          <Route 
            path="/house/:id" 
            element={
              <ProtectedRoute user={user} onOpenLogin={() => setIsLoginOpen(true)}>
                <HouseDetails />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />
      <Signup isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
      <Footer />
    </div>
  );
}

export default App;