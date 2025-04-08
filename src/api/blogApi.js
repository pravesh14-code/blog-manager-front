import axios from 'axios';
import { BASE_API_URL } from './apiConfig';

const API_URL = `${BASE_API_URL}/blogs`;

// Fetch all public blogs
export const getAllPublicBlogs = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching public blogs:', error);
        throw error;
    }
};

// Fetch all private blogs (for the logged-in user)
// Add the token for authentication
export const getAllPrivateBlogs = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/private`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching private blogs:', error);
        throw error;
    }
};

// Fetch all saved blogs (for the logged-in user)
export const getAllSavedBlogs = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/saved`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching saved blogs:', error);
        throw error;
    }
};


// Fetch all my blogs (for the logged-in user)
export const getMyBlogs = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/myblog`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching saved blogs:', error);
        throw error;
    }
};

// Create a new blog (for the logged-in user)
export const createBlog = async (blogData, token) => {
    try {
        const response = await axios.post(API_URL, blogData, {
            headers: {
                Authorization: `Bearer ${token}`, // Add token for authentication
            },
        });
        return response.data; // Return the created blog data
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
};

// Blog Latest Details
export const getById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching blog by ID:', error);
        throw error;
    }
};

// Update Blog (for the logged-in user)
export const updateBlog = async (id, blogData, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, blogData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating blog:', error);
        throw error;
    }
};

// Delete Blog (for the logged-in user)
export const deleteBlog = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
};

