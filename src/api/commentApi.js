import axios from 'axios';
import { BASE_API_URL } from './apiConfig';

const API_URL = `${BASE_API_URL}/comments`;

// Get all comments by post ID (public)
export const getCommentsByPost = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// Create a new comment (authenticated user)
export const createComment = async (postId, content, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/${postId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

// Update a comment (authenticated user)
export const updateComment = async (commentId, content, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/${commentId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

// Delete a comment (authenticated user)
export const deleteComment = async (commentId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
