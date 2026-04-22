import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

export default function Login({ onLoginSuccess, onClose }) {
  const [currentView, setCurrentView] = useState('login');
  const [users, setUsers] = useState([]);
  const [otpData, setOtpData] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for login password visibility
  const [showRegisterPassword, setShowRegisterPassword] = useState(false); // State for register password visibility

  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [forgotForm, setForgotForm] = useState({ email: '' });
  const [resetForm, setResetForm] = useState({ otp: '', newPassword: '' });
  
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const showMessage = (msg, type = 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  // Email Validation Functions
  const validateEmailFormat = (email) => {
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) return { valid: false, message: 'Email is required' };
    
    if (!trimmedEmail.includes('@')) return { valid: false, message: 'Email must contain @ symbol' };
    
    const emailParts = trimmedEmail.split('@');
    if (emailParts.length !== 2) return { valid: false, message: 'Email format is invalid' };
    
    const [localPart, domainPart] = emailParts;
    
    if (!localPart || !domainPart) return { valid: false, message: 'Email format is invalid' };
    
    if (trimmedEmail.includes(' ')) return { valid: false, message: 'Email cannot contain spaces' };
    
    const invalidChars = /[,;<>()[\]"'\\/\s]/;
    if (invalidChars.test(trimmedEmail)) return { valid: false, message: 'Email contains invalid characters' };
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) return { valid: false, message: 'Please enter a valid email address' };
    
    if (localPart.length > 64) return { valid: false, message: 'Email username part is too long (max 64 characters)' };
    if (domainPart.length > 255) return { valid: false, message: 'Email domain part is too long (max 255 characters)' };
    if (trimmedEmail.length > 320) return { valid: false, message: 'Email is too long (max 320 characters)' };
    if (trimmedEmail.length < 5) return { valid: false, message: 'Email is too short (minimum 5 characters)' };
    
    if (!domainPart.includes('.')) return { valid: false, message: 'Email domain must contain a dot (e.g., example.com)' };
    
    if (domainPart.startsWith('.') || domainPart.endsWith('.') || domainPart.startsWith('-') || domainPart.endsWith('-')) {
      return { valid: false, message: 'Invalid domain format' };
    }
    
    if (domainPart.includes('..')) return { valid: false, message: 'Domain cannot have consecutive dots' };
    
    const domainParts = domainPart.split('.');
    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2) return { valid: false, message: 'Invalid top-level domain' };
    
    const commonTypos = ['gmial.com', 'hotmial.com', 'yahooo.com', 'outlok.com', 'gmai.com'];
    const lowerDomain = domainPart.toLowerCase();
    if (commonTypos.includes(lowerDomain)) {
      const suggestions = {
        'gmial.com': 'gmail.com',
        'gmai.com': 'gmail.com',
        'hotmial.com': 'hotmail.com',
        'yahooo.com': 'yahoo.com',
        'outlok.com': 'outlook.com'
      };
      return { valid: false, message: `Did you mean ${suggestions[lowerDomain]}?` };
    }
    
    const disposableDomains = ['10minutemail.com', 'tempmail.org', 'guerrillamail.com'];
    if (disposableDomains.includes(lowerDomain)) {
      return { valid: false, message: 'Temporary email addresses are not allowed' };
    }
    
    return { valid: true };
  };

  const normalizeEmail = (email) => {
    return email.trim().toLowerCase();
  };

  const validateName = (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return { valid: false, message: 'Name is required' };
    if (trimmedName.length < 2) return { valid: false, message: 'Name must be at least 2 characters' };
    if (trimmedName.length > 50) return { valid: false, message: 'Name must be less than 50 characters' };
    
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(trimmedName)) return { valid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
    
    return { valid: true };
  };

  const validatePassword = (password) => {
    if (!password) return { valid: false, message: 'Password is required' };
    if (password.length < 6) return { valid: false, message: 'Password must be at least 6 characters' };
    if (password.length > 128) return { valid: false, message: 'Password must be less than 128 characters' };
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!hasLetter || !hasNumber) {
      return { valid: false, message: 'Password must contain at least one letter and one number' };
    }
    
    return { valid: true };
  };

  const checkEmailExists = (email) => {
    const normalizedEmail = normalizeEmail(email);
    return users.find(user => normalizeEmail(user.email) === normalizedEmail);
  };

  const handleRegister = () => {
    const trimmedName = registerForm.name.trim();
    const trimmedEmail = registerForm.email.trim();
    const trimmedPassword = registerForm.password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      showMessage('Please fill in all fields');
      return;
    }

    const nameValidation = validateName(trimmedName);
    if (!nameValidation.valid) {
      showMessage(nameValidation.message);
      return;
    }

    const emailValidation = validateEmailFormat(trimmedEmail);
    if (!emailValidation.valid) {
      showMessage(emailValidation.message);
      return;
    }

    const passwordValidation = validatePassword(trimmedPassword);
    if (!passwordValidation.valid) {
      showMessage(passwordValidation.message);
      return;
    }

    if (checkEmailExists(trimmedEmail)) {
      showMessage('Email already registered');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: trimmedName,
      email: normalizeEmail(trimmedEmail),
      password: trimmedPassword
    };

    setUsers([...users, newUser]);
    setLoginForm({ email: trimmedEmail, password: '' });
    setRegisterForm({ name: '', email: '', password: '' });
    showMessage('Registration successful! Please login.', 'success');
    setCurrentView('login');
  };

  const handleLogin = () => {
    const trimmedEmail = loginForm.email.trim();
    const trimmedPassword = loginForm.password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      showMessage('Please fill in all fields');
      return;
    }

    const emailValidation = validateEmailFormat(trimmedEmail);
    if (!emailValidation.valid) {
      showMessage(emailValidation.message);
      return;
    }

    const normalizedInputEmail = normalizeEmail(trimmedEmail);
    const user = users.find(u => u.email === normalizedInputEmail && u.password === trimmedPassword);
    
    if (!user) {
      const emailExists = users.find(u => u.email === normalizedInputEmail);
      if (!emailExists) {
        showMessage('Please register first, then login');
        return;
      }
      showMessage('Invalid password');
      return;
    }

    showMessage('Login successful!', 'success');
    setLoginForm({ email: '', password: '' });
    
    setTimeout(() => {
      if (onLoginSuccess) {
        // Pass the user's name instead of email for better UX
        onLoginSuccess(user.name);
      }
      if (onClose) {
        onClose();
      }
    }, 1000);
  };

  const handleForgotPassword = () => {
    const trimmedEmail = forgotForm.email.trim();

    if (!trimmedEmail) {
      showMessage('Please enter your email');
      return;
    }

    const emailValidation = validateEmailFormat(trimmedEmail);
    if (!emailValidation.valid) {
      showMessage(emailValidation.message);
      return;
    }

    const user = checkEmailExists(trimmedEmail);
    if (!user) {
      showMessage('Email not found. Please register first.');
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpData({ email: normalizeEmail(trimmedEmail), otp });
    
    showMessage(`OTP sent to ${trimmedEmail}. Use OTP: ${otp}`, 'success');
    setCurrentView('resetPassword');
  };

  const handleResetPassword = () => {
    const trimmedOtp = resetForm.otp.trim();
    const trimmedNewPassword = resetForm.newPassword.trim();

    if (!trimmedOtp || !trimmedNewPassword) {
      showMessage('Please fill in all fields');
      return;
    }

    if (trimmedOtp !== otpData.otp) {
      showMessage('Invalid OTP');
      return;
    }

    const passwordValidation = validatePassword(trimmedNewPassword);
    if (!passwordValidation.valid) {
      showMessage(passwordValidation.message);
      return;
    }

    setUsers(users.map(user => 
      user.email === otpData.email
        ? { ...user, password: trimmedNewPassword }
        : user
    ));

    setResetForm({ otp: '', newPassword: '' });
    setOtpData(null);
    setForgotForm({ email: '' });
    showMessage('Password reset successful! Please login.', 'success');
    setCurrentView('login');
  };

  // Fixed close handler - rely on onClose prop
  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onClose) {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose(e);
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)'
      }}
      onClick={handleBackdropClick}
    >
      <div 
        className="relative rounded-3xl p-8 w-full max-w-md backdrop-blur-lg"
        style={{
          background: 'rgba(255, 255 , 255 , 1)',
          border: '1px solid rgba(255, 255, 255, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Fixed Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 z-10"
          style={{ color: '#2D3748' }}
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div 
            className="w-20 h-20 bg-black rounded-full mx-auto mb-4 flex items-center justify-center relative"
            style={{
              boxShadow: `
                8px 8px 16px #ffffffff,
                -8px -8px 16px #ffffff
              `
            }}
          >
            <div className="text-white text-xs font-bold">Dashboard</div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800"></h1>
          <p className="text-gray-600 text-sm">Made easy!</p>
        </div>

        {/* Message Display */}
        {message && (
          <div 
            className={`mb-6 p-3 rounded-xl text-center text-sm ${
              messageType === 'success' ? 'text-green-700' : 'text-red-700'
            }`}
            style={{
              background: messageType === 'success' ? '#f0fdf4' : '#fef2f2',
              boxShadow: `
                inset 2px 2px 4px #bebebe,
                inset -2px -2px 4px #ffffff
              `
            }}
          >
            {message}
          </div>
        )}

        {/* Login Form */}
        {currentView === 'login' && (
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-500 z-10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <input
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                className="w-full pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 rounded-xl border-none outline-none"
                style={{
                  background: '#f0f0f0',
                  boxShadow: `
                    inset 4px 4px 8px #bebebe,
                    inset -4px -4px 8px #ffffff
                  `
                }}
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-500 z-10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/>
                </svg>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full pl-12 pr-12 py-4 text-gray-700 placeholder-gray-400 rounded-xl border-none outline-none"
                style={{
                  background: '#f0f0f0',
                  boxShadow: `
                    inset 4px 4px 8px #bebebe,
                    inset -4px -4px 8px #ffffff
                  `
                }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500 z-10"
                type="button"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
                boxShadow: `
                  6px 6px 12px #bebebe,
                  -6px -6px 12px #ffffff
                `
              }}
              onMouseDown={(e) => {
                e.target.style.boxShadow = `
                  inset 4px 4px 8px #bebebe,
                  inset -4px -4px 8px #ffffff
                `;
              }}
              onMouseUp={(e) => {
                e.target.style.boxShadow = `
                  6px 6px 12px #bebebe,
                  -6px -6px 12px #ffffff
                `;
              }}
            >
              Login
            </button>

            <div className="text-center space-x-2 text-sm text-gray-600">
              <button
                onClick={() => setCurrentView('forgotPassword')}
                className="hover:text-cyan-500 transition-colors"
              >
                Forgot password?
              </button>
              <span>or</span>
              <button
                onClick={() => setCurrentView('register')}
                className="hover:text-cyan-500 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}

        {/* Register Form */}
        {currentView === 'register' && (
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-500 z-10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                className="w-full pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 rounded-xl border-none outline-none"
                style={{
                  background: '#f0f0f0',
                  boxShadow: `
                    inset 4px 4px 8px #bebebe,
                    inset -4px -4px 8px #ffffff
                  `
                }}
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-500 z-10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <input
                type="email"
                placeholder="Email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                className="w-full pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 rounded-xl border-none outline-none"
                style={{
                  background: '#f0f0f0',
                  boxShadow: `
                    inset 4px 4px 8px #bebebe,
                    inset -4px -4px 8px #ffffff
                  `
                }}
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-500 z-10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/>
                </svg>
              </div>
              <input
                type={showRegisterPassword ? 'text' : 'password'}
                placeholder="Password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                className="w-full pl-12 pr-12 py-4 text-gray-700 placeholder-gray-400 rounded-xl border-none outline-none"
                style={{
                  background: '#f0f0f0',
                  boxShadow: `
                    inset 4px 4px 8px #bebebe,
                    inset -4px -4px 8px #ffffff
                  `
                }}
              />
              <button
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                className="absolute right-4 top-4 text-gray-500 z-10"
                type="button"
              >
                {showRegisterPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              onClick={handleRegister}
              className="w-full text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
                boxShadow: `
                  6px 6px 12px #bebebe,
                  -6px -6px 12px #ffffff
                `
              }}
              onMouseDown={(e) => {
                e.target.style.boxShadow = `
                  inset 4px 4px 8px #bebebe,
                  inset -4px -4px 8px #ffffff
                `;
              }}
              onMouseUp={(e) => {
                e.target.style.boxShadow = `
                  6px 6px 12px #bebebe,
                  -6px -6px 12px #ffffff
                `;
              }}
            >
              Register
            </button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentView('login')}
                className="hover:text-cyan-500 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        )}

        {/* Forgot Password Form */}
        {currentView === 'forgotPassword' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Forgot Password</h2>
              <p className="text-sm text-gray-600">Enter your email to receive OTP</p>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-500 z-10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <input
                type="email"
                placeholder="Email"
                value={forgotForm.email}
                onChange={(e) => setForgotForm({...forgotForm, email: e.target.value})}
                className="w-full pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 rounded-xl border-none outline-none"
                style={{
                  background: '#f0f0f0',
                  boxShadow: `
                    inset 4px 4px 8px #bebebe,
                    inset -4px -4px 8px #ffffff
                  `
                }}
              />
            </div>

            <button
              onClick={handleForgotPassword}
              className="w-full text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
                boxShadow: `
                  6px 6px 12px #bebebe,
                  -6px -6px 12px #ffffff
                `
              }}
            >
              Send OTP
            </button>

            <div className="text-center text-sm text-gray-600">
              <button
                onClick={() => setCurrentView('login')}
                className="hover:text-cyan-500 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}

        {/* Reset Password Form */}
        {currentView === 'resetPassword' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Reset Password</h2>
              <p className="text-sm text-gray-600">Enter OTP and new password</p>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-500 z-10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={resetForm.otp}
                onChange={(e) => setResetForm({...resetForm, otp: e.target.value})}
                className="w-full pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 rounded-xl border-none outline-none"
                style={{
                  background: '#f0f0f0',
                  boxShadow: `
                    inset 4px 4px 8px #bebebe,
                    inset -4px -4px 8px #ffffff
                  `
                }}
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-500 z-10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/>
                </svg>
              </div>
              <input
                type="password"
                placeholder="New Password"
                value={resetForm.newPassword}
                onChange={(e) => setResetForm({...resetForm, newPassword: e.target.value})}
                className="w-full pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 rounded-xl border-none outline-none"
                style={{
                  background: '#f0f0f0',
                  boxShadow: `
                    inset 4px 4px 8px #bebebe,
                    inset -4px -4px 8px #ffffff
                  `
                }}
              />
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
                boxShadow: `
                  6px 6px 12px #bebebe,
                  -6px -6px 12px #ffffff
                `
              }}
            >
              Reset Password
            </button>

            <div className="text-center text-sm text-gray-600">
              <button
                onClick={() => setCurrentView('login')}
                className="hover:text-cyan-500 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}