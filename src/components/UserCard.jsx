// src/components/UserCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from './ui/Card';
import Button from './ui/Button';

const UserCard = ({ user, onDelete }) => (
  <Card className="mb-6 p-4 transform transition-transform hover:scale-105 hover:shadow-xl duration-300 rounded-xl bg-white dark:bg-gray-800 shadow-md">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{user.firstName} {user.lastName}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{user.email}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.department}</p>
      </div>
      <div className="flex space-x-3 sm:space-x-0 sm:flex-col sm:space-y-2 mt-3 sm:mt-0">
        <Link to={`/edit/${user.id}`} className="w-full sm:w-auto">
          <Button variant="secondary" size="sm" className="w-full sm:w-auto hover:bg-blue-600 hover:text-white transition-colors">Edit</Button>
        </Link>
        <Button variant="danger" size="sm" onClick={() => onDelete(user.id)} className="w-full sm:w-auto hover:bg-red-700 transition-colors">Delete</Button>
      </div>
    </div>
  </Card>
);

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserCard;
