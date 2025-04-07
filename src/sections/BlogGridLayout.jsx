import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import BlogCard from '../components/BlogCard';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 

const BlogGridLayout = ({ blogs }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(0);
  const blogsPerPage = 6;

  const uniqueCategories = ['All', ...Array.from(new Set(blogs.map(blog => blog.category)))];

  const filteredBlogs = blogs
    .filter((blog) =>
      (blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.content.toLowerCase().includes(search.toLowerCase())) &&
      (category === 'All' || blog.category === category)
    )
    .sort((a, b) =>
      sort === 'Newest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  const pageCount = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = currentPage * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setCurrentPage(0);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="container mx-auto"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex justify-center sm:justify-start">
            <Link
              to="/blog-management"
              className="bg-yellow-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Blog
            </Link>
          </div>

          <input
            type="text"
            placeholder="Search blog..."
            value={search}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex justify-end sm:justify-start items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto mb-8 scrollbar-hide">
        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`text-sm font-medium px-4 py-1 rounded-full border transition ${
              category === cat
                ? 'bg-yellow-600 text-white'
                : 'text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {currentBlogs.length === 0 ? (
        <div className="text-center text-gray-600 font-medium py-10">
          You don't have any blogs on this page
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel="← Prev"
          nextLabel="Next →"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center items-center gap-2"
          pageClassName="px-3 py-1 border rounded"
          activeClassName="bg-yellow-600 text-white"
          previousClassName="px-3 py-1 border rounded"
          nextClassName="px-3 py-1 border rounded"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      )}
    </motion.div>
  );
};

export default BlogGridLayout;
