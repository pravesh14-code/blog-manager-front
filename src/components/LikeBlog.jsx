import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { toggleLike } from '../api/likeApi';

const LikeBlog = ({
  postId,
  initialLiked,
  initialLikeCount,
  onLikeToggle,
  variant = 'card' // Default styling is for cards
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isProcessing) return;

    setIsProcessing(true);
    // Optimistically update UI
    const prevLiked = liked;
    const prevCount = likeCount;

    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => newLiked ? prev + 1 : prev - 1);

    const token = localStorage.getItem('token');

    try {
      await toggleLike(postId, token); // no need to wait for response value
      if (onLikeToggle) {
        onLikeToggle(newLiked, newLiked ? prevCount + 1 : prevCount - 1);
      }
    } catch (err) {
      setLiked(prevLiked);
      setLikeCount(prevCount);
      console.error('Failed to toggle like:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const buttonStyle =
    variant === 'details'
      ? `flex items-center gap-2 text-sm font-medium ${liked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`
      : `flex items-center gap-1 ${liked ? 'text-red-600' : 'hover:text-red-600'}`;

  return (
    <button
      onClick={handleLikeClick}
      className={buttonStyle}
      disabled={isProcessing}
    >
      <Heart className={variant === 'details' ? 'w-5 h-5' : 'w-4 h-4'} fill={liked ? 'currentColor' : 'none'} />
      <span>{likeCount}</span>
      {likeCount > 0 && (
        <>
          {variant === 'details' && (
            <span>{likeCount === 1 ? 'Like' : 'Likes'}</span>
          )}
        </>
      )}
    </button>

  );
};

export default LikeBlog;
