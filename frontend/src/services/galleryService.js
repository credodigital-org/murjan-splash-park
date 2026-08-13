// import API from './api';

// export const getGalleryImages = async (category) => {
//   const response = await API.get('/gallery/', { params: category ? { category } : {} });
//   return response.data.results ?? response.data; // paginated endpoint
// };

import API from './api';

export const getGalleryImages = async (category) => {
  const response = await API.get('/gallery/', {
    params: category ? { category } : {}
  });

  const images = response.data.results ?? response.data;

  return images.map((item) => ({
    ...item,
    image: optimizeImage(item.image),
  }));
};

function optimizeImage(url) {
  if (!url) return url;

  return url
    .replace(
      '/storage/v1/object/public/',
      '/storage/v1/render/image/public/'
    )
    + '?width=1000&quality=75';
};
