import API from './api';

export const getTicketPricing = async () => {
  const response = await API.get('/tickets/');
  return response.data.results ?? response.data; // paginated endpoint
};
