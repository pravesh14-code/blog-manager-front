const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // remove data URI prefix
        resolve(base64String);
      };
  
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  export default convertToBase64;
  