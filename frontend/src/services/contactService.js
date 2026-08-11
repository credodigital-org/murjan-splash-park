import API from './api';

export const sendContactMessage = async (formData) => {
  const response = await API.post('/contact/', formData);
  return response.data;
};
