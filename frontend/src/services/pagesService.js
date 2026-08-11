import API from './api';

export const getPage = async (slug) => {
  const response = await API.get(`/pages/${slug}/`);
  return response.data;
};
