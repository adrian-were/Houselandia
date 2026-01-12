import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If the page is refreshed and the path is NOT the home page
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, []); // Empty dependency array means this only runs once when the app loads

  return (
    <div className="App flex flex-col min-h-screen bg-gray-900">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
