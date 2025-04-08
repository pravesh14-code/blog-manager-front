import axios from 'axios';

const API_URL = 'http://localhost:5000/api/likes';

/**
 * Toggle the like status of a post.
 * @param {number} postId - The ID of the post to like/unlike.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<boolean>} - Returns true if liked, false if unliked.
 */
export const toggleLike = async (postId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/${postId}/toggle`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.liked;
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};
