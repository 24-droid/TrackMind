import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import ApplicationList from "../components/ApplicationList";
import AddApplicationForm from "../components/AddApplicationForm";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { user, logout, token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchApplications = async () => {
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
  };

  useEffect(() => {
    if (token) fetchApplications();
  }, [user, token, search, statusFilter, sortBy, sortOrder]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);
  const handleSortByChange = (e) => setSortBy(e.target.value);
  const handleSortOrderChange = () => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

  const handleApplicationAdded = () => {
    setShowAddForm(false);
    fetchApplications();
  };
  const handleApplicationUpdated = () => fetchApplications();
  const handleApplicationDeleted = () => fetchApplications();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.fullName || "User"} 👋
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search title or company"
          value={search}
          onChange={handleSearchChange}
          className="p-2 border rounded-md bg-gray-100"
        />
        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="p-2 border rounded-md bg-gray-100"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Withdrawn">Withdrawn</option>
        </select>
        <select
          value={sortBy}
          onChange={handleSortByChange}
          className="p-2 border rounded-md bg-gray-100"
        >
          <option value="createdAt">Date Created</option>
          <option value="jobTitle">Job Title</option>
          <option value="company">Company</option>
          <option value="deadline">Deadline</option>
        </select>
        <button
          onClick={handleSortOrderChange}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {sortOrder === "asc" ? "Ascending ↑" : "Descending ↓"}
        </button>
      </div>

      {/* Add Form Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          {showAddForm ? "Hide Form" : "+ Add New Application"}
        </button>
        {showAddForm && (
          <div className="mt-4 bg-white p-6 rounded-md shadow-lg">
            <AddApplicationForm
              onApplicationAdded={handleApplicationAdded}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}
      </div>

      {/* Applications */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Applications</h2>

      {loading && <p className="text-gray-600">Loading applications...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && applications.length === 0 && (
        <div className="bg-yellow-50 text-center p-8 rounded-md border border-yellow-300 shadow-sm">
          <p className="text-lg text-gray-700 mb-3">
            You haven’t added any applications yet!
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Start by tracking your job search progress now.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
          >
            + Add First Application
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
  );
}
