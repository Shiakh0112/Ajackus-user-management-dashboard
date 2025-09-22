import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';

const Input = ({ className = '', ...props }) => {
  const { theme } = useTheme();

  return (
    <input
      className={`w-full px-3 py-2 rounded-md border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        theme === 'dark'
          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
      } ${className}`}
      {...props}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
};

export default Input;
