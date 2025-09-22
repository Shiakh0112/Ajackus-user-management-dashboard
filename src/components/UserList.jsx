// src/components/UserList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';

const UserList = ({ users, onDelete }) => {
  if (!users.length) return <div className="text-center py-12"><p className="text-gray-500 dark:text-gray-400">No users found</p></div>;

  return <div className="space-y-4">{users.map(user => <UserCard key={user.id} user={user} onDelete={onDelete} />)}</div>;
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserList;
