import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout, onLoginClick, onSignupClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Replace this with your actual admin email
  const ADMIN_EMAIL = "shisia@gmail.com";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAction = (callback) => {
    setIsMobileMenuOpen(false);
    callback();
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-gray-900/90 backdrop-blur-md border-gray-800 py-3 shadow-lg' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className='container mx-auto flex justify-between items-center px-4'>
        <Link to='/' onClick={() => setIsMobileMenuOpen(false)}>
          <span className="text-2xl font-bold text-white tracking-tight">Logo</span>
        </Link>

        <div className='hidden md:flex items-center gap-8'>
          {user ? (
            <div className='flex items-center gap-6'>
              {/* --- RESTRICTED DASHBOARD LINK --- */}
              {user === ADMIN_EMAIL && (
                <Link 
                  to="/admin" 
                  className="text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Dashboard
                </Link>
              )}
              
              <span className="text-gray-400 text-sm font-medium">
                Logged in as: <b className="text-violet-400">{user.split('@')[0]}</b>
              </span>
              <button 
                onClick={onLogout} 
                className='bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition-all border border-red-500/20 active:scale-95'
              >
                Log out
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-8'>
              <button onClick={onLoginClick} className='text-white hover:text-violet-400 font-semibold transition-colors'>
                Log in
              </button>
              <button onClick={onSignupClick} className='bg-violet-700 hover:bg-violet-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-violet-900/20 active:scale-95'>
                Sign up
              </button>
            </div>
          )}
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div className={`md:hidden absolute w-full transition-all duration-300 ease-in-out bg-gray-900 border-b border-gray-800 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col p-6 gap-4 text-center">
          {user ? (
            <>
              {/* --- RESTRICTED MOBILE DASHBOARD LINK --- */}
              {user === ADMIN_EMAIL && (
                <Link 
                  to="/admin" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-violet-400 font-bold py-2 hover:bg-violet-500/10 rounded-lg transition-all"
                >
                  Dashboard
                </Link>
              )}
              <span className="text-gray-400 text-sm">Logged in as: <b className="text-violet-400">{user}</b></span>
              <button onClick={() => handleAction(onLogout)} className="text-red-500 font-bold py-2 hover:bg-red-500/10 rounded-lg transition-all">
                Log out
              </button>
            </>
          ) : (
            <>
              <button onClick={() => handleAction(onLoginClick)} className="text-white font-semibold py-2 hover:text-violet-400 transition-all">Log in</button>
              <button onClick={() => handleAction(onSignupClick)} className="bg-violet-700 text-white py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-all">Sign up</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;