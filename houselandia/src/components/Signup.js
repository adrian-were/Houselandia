import React from 'react';

const Signup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-modal { animation: fadeIn 0.3s ease-out forwards; }
        `}
      </style>
      <div 
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <div className="animate-modal relative w-full max-w-md bg-white rounded-xl shadow-2xl dark:bg-gray-800 border dark:border-gray-700">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex flex-col items-center">
              <img className="w-8 h-8 mb-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">Create an account</h1>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-violet-500 focus:border-violet-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-violet-500 focus:border-violet-500" placeholder="••••••••" required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input type="password" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-violet-500 focus:border-violet-500" placeholder="••••••••" required />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700" required />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                    I accept the <a className="font-medium text-violet-600 hover:underline" href="#">Terms and Conditions</a>
                  </label>
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-violet-700 hover:bg-violet-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-all transform active:scale-95">
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;