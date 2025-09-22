import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const { theme } = useTheme();

  const baseClasses = `px-4 py-2 rounded-md font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2`;
  
  const variantClasses = {
    primary: theme === 'dark' 
      ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500' 
      : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
    secondary: theme === 'dark' 
      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-500' 
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300',
    danger: theme === 'dark' 
      ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500' 
      : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  className: PropTypes.string,
};

export default Button;
