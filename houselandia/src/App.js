import React from 'react'; // Removed useEffect
import { Routes, Route } from 'react-router-dom'; // Removed useNavigate and useLocation
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Login from './components/Login';
import Signup from './components/Signup';
import HouseList from './components/HouseList'; // 1. Import your new component

function App() {
  // Removed the useEffect that was forcing navigation to '/'
  
  return (
    <div className="App flex flex-col min-h-screen bg-white"> 
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* 2. Add the results route here */}
          <Route path="/results" element={<HouseList />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;