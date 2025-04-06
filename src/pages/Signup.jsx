import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = (data) => {
    console.log('Signed up with:', data);
    // Submit user data
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('profileImage', file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Title */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Create Your <span className="text-yellow-600">BlogNest</span> Account
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Share your stories, ideas, and creativity with the world.
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Profile Image Upload */}
          <div className="text-center">
            <label
              htmlFor="profileImage"
              className="flex flex-col items-center justify-center w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-yellow-500 transition"
            >
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
              ) : (
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
              )}
              <span className="text-sm text-gray-500">
                {profilePreview ? 'Change Image' : 'Upload Profile Picture'}
              </span>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register('fullName', {
                required: '* Full name is required',
                minLength: {
                  value: 3,
                  message: 'Full name must be at least 3 characters',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
            />
            {errors.fullName && (
              <p className="text-sm text-red-600 mt-1 text-left">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Email Address
            </label>
            <input
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Password
            </label>
            <div className="relative">
              <input
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-600 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
