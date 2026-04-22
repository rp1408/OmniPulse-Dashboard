import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { FaInstagram, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { UseAuth } from '../AuthContext';

// Instagram Login Component
export function InstagramLogin({ onClose, onBack, onSuccess, onShowMainLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { isLoggedIn, socialMediaLogin } = UseAuth();

  const handleInstagramSubmit = (e) => {
    if (e) e.preventDefault();
    console.log("Instagram login attempted with:", formData);

    if (!isLoggedIn) {
      alert("Please login to main dashboard first");
      if (onShowMainLogin) {
        onShowMainLogin();
      }
      onClose();
      return;
    }

    if (formData.username && formData.password) {
      console.log("Instagram login successful");
      
      const processedUserName = formData.username.startsWith('@') 
        ? formData.username 
        : `@${formData.username}`;
        
      const userData = {
        username: formData.username,
        userName: processedUserName,
        displayName: processedUserName,
        email: formData.username.includes('@') && formData.username.includes('.') 
          ? formData.username 
          : null,
        isLoggedIn: true
      };

      console.log("Processed Instagram user data:", userData);
      
      const success = socialMediaLogin('instagram', userData);
      
      if (success) {
        onSuccess("instagram", userData);
        navigate("/Instagramdash");
        onClose();
        console.log("✅ Instagram login complete - redirecting to dashboard");
      } else {
        alert("Instagram login failed. Please try again.");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000057] backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-[360px] shadow-2xl transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <h2 className="text-base font-semibold text-gray-900">
            Connect Instagram
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <div className="text-center mb-4">
            <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded-2xl flex items-center justify-center shadow-lg">
              <FaInstagram className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Instagram</h3>
            <p className="text-gray-600 text-xs">
              Connect your Instagram account to manage your business presence
            </p>
            {!isLoggedIn && (
              <div className="mt-2 p-2 bg-yellow-100 border border-yellow-400 rounded-lg">
                <p className="text-yellow-700 text-xs">
                  You will be able to connect to account only after logging in to the main account.
                </p>
                <button 
                  onClick={() => {
                    if (onShowMainLogin) {
                      onShowMainLogin();
                    }
                    onClose();
                  }}
                  className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                >
                  Login to Main Account
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleInstagramSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Phone number, username, or email"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 transition-all duration-200"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 pr-10 transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-4 h-4" />
                ) : (
                  <FaEye className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            >
              Log in
            </button>
          </form>

          <div className="text-center mt-3">
            <a
              href="#"
              className="text-blue-500 text-xs hover:underline hover:text-blue-600 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
            By continuing, you agree to Instagram's Terms of Use and Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

// Facebook Login Component
export function FacebookLogin({ onClose, onBack, onSuccess, onShowMainLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { isLoggedIn, socialMediaLogin } = UseAuth();

  const handleFacebookSubmit = (e) => {
    if (e) e.preventDefault();
    console.log("Facebook login attempted with:", formData);

    if (!isLoggedIn) {
      alert("Please login to main dashboard first");
      if (onShowMainLogin) {
        onShowMainLogin();
      }
      onClose();
      return;
    }

    if (formData.email && formData.password) {
      console.log("Facebook login successful");
      
      const userData = {
        email: formData.email,
        userName: formData.email,
        displayName: formData.email,
        isLoggedIn: true
      };

      console.log("Processed Facebook user data:", userData);
      
      const success = socialMediaLogin('facebook', userData);
      
      if (success) {
        onSuccess("facebook", userData);
        onClose();
        console.log("✅ Facebook login complete");
      } else {
        alert("Facebook login failed. Please try again.");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000057] backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl w-[360px] shadow-2xl transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <h2 className="text-base font-semibold text-gray-900">
            Connect Facebook
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <div className="text-center mb-4">
            <div className="w-12 h-12 mx-auto mb-2 bg-[#1877F2] rounded-2xl flex items-center justify-center shadow-lg">
              <FaFacebook className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Facebook</h3>
            <p className="text-gray-600 text-xs">
              Connect to Facebook to manage your business page and advertising
              campaigns
            </p>
            {!isLoggedIn && (
              <div className="mt-2 p-2 bg-yellow-100 border border-yellow-400 rounded-lg">
                <p className="text-yellow-700 text-xs">
                 You will be able to connect to account only after logging in to the main account.
                </p>
                <button 
                  onClick={() => {
                    if (onShowMainLogin) {
                      onShowMainLogin();
                    }
                    onClose();
                  }}
                  className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                >
                  Login to Main Account
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleFacebookSubmit} className="space-y-3">
            <div>
              <input
                type="email"
                placeholder="Email address or phone number"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-4 h-4" />
                ) : (
                  <FaEye className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg font-medium transition-colors bg-[#1877F2] hover:bg-[#166FE5] text-white"
            >
              Log in
            </button>
          </form>

          <div className="text-center mt-3">
            <a href="#" className="text-[#1877F2] text-xs hover:underline">
              Forgotten account?
            </a>
          </div>

          <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
            By continuing, you agree to Facebook's Terms of Service and Data
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

// Meta Business Login Component
export function MetaBusinessLogin({ onClose, onBack, onSuccess, onShowMainLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { isLoggedIn, socialMediaLogin } = UseAuth();

  const handleMetaBusinessSubmit = (e) => {
    e.preventDefault();
    console.log("Meta Business login attempted with:", formData);

    if (!isLoggedIn) {
      alert("Please login to main dashboard first");
      if (onShowMainLogin) {
        onShowMainLogin();
      }
      onClose();
      return;
    }

    if (formData.email && formData.password) {
      console.log("Meta Business login successful, routing to Meta Business dashboard");
      
      const userData = {
        email: formData.email,
        userName: formData.email,
        displayName: formData.email,
        isLoggedIn: true
      };

      console.log("Processed Meta user data:", userData);
      
      const success = socialMediaLogin('meta', userData);
      
      if (success) {
        onSuccess("meta", userData);
        navigate("/Metacamping");
        onClose();
        console.log("✅ Meta Business login complete - redirecting to dashboard");
      } else {
        alert("Meta Business login failed. Please try again.");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000057] backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-[360px] shadow-2xl transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <h2 className="text-base font-semibold text-gray-900">
            Connect Meta Business
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <div className="text-center mb-4">
            <div className="w-12 h-12 mx-auto mb-2 bg-[#0064E0] rounded-2xl flex items-center justify-center shadow-lg">
              <div className="text-white text-base font-bold">M</div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Meta Business
            </h3>
            <p className="text-gray-600 text-xs">
              Access Meta Business Manager to run ads across Facebook and
              Instagram
            </p>
            {!isLoggedIn && (
              <div className="mt-2 p-2 bg-yellow-100 border border-yellow-400 rounded-lg">
                <p className="text-yellow-700 text-xs">
                  You will be able to connect to account only after logging in to the main account.
                </p>
                <button 
                  onClick={() => {
                    if (onShowMainLogin) {
                      onShowMainLogin();
                    }
                    onClose();
                  }}
                  className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                >
                  Login to Main Account
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleMetaBusinessSubmit} className="space-y-3">
            <div>
              <input
                type="email"
                placeholder="Work email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-4 h-4" />
                ) : (
                  <FaEye className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg font-medium transition-colors bg-[#0064E0] hover:bg-[#0056CC] text-white"
            >
              Log in to Business Manager
            </button>
          </form>

          <div className="text-center mt-3">
            <a href="#" className="text-[#0064E0] text-xs hover:underline">
              Forgot your password?
            </a>
          </div>

          <div className="mt-3 text-center">
            <span className="text-xs text-gray-600">
              Don't have a Business Manager account?{" "}
            </span>
            <a
              href="#"
              className="text-[#0064E0] text-xs hover:underline font-medium"
            >
              Create one
            </a>
          </div>

          <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
            By continuing, you agree to Meta's Business Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}