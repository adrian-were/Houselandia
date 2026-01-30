import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Login from './components/Login';
import Signup from './components/Signup';
import LogoutModal from './components/LogoutModal'; // Import the new modal
import HouseList from './components/HouseList';
import HouseDetails from './components/HouseDetails';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // New State
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('userEmail');
    if (savedUser) setUser(savedUser);
  }, []);

  // This function is now called ONLY after the user confirms in the modal
  const handleConfirmLogout = () => {
    localStorage.removeItem('userEmail');
    setUser(null);
    setIsLogoutModalOpen(false); // Close the modal
    navigate('/'); // Redirect to Banner page
  };

  const handleLoginSuccess = (email) => {
    setUser(email);
    localStorage.setItem('userEmail', email);
  };

  return (
    <div className="App flex flex-col min-h-screen bg-slate-50 text-gray-900 font-secondary"> 
      {/* Header logout click now just opens the confirmation modal */}
      <Header 
        user={user} 
        onLogout={() => setIsLogoutModalOpen(true)} 
        onLoginClick={() => setIsLoginOpen(true)} 
        onSignupClick={() => setIsSignupOpen(true)} 
      />

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

      {/* Modal Components */}
      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />
      <Signup 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
      />
      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleConfirmLogout} 
      />

      <Footer />
    </div>
  );
}

export default App;
