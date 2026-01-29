import React from 'react';

const Login = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-modal {
            animation: fadeIn 0.2s ease-out forwards;
          }
        `}
      </style>
      <div 
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      >
        <section className="animate-modal relative w-full max-w-md bg-white rounded-xl shadow-2xl dark:bg-gray-800 border dark:border-gray-700">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <img className="w-10 h-10 mb-3" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input type="email" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="name@company.com" required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input type="password" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="••••••••" required />
              </div>
              
              <button type="submit" className="w-full py-3 px-4 text-white bg-violet-600 hover:bg-violet-700 font-semibold rounded-lg shadow-lg hover:shadow-violet-500/30 transition-all transform active:scale-95">
                Sign In
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;