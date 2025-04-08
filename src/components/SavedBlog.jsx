import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { toggleSave } from '../api/saveApi';

const SavedBlog = ({ postId, initialSaved }) => {
  const [saved, setSaved] = useState(initialSaved);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSaveClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isProcessing) return;

    const token = localStorage.getItem('token');
    setIsProcessing(true);

    // Optimistic update
    const prevSaved = saved;
    setSaved(!saved);

    try {
      const newSaved = await toggleSave(postId, token);
      setSaved(newSaved);
    } catch (error) {
      setSaved(prevSaved); // Revert if failed
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleSaveClick}
      className={`flex items-center gap-1 text-sm ${saved ? 'text-yellow-600' : 'hover:text-yellow-600'}`}
      disabled={isProcessing}
    >
      <Bookmark fill={saved ? 'currentColor' : 'none'} className="w-5 h-5" />
      {saved ? 'Saved' : 'Save'}
    </button>
  );
};

export default SavedBlog;
