import API from './api';

export const getBlogs = async () => {
  const response = await API.get('/blog/');
  return response.data.results ?? response.data; // paginated endpoint
};

export const getBlogPost = async (slug) => {
  const response = await API.get(`/blog/${slug}/`);
  return response.data;
};
