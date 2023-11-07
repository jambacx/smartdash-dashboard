import notify from 'react-hot-toast';

/**
 * Show toast message
 * @param type success | error | loading
 * @param message string
 * @example toast('success', 'Hello World')
 * @returns void
 */
export const toast = (
  type: 'success' | 'error' | 'loading',
  message = '',
): void => {
  notify[type](message, {
    position: 'top-center',
  });
};

/**
 * Get the selected date range's month difference
 * @param firstDate Date
 * @param secondDate Date
 * @returns number Month difference
 */
export const getMonthDifference = (
  firstDate?: Date,
  secondDate?: Date,
): number => {
  let diff = (secondDate.getFullYear() - firstDate.getFullYear()) * 12;
  diff += secondDate.getMonth() - firstDate.getMonth();
  return Math.abs(diff);
};
