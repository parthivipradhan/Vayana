"use client";
import React, { useState } from "react";
import { Github, Chrome, Eye, EyeOff } from "lucide-react";

export default function SignupFormDemo() {
  const [focusedField, setFocusedField] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Form submitted");
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
      <div className="relative">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl transform rotate-1"></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform -rotate-1"></div>
        
        {/* Main form container */}
        <div className="relative bg-white/80 backdrop-blur-lg border border-white/20 shadow-2xl shadow-green-100/50 mx-auto w-full max-w-md rounded-3xl p-8 transition-all duration-500 hover:shadow-3xl hover:shadow-green-200/30">
          {/* Header with animated gradient text */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 bg-clip-text text-transparent mb-2 animate-pulse">
              Welcome to Vayana
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full mb-4 transition-all duration-300 hover:w-24"></div>
            <p className="text-gray-600 text-sm">
              Create your account for an amazing experience
            </p>
          </div>

                      <div onSubmit={handleSubmit} className="space-y-6">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <FloatingLabelInput
                id="firstname"
                type="text"
                placeholder="Tyler"
                label="First name"
                value={formData.firstname}
                onChange={(value: any) => handleInputChange("firstname", value)}
                onFocus={() => setFocusedField("firstname")}
                onBlur={() => setFocusedField("")}
                focused={focusedField === "firstname"}
              />
              <FloatingLabelInput
                id="lastname"
                type="text"
                placeholder="Durden"
                label="Last name"
                value={formData.lastname}
                onChange={(value: any) => handleInputChange("lastname", value)}
                onFocus={() => setFocusedField("lastname")}
                onBlur={() => setFocusedField("")}
                focused={focusedField === "lastname"}
              />
            </div>

            {/* Email field */}
            <FloatingLabelInput
              id="email"
              type="email"
              placeholder="projectmayhem@fc.com"
              label="Email Address"
              value={formData.email}
              onChange={(value: any) => handleInputChange("email", value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              focused={focusedField === "email"}
            />

            {/* Age field */}
            <FloatingLabelInput
              id="age"
              type="number"
              placeholder="25"
              label="Age"
              value={formData.age}
              onChange={(value: any) => handleInputChange("age", value)}
              onFocus={() => setFocusedField("age")}
              onBlur={() => setFocusedField("")}
              focused={focusedField === "age"}
            />

            {/* Password field with toggle */}
            <div className="relative">
              <FloatingLabelInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                label="Password"
                value={formData.password}
                onChange={(value: any) => handleInputChange("password", value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField("")}
                focused={focusedField === "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit button with loading state */}
            <button
              id="submitSignUp"
              className={`group relative w-full h-12 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                isSubmitting 
                  ? 'bg-green-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl hover:shadow-green-500/25'
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              <span className={`transition-opacity duration-200 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                Sign up →
              </span>
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <BottomGradient />
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-gray-500">or continue with</span>
              </div>
            </div>

            {/* Social buttons */}
            <div className="space-y-3">
              <SocialButton 
                icon={<Github size={18} />} 
                text="GitHub" 
                onClick={() => console.log("GitHub login")}
              />
              <SocialButton 
                icon={<Chrome size={18} />} 
                text="Google" 
                onClick={() => console.log("Google login")}
              />
            </div>
                      </div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-emerald-400/40 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-green-400/20 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

type FloatingLabelInputProps = {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  focused: boolean;
  className?: string;
};

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ id, type, placeholder, label, value, onChange, onFocus, onBlur, focused, className = "" }) => {
  const hasValue = value && value.length > 0;
  const isActive = focused || hasValue;

  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={isActive ? placeholder : ""}
        className={`peer w-full h-12 px-4 pt-6 pb-2 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 hover:bg-white/80 hover:shadow-lg hover:shadow-green-100/50 hover:scale-105 ${
          isActive ? 'pt-6 pb-2' : 'py-3'
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 text-gray-500 transition-all duration-300 pointer-events-none ${
          isActive
            ? 'top-2 text-xs text-green-600 font-medium'
            : 'top-1/2 text-sm transform -translate-y-1/2'
        }`}
      >
        {label}
      </label>
      {focused && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 pointer-events-none"></div>
      )}
    </div>
  );
};

type SocialButtonProps = {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
};

const SocialButton: React.FC<SocialButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative w-full h-12 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl transition-all duration-300 hover:bg-white/80 hover:shadow-lg hover:shadow-gray-100/50 hover:border-gray-300 transform hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex items-center justify-center space-x-3">
        <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
          {icon}
        </span>
        <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
          Continue with {text}
        </span>
      </div>
      <BottomGradient />
    </button>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover:opacity-100" />
    </>
  );
};
