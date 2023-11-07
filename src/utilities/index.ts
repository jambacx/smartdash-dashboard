import notify from 'react-hot-toast';

export const toast = (type: 'success' | 'error' | 'loading', message = '') =>
  notify[type](message);
