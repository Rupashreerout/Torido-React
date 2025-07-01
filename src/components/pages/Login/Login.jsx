import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import './Login.css'

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setFormData({
      fullName: '',
      mobile: '',
      gender: '',
      dateOfBirth: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (activeTab === 'signup') {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(`${activeTab === 'login' ? 'Logged in' : 'Account created'} successfully!`);
    }, 1500);
  };

  return (
    <>
     <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
    <div className="login-wrapper">
      <div className="login-card">
        <div className="text-center mb-4">
          <h1 className="h3 fw-bold mb-3">
            {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="text-muted">
            {activeTab === 'login'
              ? 'Please login to your account or sign up to create a new account.'
              : 'Sign up to start your shopping journey with us.'}
          </p>
        </div>

        <div className="tab-nav d-flex">
          <button
            onClick={() => switchTab('login')}
            className={`tab-btn flex-fill ${activeTab === 'login' ? 'active' : ''}`}
            disabled={isLoading}
          >
            Login
          </button>
          <button
            onClick={() => switchTab('signup')}
            className={`tab-btn flex-fill ${activeTab === 'signup' ? 'active' : ''}`}
            disabled={isLoading}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === 'signup' && (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name *"
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  disabled={isLoading}
                />
                {errors.fullName && <div className="error-text">{errors.fullName}</div>}
              </div>

              <div className="mb-3">
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Mobile Number *"
                  className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                  disabled={isLoading}
                />
                {errors.mobile && <div className="error-text">{errors.mobile}</div>}
              </div>

              <div className="form-row mb-3 d-flex gap-2">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                  disabled={isLoading}
                >
                  <option value="">Select Gender *</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                  disabled={isLoading}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.gender && <div className="error-text">{errors.gender}</div>}
              {errors.dateOfBirth && <div className="error-text">{errors.dateOfBirth}</div>}
            </>
          )}

          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address *"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              disabled={isLoading}
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password *"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <div className="error-text">{errors.password}</div>}
          </div>

          {activeTab === 'signup' && (
            <div className="mb-4">
              <div className="password-field">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password *"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="password-toggle"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="error-text">{errors.confirmPassword}</div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`btn w-100 ${activeTab === 'login' ? 'btn-primary' : 'btn-warning'}`}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                {activeTab === 'login' ? 'Logging in...' : 'Creating Account...'}
              </>
            ) : (
              activeTab === 'login' ? 'Login' : 'Sign Up'
            )}
          </button>

          <div className="text-center mt-4">
            <span className="text-muted">
              {activeTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (!isLoading) switchTab(activeTab === 'login' ? 'signup' : 'login');
                }}
                className={`link-primary ${isLoading ? 'pe-none' : ''}`}
                style={isLoading ? { opacity: 0.5 } : {}}
              >
                {activeTab === 'login' ? 'Sign Up' : 'Login'}
              </a>
            </span>
          </div>
        </form>
      </div>
    </div></>
  );
};

export default Login;
