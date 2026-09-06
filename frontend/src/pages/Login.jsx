import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoIcon from '../image/icon.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">

      <div className="w-full max-w-[510px] bg-white rounded-[18px] px-[50px] py-[52px] shadow-sm">

        {/* Top Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-[52px] h-[52px] bg-[#6366F1] rounded-[12px] flex items-center justify-center">
            <img
              src={logoIcon}
              alt="SkillNest"
              className="w-[30px] h-[30px]"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-[26px] font-bold text-[#0F172A] mb-1">
            Welcome back
          </h1>

          <p className="text-[15px] text-[#64748B]">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-[13px] font-semibold text-[#0F172A] mb-2">
              Email Address
            </label>

            <div className="relative">
              {/* Email Icon */}
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#64748B]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />
                <path d="m3 7 9 6 9-6" />
              </svg>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full h-[48px] border border-[#E2E8F0] rounded-[7px] pl-[42px] pr-4 text-[14px] text-[#334155] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[13px] font-semibold text-[#0F172A]">
                Password
              </label>

              <button
                type="button"
                className="text-[12px] font-medium text-[#6366F1] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              {/* Lock Icon */}
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#64748B]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  x="4"
                  y="10"
                  width="16"
                  height="11"
                  rx="2"
                />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full h-[48px] border border-[#E2E8F0] rounded-[7px] pl-[42px] pr-4 text-[14px] text-[#334155] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[48px] bg-[#6366F1] text-white rounded-[7px] text-[14px] font-semibold hover:bg-[#5558E8] transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Register */}
        <p className="text-center mt-7 text-[14px] text-[#475569]">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-[#6366F1] font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;