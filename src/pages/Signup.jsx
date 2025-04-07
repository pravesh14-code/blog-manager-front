import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, UploadCloud } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import convertToBase64 from '../utils/convertToBase64';
import toast from 'react-hot-toast';
import { RingLoader } from 'react-spinners'; 
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false); 
  const togglePassword = () => setShowPassword((prev) => !prev);

  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const handleImage = async (file) => {
    const base64 = await convertToBase64(file);
    setValue('profile_pic', base64);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (file) await handleImage(file);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) await handleImage(file);
  };

  const onSubmit = async (data) => {
    const payload = {
      full_name: data.fullName,
      email: data.email,
      password: data.password,
      profile_pic: data.profile_pic || undefined,
    };

    setLoading(true); 

    try {
      await registerUser(payload);

      toast.success('Registration Successful \nRedirecting to login...', {
        duration: 1500,
        style: {
          background: '#22c55e',
          color: '#fff',
        },
      });

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      toast.error('Registration Failed \nThere was an issue with your registration. Please try again later.', {
        duration: 3000,
        style: {
          background: '#dc2626',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Create Your <span className="text-yellow-600">BlogNest</span> Account
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Share your stories, ideas, and creativity with the world.
        </p>
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`text-center ${dragActive ? 'border-yellow-500 bg-yellow-50' : 'hover:border-yellow-500'}`}
          >
            <label
              htmlFor="profileImage"
              className="flex flex-col items-center justify-center w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-4 transition"
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
                {profilePreview ? 'Change Image (click or drag)' : 'Upload Profile Picture (click or drag)'}
              </span>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <input type="hidden" {...register('profile_pic')} />
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
          {loading ? (
            <div className="flex justify-center">
              <RingLoader size={40} color="#F59E0B" loading={loading} /> 
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium"
            >
              Sign Up
            </button>
          )}
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{' '}
          <Link to="/" className="text-yellow-600 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
