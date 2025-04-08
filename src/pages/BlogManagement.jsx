import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Switch } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { createBlog, getById, updateBlog } from '../api/blogApi';
import toast from 'react-hot-toast';
import uploadImageToImgBB from '../utils/uploadImageToImgBb';
import { RingLoader } from 'react-spinners';
import DeleteBlog from '../components/DeleteBlog';
import { Helmet } from 'react-helmet';

const categories = ['Coding', 'Technology', 'Travel', 'Lifestyle'];

const BlogManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(editing);
  const [submitting, setSubmitting] = useState(false); // For Create/Update
  const [initialValues, setInitialValues] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasFetched = useRef(false);
  const [updateMediaId, setUpdateMediaId] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isPublic: false,
      title: '',
      content: '',
      category: categories[0],
    },
  });

  const watchedValues = useWatch({
    control,
    name: ['title', 'content', 'category', 'isPublic'],
  });

  useEffect(() => {
    if (editing && !hasFetched.current) {
      hasFetched.current = true;

      const fetchBlog = async () => {
        try {
          setLoading(true);
          const blogData = await getById(id);
          const initial = {
            title: blogData.title,
            content: blogData.content,
            category: blogData.category,
            isPublic: !blogData.is_public,
          };
          setInitialValues(initial);
          setValue('title', initial.title);
          setValue('content', initial.content);
          setValue('category', initial.category);
          setValue('isPublic', initial.isPublic);
          if (blogData.media?.length) {
            setImagePreview(blogData.media[0].media_data);
            setUpdateMediaId(blogData.media[0].id);
          }
        } catch {
          toast.error('Failed to load blog. \nPlease try again later', {
            duration: 3000,
            style: {
              background: '#dc2626a6',
              color: '#fff',
            },
          });
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [editing, id, setValue]);

  useEffect(() => {
    if (!initialValues) return;
    const [title, content, category, isPublic] = watchedValues;

    const isChanged =
      title !== initialValues.title ||
      content !== initialValues.content ||
      category !== initialValues.category ||
      isPublic !== initialValues.isPublic ||
      imageFile !== null;

    setIsFormChanged(isChanged);
  }, [watchedValues, initialValues, imageFile]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setImageFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: { 'image/*': [] },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (imageFile) {
        const hostedImageURL = await uploadImageToImgBB(imageFile);
        const mediaType = imageFile.type;
      
        data.media = [{
          media_data: hostedImageURL,
          media_type: mediaType,
          ...(editing && updateMediaId && { id: updateMediaId }), 
        }];
      }

      data.is_public = !watchedValues[3];
      delete data.isPublic;

      const token = localStorage.getItem('token');
      console.log("Final blog data sent to API:", data);

      if (editing) {
        await updateBlog(id, data, token);
        toast.success('Blog updated successfully! \nRedirecting to your dashboard...', {
          duration: 1500,
          style: {
            background: '#22c55e8a',
            color: '#fff',
          },
        });
        setTimeout(() => navigate('/home'), 1500);
      } else {
        console.log ("data", data);
        console.log ("token", token);
        await createBlog(data, token);
        toast.success('Blog created successfully \nRedirecting to your dashboard...', {
          duration: 1500,
          style: {
            background: '#22c55e8a',
            color: '#fff',
          },
        });
        setTimeout(() => navigate('/home'), 1500);
      }
    } catch {
      toast.error('Failed to manage blog! \nPlease try again later.', {
        duration: 3000,
        style: {
          background: '#dc2626a6',
          color: '#fff',
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (loading && editing) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <RingLoader color="#f59e0b" size={60} />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog Manager | BlogNest</title>
      </Helmet>
      <div className="w-full px-4 py-6">
        <h1 className="text-xl font-medium text-center mb-3">
          {editing ? 'Update Blog Post' : 'Create a New Blog Post'}
        </h1>
        <p className="text-base text-yellow-500 text-center mb-3">Turn your ideas into stories, and your stories into something even greater.</p>
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
                      onClick={() => {
                        setImagePreview('');
                        setImageFile(null);
                      }}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center z-10"
                    >
                      ✕
                    </button>
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
                  checked={watchedValues[3]}
                  onChange={(checked) => setValue('isPublic', checked)}
                  className="bg-gray-300"
                  style={{ backgroundColor: watchedValues[3] ? '#ca8a04' : undefined }}
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
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-left">Title</label>
              <input
                type="text"
                {...register('title', { required: '* Title is required' })}
                className="w-full border border-gray-300 p-3 rounded focus:ring-yellow-600 focus:outline-none"
                placeholder="Enter a catchy blog title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1 text-left">{errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col grow">
              <label className="block text-sm font-medium mb-1 text-left">Content</label>
              <textarea
                {...register('content', { required: '* Content is required' })}
                className="w-full border border-gray-300 p-3 rounded min-h-[10rem] resize-y focus:ring-yellow-600 focus:outline-none"
                placeholder="Write your blog content here..."
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1 text-left">{errors.content.message}</p>
              )}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end pt-4">
            <div className="flex gap-4 ml-auto">
              {editing && (
                <>
                  <button
                    type="button"
                    onClick={handleDeleteClick}
                    className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition"
                  >
                    Delete
                  </button>
                  <DeleteBlog
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    blogId={id} 
                  />
                </>
              )}

              <button
                type="submit"
                disabled={(editing && !isFormChanged) || submitting}
                className={`py-3 px-6 rounded-lg font-semibold transition ml-auto ${(editing && !isFormChanged) || submitting
                  ? 'bg-gray-300 cursor-not-allowed text-white'
                  : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  }`}
              >
                {submitting ? (
                  <div className="flex justify-center items-center">
                    <RingLoader color="#fff" loading={true} size={20} />
                  </div>
                ) : (
                  editing ? 'Update Blog' : 'Publish Blog'
                )}
              </button>

            </div>
          </div>
        </form>
      </div>
    </>

  );
};

export default BlogManagement;