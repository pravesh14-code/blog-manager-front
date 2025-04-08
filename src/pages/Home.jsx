import React, { useEffect, useState } from 'react';
import { getAllPublicBlogs } from '../api/blogApi';
import TrendingBlog from '../sections/TrendingBlog';
import BlogGridLayout from '../sections/BlogGridLayout';
import { motion } from 'framer-motion';
import { RingLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

const Home = () => {
  const [publicBlogs, setPublicBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await getAllPublicBlogs();
        setPublicBlogs(blogs);
        setLoading(false);
      } catch (err) {
        setError('Failed to load blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <RingLoader color="#f59e0b" size={60} />
    </div>
  );
  if (error) return <div>{error}</div>;

  // Extract the three most liked blogs
  const trendingBlogs = publicBlogs
    .filter(blog => blog.is_public)
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Home | BlogNest</title>
      </Helmet>
      <div className="px-4">
        <TrendingBlog trendingBlogs={trendingBlogs} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="px-4 py-10"
      >
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-gray-600 mb-6">
          Here, we share coding tips, travel guides, and stories that inspire your next adventure.
        </p>

        <BlogGridLayout blogs={publicBlogs} />
      </motion.div>
    </>
  );
};

export default Home;
