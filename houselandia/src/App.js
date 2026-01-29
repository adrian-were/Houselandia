import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Login from './components/Login';
import Signup from './components/Signup';
import HouseList from './components/HouseList';
import HouseDetails from './components/HouseDetails'; // 1. Import your new component

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="App flex flex-col min-h-screen bg-zinc-50 text-gray-900"> 
      <Header 
        onLoginClick={() => setIsLoginOpen(true)} 
        onSignupClick={() => setIsSignupOpen(true)}
      />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/results" element={<HouseList />} />
          
          {/* 2. Add the dynamic route for individual houses */}
          <Route path="/house/:id" element={<HouseDetails />} />
        </Routes>
      </main>

      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Signup isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />

      <Footer />
    </div>
  );
}

export default App;