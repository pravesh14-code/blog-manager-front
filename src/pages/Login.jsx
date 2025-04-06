import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = (data) => {
    console.log('Login submitted:', data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Login to <span className="text-yellow-600">BlogNest</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Access your personal blogs, saved posts, and diary anytime.
        </p>
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Welcome back 👋
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                required: '* Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email address',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1 text-left">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password', {
                  required: '* Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute top-2.5 right-3 text-gray-500 hover:text-yellow-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1 text-left">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-yellow-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
