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
 * @example getMonthDifference(new Date(yesterday), new Date(today))
 * @returns number Month difference
 */
export const getMonthDifference = (
  firstDate: Date,
  secondDate: Date,
): number => {
  let diff = (secondDate.getFullYear() - firstDate.getFullYear()) * 12;
  diff += secondDate.getMonth() - firstDate.getMonth();
  return Math.abs(diff);
};

/**
 * Truncates a text by a specified number of words.
 *
 * @param {string} text - The original text to be truncated.
 * @param {number} maxWords - The maximum number of words to allow in the truncated text.
 * @example truncateTextByWord('Long text here', 1)
 * @returns {string} The truncated text.
 */
export const truncateTextByWord = (text: string, maxWords: number): string => {
  const words = text.split(' ');

  return words.length > maxWords
    ? words.slice(0, maxWords).join(' ') + '...'
    : text;
};
