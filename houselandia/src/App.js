import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Login from './components/Login';
import Signup from './components/Signup';
import HouseList from './components/HouseList';

function App() {
  // State to control if the login modal is visible
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="App flex flex-col min-h-screen bg-white"> 
      {/* Pass the opener function to your Header */}
      <Header onLoginClick={() => setIsLoginOpen(true)} 
        onSignupClick={() => setIsSignupOpen(true)}
        />
      

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/results" element={<HouseList />} />
        </Routes>
      </main>

      {/* The Login Modal sits outside the Routes so it can overlay any page */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Signup isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />

      <Footer />
    </div>
  );
}

export default App;