import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Switch } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { blogs } from '../data/dummyData';

const categories = ['Technology', 'Travel', 'Health', 'Diary', 'Productivity'];

const BlogManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const blogToEdit = editing ? blogs.find(blog => blog.id === id) : null;

  const [imagePreview, setImagePreview] = useState(blogToEdit?.image || '');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: blogToEdit?.title || '',
      content: blogToEdit?.content || '',
      category: blogToEdit?.category || 'Technology',
      isPrivate: blogToEdit?.isPrivate || false
    }
  });

  useEffect(() => {
    if (blogToEdit?.image) setValue('image', blogToEdit.image);
  }, [blogToEdit, setValue]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setValue('image', imageURL);
    }
  }, [setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }
  });

  const isPrivateValue = watch('isPrivate');

  const onSubmit = (data) => {
    const finalData = { ...data, image: imagePreview };
    if (editing) {
      const index = blogs.findIndex(blog => blog.id === id);
      blogs[index] = { ...blogs[index], ...finalData };
      console.log('Updated blog:', blogs[index]);
    } else {
      blogs.push({ ...finalData, id: `b${blogs.length + 1}`, authorId: 1, likes: [], comments: [], createdAt: new Date().toISOString() });
      console.log('Created new blog:', finalData);
    }
    navigate('/');
  };

  const handleDeleteBlog = () => {
    if (editing) {
      const index = blogs.findIndex(blog => blog.id === id);
      blogs.splice(index, 1);
      console.log('Deleted blog with id:', id);
      navigate('/');
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-xl font-medium text-center mb-8">
        {editing ? 'Update Blog Post' : 'Create a New Blog Post'}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-full bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="flex items-center justify-center min-h-[28rem]">
          <div className="w-full">
            <label className="block text-sm font-medium mb-2 text-left">Upload Image</label>
            <div
              {...getRootProps()}
              className={`relative w-full h-96 border-2 border-dashed rounded-lg flex items-center justify-center text-center cursor-pointer transition overflow-hidden ${isDragActive ? 'border-yellow-600 bg-yellow-50' : 'border-gray-300'
                }`}
            >
              <input {...getInputProps()} />
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-contain z-0 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview('')}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center z-10"
                    title="Remove image"
                  >✕</button>
                </>
              ) : (
                <p className="text-gray-500 z-10">Drag & drop an image here, or click to select</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-6 w-full relative">
          <div className="absolute top-0 right-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Private Blog</span>
              <Switch
                checked={isPrivateValue}
                onChange={(checked) => setValue('isPrivate', checked)}
                className="bg-gray-300"
                style={{ backgroundColor: isPrivateValue ? '#ca8a04' : undefined }}
              />
            </div>
          </div>

          <div className="pt-8">
            <label className="block text-sm font-medium mb-1 text-left">Category</label>
            <select
              {...register('category')}
              className="w-full border border-gray-300 p-3 rounded focus:ring-yellow-600 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-left">Title</label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full border border-gray-300 p-3 rounded focus:ring-yellow-600 focus:outline-none"
              placeholder="Enter a catchy blog title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div className="flex flex-col grow">
            <label className="block text-sm font-medium mb-1 text-left">Content</label>
            <textarea
              {...register('content', { required: 'Content is required' })}
              className="w-full border border-gray-300 p-3 rounded min-h-[10rem] resize-y focus:ring-yellow-600 focus:outline-none"
              placeholder="Write your blog content here..."
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end pt-4">
          <div className="flex gap-4 ml-auto">
            {editing && (
              <button
                type="button"
                onClick={handleDeleteBlog}
                className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition"
              >
                Delete Blog
              </button>
            )}
            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-lg font-semibold transition"
            >
              {editing ? 'Update Blog' : 'Publish Blog'}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default BlogManagement;
