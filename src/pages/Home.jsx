import React, { useRef } from 'react';
import TopBlog from '../sections/TrendingBlog';
import BlogGridLayout from '../sections/BlogGridLayout';
import { blogs } from '../data/dummyData';
import { motion, useInView } from 'framer-motion';

const Home = () => {
  const publicBlogs = blogs.filter(blog => !blog.isPrivate);

  const blogRef = useRef(null);
  const isInView = useInView(blogRef, { once: true, margin: '-100px' });

  return (
    <>
      <div className="px-4">
        <TopBlog />
      </div>

      <motion.div
        ref={blogRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="px-4 py-10"
      >
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-gray-600 mb-6">
          Here, we share travel tips, destination guides, and stories that inspire your next adventure.
        </p>

        <BlogGridLayout blogs={publicBlogs} />
      </motion.div>
    </>
  );
};

export default Home;
