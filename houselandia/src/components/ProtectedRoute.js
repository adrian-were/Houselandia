import React, { useEffect } from 'react';

const ProtectedRoute = ({ user, children, onOpenLogin }) => {
  useEffect(() => {
    // If user is not logged in, trigger the login modal automatically
    if (!user) {
      onOpenLogin();
    }
  }, [user, onOpenLogin]);

  // If user is authenticated, render the actual component (HouseDetails)
  if (user) {
    return children;
  }

  // If user is NOT authenticated, show this "Locked" state
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-50">
      
      {/* Background Decor (Blurred Shapes) to simulate hidden content */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-blue-200 rounded-full blur-[120px] animate-pulse"></div>
        <div className="w-[400px] h-[400px] bg-violet-200 rounded-full blur-[100px] ml-[-200px] mt-[-100px]"></div>
      </div>

      {/* The Locked Content Card */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border border-white p-8 md:p-12 rounded-[3rem] shadow-2xl text-center">
          
          {/* Icon with Ring Animation */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-full h-full bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
            Unlock Property Details
          </h2>
          
          <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            You're just one step away! Log in to access high-quality galleries, 
            exact locations, and direct contact with our premium agents.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onOpenLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-200 active:scale-95"
            >
              Sign In Now
            </button>
            <button 
              onClick={() => window.history.back()}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-10 py-4 rounded-2xl font-bold transition-all active:scale-95"
            >
              Keep Browsing
            </button>
          </div>

          <p className="mt-8 text-sm text-gray-400 font-medium italic">
            Trusted by over 10,000+ home seekers in Nairobi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;