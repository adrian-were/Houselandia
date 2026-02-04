import React, { useEffect } from 'react';

const ProtectedRoute = ({ user, children, onOpenLogin, onOpenSignup }) => {
  useEffect(() => {
    // We won't auto-open a modal anymore; we'll show the selection screen first
  }, [user]);

  if (user) {
    return children;
  }

  return (
    <div className="relative min-h-[80vh] w-full flex items-center justify-center bg-slate-50">
      {/* Visual background decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-200/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-gray-900 border border-gray-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl text-center">
          {/* Brand/Status Icon */}
          <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
             <span className="text-white text-3xl font-bold">L</span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Sign in</h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Join Houselandia to view full property details, interior galleries, and contact agents.
          </p>
          
          <div className="space-y-4">
            {/* Primary Action: Create Account */}
            <button 
              onClick={onOpenSignup}
              className="w-full bg-violet-700 hover:bg-violet-600 text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-violet-900/20 active:scale-[0.98]"
            >
              Create an account
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="h-[1px] bg-gray-800 flex-grow"></div>
              <span className="text-gray-600 text-sm font-medium uppercase tracking-widest">or</span>
              <div className="h-[1px] bg-gray-800 flex-grow"></div>
            </div>

            {/* Secondary Action: Login */}
            <button 
              onClick={onOpenLogin}
              className="w-full bg-transparent border border-gray-700 text-violet-400 py-4 rounded-2xl font-bold hover:bg-gray-800 hover:text-violet-300 transition-all active:scale-[0.98]"
            >
              Sign in to an existing account
            </button>
          </div>

          <p className="mt-8 text-xs text-gray-500 leading-relaxed">
            By signing in, you agree to Houselandia's <span className="text-violet-500 cursor-pointer hover:underline">Terms of Service</span> and <span className="text-violet-500 cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </div>
        
        <button 
          onClick={() => window.history.back()}
          className="mt-6 w-full text-gray-500 font-medium hover:text-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to browsing
        </button>
      </div>
    </div>
  );
};

export default ProtectedRoute;