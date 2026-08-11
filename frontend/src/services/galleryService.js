import API from './api';

export const getGalleryImages = async (category) => {
  const response = await API.get('/gallery/', { params: category ? { category } : {} });
  return response.data.results ?? response.data; // paginated endpoint
};
