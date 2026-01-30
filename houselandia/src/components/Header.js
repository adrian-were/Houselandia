import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout, onLoginClick, onSignupClick }) => {
  return (
    <header className='py-6 mb-12 border-b border-gray-800 bg-gray-900'>
      <div className='container mx-auto flex justify-between items-center px-4'>
        <Link to='/'>
           <span className="text-2xl font-bold text-white">Logo</span>
        </Link>
        
        <div className='flex items-center gap-6'>
          {user ? (
            <div className='flex items-center gap-4'>
              <span className="text-gray-400 text-sm hidden sm:block">Logged in as: <b>{user}</b></span>
              <button 
                onClick={onLogout} 
                className='bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition border border-red-500/20'
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={onLoginClick} 
                className='text-white hover:text-violet-400 transition cursor-pointer'
              >
                Log in
              </button>
              <button 
                onClick={onSignupClick} 
                className='bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded-lg transition'
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;