import React from 'react';

const ProtectedRoute = ({ user, children, onOpenLogin, onOpenSignup }) => {
  if (user) {
    return children;
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-gray-950 transition-colors duration-500 overflow-hidden">
      
      {/* 1. Enhanced Atmospheric Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-slate-800/20 rounded-full blur-[100px]"></div>
      </div>

      {/* 2. Floating Animation Styles */}
      <style>
        {`
          @keyframes bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-bob {
            animation: bob 4s ease-in-out infinite;
          }
        `}
      </style>

      {/* 3. Main Container with Top Space (mt-24) */}
      <div className="relative z-10 w-full max-w-md px-6 mt-24 mb-12 animate-in fade-in zoom-in-95 duration-700">
        
        {/* The Animated Card */}
        <div className="animate-bob bg-gray-900/40 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] text-center ring-1 ring-white/5 overflow-hidden">
          
          {/* Subtle Internal Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl"></div>

          {/* Brand Icon */}
          <div className="relative w-16 h-16 bg-gradient-to-tr from-violet-700 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-900/40 rotate-3 transition-transform hover:rotate-0 duration-500">
             <span className="text-white text-3xl font-black drop-shadow-md">H</span>
             <div className="absolute inset-0 rounded-2xl border border-white/20 scale-110"></div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Unlock Details</h2>
          <p className="text-gray-400 mb-10 leading-relaxed text-sm">
            Join <span className="text-violet-400 font-semibold drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]">Houselandia</span> to view full property details, high-resolution interior galleries, and contact agents.
          </p>
          
          <div className="space-y-4">
            {/* Primary Action */}
            <button 
              onClick={onOpenSignup}
              className="group relative w-full bg-violet-700 hover:bg-violet-600 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-violet-900/30 active:scale-[0.98] overflow-hidden"
            >
              <span className="relative z-10">Create an account</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="h-[1px] bg-gradient-to-r from-transparent to-gray-800 flex-grow"></div>
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">OR</span>
              <div className="h-[1px] bg-gradient-to-l from-transparent to-gray-800 flex-grow"></div>
            </div>

            {/* Secondary Action */}
            <button 
              onClick={onOpenLogin}
              className="w-full bg-white/5 border border-white/10 text-gray-300 py-4 rounded-2xl font-bold hover:bg-white/10 hover:text-white hover:border-violet-500/50 transition-all active:scale-[0.98] backdrop-blur-sm"
            >
              Sign in to existing account
            </button>
          </div>

          <p className="mt-8 text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest font-medium border-t border-white/5 pt-6">
            By signing in, you agree to our <br/>
            <span className="text-violet-500 cursor-pointer hover:text-violet-400 transition-colors">Terms of Service</span> & <span className="text-violet-500 cursor-pointer hover:text-violet-400 transition-colors">Privacy Notice</span>
          </p>
        </div>
        
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="mt-8 w-full text-gray-500 font-bold hover:text-violet-400 transition-all flex items-center justify-center gap-3 text-xs tracking-[0.2em] group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          BACK TO BROWSING
        </button>
      </div>
    </div>
  );
};

export default ProtectedRoute;