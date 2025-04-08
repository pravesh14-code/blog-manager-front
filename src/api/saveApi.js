// src/api/savedApi.js
import axios from 'axios';
import { BASE_API_URL } from './apiConfig';

const API_URL = `${BASE_API_URL}/saves`;

/**
 * Toggle saved state of a blog post.
 * @param {number} postId 
 * @param {string} token 
 * @returns {Promise<boolean>} true if saved, false if unsaved
 */
export const toggleSave = async (postId, token) => {
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
    return response.data.saved;
  } catch (error) {
    console.error('Error toggling save:', error);
    throw error;
  }
};

/**
 * Get saved posts for the current user
 * @param {string} token 
 */
export const getSavedPosts = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/my-saved`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching saved posts:', error);
    throw error;
  }
};
