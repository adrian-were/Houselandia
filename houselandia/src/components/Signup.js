import React, { useState, useEffect } from 'react';

const Signup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Real-time password matching check
  useEffect(() => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  }, [formData.password, formData.confirmPassword]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/.test(password); 
    const hasSpecial = /[!@#$%^&*]/.test(password); 
    
    if (password.length < minLength) return "The password must be at least 8 characters long.";
    if (!hasNumber) return "The password must contain at least one number.";
    if (!hasSpecial) return "The password must contain at least one special character (!@#$%^&*).";
    return null; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
        onClose(); 
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-signup { animation: slideUp 0.3s ease-out forwards; }
        `}
      </style>

      <div 
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <div className="animate-signup relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl dark:bg-gray-800 border dark:border-gray-700">
          
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8">
            <div className="flex flex-col items-center mb-6">
              <img className="w-10 h-10 mb-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
            </div>

            {error && (
              <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg text-center">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                  placeholder="your@email.com" required 
                />
              </div>

              {/* Password Field with Icon */}
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input 
                  type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                  placeholder="••••••••" required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[34px] text-gray-500 hover:text-violet-600 dark:text-gray-400"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L1 1m11.92 11.92L23 23" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                <input 
                  type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                  className={`w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-violet-500'
                  }`} 
                  placeholder="••••••••" required 
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading || (formData.confirmPassword && formData.password !== formData.confirmPassword)}
                className={`w-full py-3 mt-2 text-white font-semibold rounded-lg shadow-lg transition-all ${
                  loading || (formData.confirmPassword && formData.password !== formData.confirmPassword) 
                  ? 'bg-violet-400 opacity-70 cursor-not-allowed' 
                  : 'bg-violet-600 hover:bg-violet-700 active:scale-95'
                }`}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;