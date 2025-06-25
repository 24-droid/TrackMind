import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import ApplicationList from "../components/ApplicationList";
import AddApplicationForm from "../components/AddApplicationForm";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSignOutAlt,
  FaRedo, 
} from "react-icons/fa"; 

export default function Dashboard() {
  const { user, logout, token } = useAuth();
  console.log(user);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (statusFilter) queryParams.append("status", statusFilter);
      if (sortBy) queryParams.append("sortBy", sortBy);
      if (sortOrder) queryParams.append("sortOrder", sortOrder);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: Object.fromEntries(queryParams.entries()),
      };

      const response = await axios.get("applications", config);
      setApplications(response.data);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      setError(err.response?.data?.message || "Failed to fetch applications");
      toast.error(err.response?.data?.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }, [token, search, statusFilter, sortBy, sortOrder]); 

  
  useEffect(() => {
    if (token) {
      fetchApplications();
    }
  }, [token, fetchApplications]); 

  
  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);
  const handleSortByChange = (e) => setSortBy(e.target.value);
  const handleSortOrderChange = () =>
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

  
  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setSortBy("createdAt"); 
    setSortOrder("desc"); 
   
  };

  
  const handleApplicationAdded = () => {
    setShowAddForm(false);
    fetchApplications();
  };
  const handleApplicationUpdated = () => fetchApplications();
  const handleApplicationDeleted = () => fetchApplications();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Welcome, {user?.fullName?.split(" ")[0] || "User"}! 👋
          </h1>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-red-100 hover:text-red-600 transition-colors duration-200 shadow-sm text-sm"
          >
            <FaSignOutAlt className="text-base" /> Logout
          </button>
        </header>

        
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
         
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md text-base transform hover:-translate-y-0.5"
          >
            <FaPlus className="text-sm" />{" "}
            {showAddForm ? "Hide Form" : "Add New Application"}
          </button>

          
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search title or company..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                aria-label="Search applications"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            
            <div className="relative">
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-800 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors cursor-pointer"
                aria-label="Filter by status"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            
            <div className="relative">
              <select
                value={sortBy}
                onChange={handleSortByChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-800 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors cursor-pointer"
                aria-label="Sort applications by"
              >
                <option value="createdAt">Date Created</option>
                <option value="jobTitle">Job Title</option>
                <option value="company">Company</option>
                <option value="deadline">Deadline</option>
              </select>
              <FaSortAlphaDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            
            <div className="flex gap-2">
              <button
                onClick={handleSortOrderChange}
                className="flex-grow flex items-center justify-center gap-1 bg-gray-100 text-gray-700 px-3 py-2.5 rounded-lg hover:bg-gray-200 transition-colors duration-200 shadow-sm text-sm font-semibold"
                aria-label={
                  sortOrder === "asc" ? "Sort ascending" : "Sort descending"
                }
              >
                {sortOrder === "asc" ? <FaSortAlphaUp /> : <FaSortAlphaDown />}{" "}
                {sortOrder === "asc" ? "Asc" : "Desc"}
              </button>
              <button
                onClick={handleClearFilters}
                className="flex-grow flex items-center justify-center gap-1 bg-gray-100 text-gray-700 px-3 py-2.5 rounded-lg hover:bg-gray-200 transition-colors duration-200 shadow-sm text-sm font-semibold"
                title="Clear all filters and search"
                aria-label="Clear all filters and search"
              >
                <FaRedo /> Clear
              </button>
            </div>
          </div>
        </div>

        
        {showAddForm && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <AddApplicationForm
              onApplicationAdded={handleApplicationAdded}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

       
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b pb-2 border-gray-200">
          Your Applications
        </h2>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <svg
              className="animate-spin h-8 w-8 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="ml-3 text-gray-600 text-lg">Loading applications...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg shadow-sm text-center">
            <p className="font-medium">Error: {error}</p>
            <p className="text-sm mt-1">Please try refreshing the page.</p>
          </div>
        )}

        {!loading && !error && applications.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              No applications found!
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              It looks like you haven't added any job applications yet or your filters are too restrictive.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md text-lg transform hover:-translate-y-0.5"
            >
              <FaPlus /> Add Your First Application
            </button>
          </div>
        )}

        {!loading && !error && applications.length > 0 && (
          <ApplicationList
            applications={applications}
            onApplicationUpdated={handleApplicationUpdated}
            onApplicationDeleted={handleApplicationDeleted}
          />
        )}
      </div>
    </div>
  );
}