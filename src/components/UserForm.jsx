// src/components/UserForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from './ui/Input';
import Button from './ui/Button';
import { validateEmail } from '../utils/validators';

const UserForm = ({ user, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    department: user?.department || '',
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (validateForm()) onSubmit(formData); };

  return (
    <form onSubmit={handleSubmit}>
      {['firstName','lastName','email','department'].map(field => (
        <div className="mb-4" key={field}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <Input
            type={field === 'email' ? 'email' : 'text'}
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className={errors[field] ? 'border-red-500' : ''}
          />
          {errors[field] && <p className="mt-1 text-sm text-red-600">{errors[field]}</p>}
        </div>
      ))}
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="primary" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  );
};

export default UserForm;
