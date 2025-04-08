import { Modal } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { useState } from 'react';
import { deleteBlog } from '../api/blogApi';

const DeleteBlog = ({ isOpen, onClose, blogId, onDeleted }) => {
  const token = localStorage.getItem('token');
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);
    try {
      console.log("blogIdtodetelte", blogId);
      await deleteBlog(blogId, token);
      onDeleted?.();
      toast.success('Blog deleted successfully!', {
        duration: 1500,
        style: {
          background: '#22c55e8a',
          color: '#fff',
        },
      });
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete blog. \nPlease try again.', {
        duration: 3000,
        style: {
          background: '#dc2626a6',
          color: '#fff',
        },
      });
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      title={<h2 className="text-lg font-semibold">Delete Your Blog?</h2>}
      centered
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <p className="text-gray-600 text-base py-2">
        Are you sure you want to delete your blog? This action cannot be undone.
      </p>

      <div className="flex justify-end mt-6 gap-4">
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-5 rounded-lg font-semibold transition"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg font-semibold flex items-center justify-center min-w-[100px] transition"
        >
          {isDeleting ? <RingLoader size={20} color="#fff" /> : 'Delete'}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteBlog;
