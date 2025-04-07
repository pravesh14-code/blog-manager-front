import axios from 'axios';

const API_URL = 'http://localhost:5000/api/blogs';

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