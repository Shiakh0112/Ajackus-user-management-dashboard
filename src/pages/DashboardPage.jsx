// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import { useDebounce } from '../hooks/useDebounce';
import { usePagination } from '../hooks/usePagination';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchInput from '../components/ui/SearchInput';
import Pagination from '../components/ui/Pagination';
import UserTable from '../components/UserTable';
import UserList from '../components/UserList';
import { FunnelIcon, Squares2X2Icon, TableCellsIcon, XMarkIcon } from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const { users, loading, error, filters, searchTerm, setFilters, setSearchTerm, deleteUser } = useUsers();
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [showFilters, setShowFilters] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Update search term when it changes (with debounce)
  React.useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  
  // Use pagination hook with filtered users
  const { currentPage, totalPages, paginatedItems, goToPage } = usePagination(users, itemsPerPage);
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  
  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  // Reset to first page when filters or search term change
  React.useEffect(() => {
    goToPage(1);
  }, [filters, searchTerm]);

  // Function to clear all filters and search term
  const handleClearFilters = () => {
    setFilters({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    });
    setSearchTerm('');
  };

  // Check if any filters are applied
  const hasActiveFilters = searchTerm || 
    filters.firstName || 
    filters.lastName || 
    filters.email || 
    filters.department;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your users</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/add">
            <Button>Add User</Button>
          </Link>
        </div>
      </div>
      
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search users..."
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <FunnelIcon className="h-5 w-5 mr-1" />
              Filters
            </Button>
            
            {/* Clear Filters Button - only visible when filters are applied */}
            {hasActiveFilters && (
              <Button
                variant="secondary"
                onClick={handleClearFilters}
                className="flex items-center"
              >
                <XMarkIcon className="h-5 w-5 mr-1" />
                Clear Filters
              </Button>
            )}
            
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 ${viewMode === 'table' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white dark:bg-gray-800'}`}
              >
                <TableCellsIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 ${viewMode === 'card' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white dark:bg-gray-800'}`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={filters.firstName}
                onChange={(e) => handleFilterChange('firstName', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={filters.lastName}
                onChange={(e) => handleFilterChange('lastName', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="text"
                value={filters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department
              </label>
              <input
                type="text"
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
                className="input"
              />
            </div>
          </div>
        )}
      </Card>
      
      <Card>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {viewMode === 'table' ? (
              <UserTable users={paginatedItems} onDelete={handleDelete} />
            ) : (
              <UserList users={paginatedItems} onDelete={handleDelete} />
            )}
            
            {users.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
              />
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default DashboardPage;