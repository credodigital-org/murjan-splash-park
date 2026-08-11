import API from './api';

export const getSiteSettings = async () => {
  const response = await API.get('/settings/');
  return response.data;
};

export const getHomeData = async () => {
  const response = await API.get('/home/');
  return response.data; // single aggregate call: hero, settings, banner, features, gallery, testimonials, blog, pricing
};

export const getWorkingHours = async () => {
  const response = await API.get('/settings/working-hours/');
  return response.data.results ?? response.data; // paginated endpoint
};

export const getPageSEO = async (pageSlug) => {
  const response = await API.get(`/settings/seo/${pageSlug}/`);
  return response.data;
};
