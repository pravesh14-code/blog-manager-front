import axios from 'axios';

const IMG_BB_API_KEY = 'e10450a798cf746083bafa754836bb9c';  // Replace this with your ImgBB API Key

/**
 * Upload an image (File) to ImgBB and return the image URL
 * @param {File} file - The image file
 * @returns {Promise<string>} - URL of the uploaded image
 */
const uploadImageToImgBB = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('key', IMG_BB_API_KEY);

  try {
    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data && response.data.data && response.data.data.url) {
      return response.data.data.url;  // Return the hosted image URL
    } else {
      throw new Error('Image upload failed');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;  // Rethrow the error to be handled by the caller
  }
};

export default uploadImageToImgBB;
