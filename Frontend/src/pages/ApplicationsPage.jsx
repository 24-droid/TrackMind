import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import ApplicationList from "../components/ApplicationList";
import AddApplicationForm from "../components/AddApplicationForm";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  HiPlus,
  HiSearch,
  HiFilter,
  HiSortAscending,
  HiSortDescending,
  HiLogout,
  HiRefresh,
} from "react-icons/hi"; 

export default function ApplicationsPage() {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchApplications = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (statusFilter) queryParams.append("status", statusFilter);
      if (sortBy) queryParams.append("sortBy", sortBy);
      if (sortOrder) queryParams.append("sortOrder", sortOrder);
      
      const response = await axios.get("applications", {
        params: Object.fromEntries(queryParams.entries()),
      });
      
      setApplications(response.data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Session expired. Please log in again.");
        logout();
        navigate("/login");
      } else {
        setError(error.response?.data?.message || "Failed to fetch applications");
      }
    } finally {
      setLoading(false);
    }
  }, [user, search, statusFilter, sortBy, sortOrder, logout, navigate]); 

  useEffect(() => {
    if (user && !authLoading) {
      fetchApplications();
    }
  }, [user, authLoading, fetchApplications]); 

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

  if (authLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-50 z-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-sky-500/10 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

      <main className="container mx-auto px-4 pt-28 pb-20 max-w-7xl">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">
              Hello, <span className="gradient-text">{user?.fullName?.split(" ")[0] || "Tracker"}</span>!
            </h1>
            <p className="text-slate-600 text-lg">You have {applications.length} active applications under review.</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary flex items-center gap-2 group"
          >
            <HiPlus className={`w-5 h-5 transition-transform duration-300 ${showAddForm ? 'rotate-45' : ''}`} />
            {showAddForm ? "Close Form" : "Add Application"}
          </button>
        </header>

        {/* Toolbar */}
        <div className="glass p-4 rounded-2xl mb-10 flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="relative group">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 transition-colors" />
              <input
                type="text"
                placeholder="Search company..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 transition-all text-sm"
              />
            </div>

            <div className="relative group">
              <HiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 transition-colors" />
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="w-full pl-12 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 appearance-none text-sm cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="relative group">
              <HiSortAscending className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 transition-colors" />
              <select
                value={sortBy}
                onChange={handleSortByChange}
                className="w-full pl-12 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 appearance-none text-sm cursor-pointer"
              >
                <option value="createdAt">Date Created</option>
                <option value="jobTitle">Job Title</option>
                <option value="company">Company</option>
                <option value="deadline">Deadline</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSortOrderChange}
                className="flex-1 flex items-center justify-center gap-2 bg-white/70 border border-slate-200 rounded-xl hover:border-slate-300 transition-all text-sm font-bold"
              >
                {sortOrder === "asc" ? <HiSortAscending className="w-5 h-5 text-sky-400" /> : <HiSortDescending className="w-5 h-5 text-sky-400" />}
                {sortOrder.toUpperCase()}
              </button>
              <button
                onClick={handleClearFilters}
                className="p-3 bg-white/70 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all group"
                title="Reset Filters"
              >
                <HiRefresh className="w-5 h-5 text-slate-600 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Add Form with Animation */}
        {showAddForm && (
          <div className="mb-12 animate-slide-down">
            <div className="glass p-8 rounded-3xl border-sky-500/20">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
                New Application Details
              </h3>
              <AddApplicationForm
                onApplicationAdded={handleApplicationAdded}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          </div>
        )}

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
            <p className="text-slate-600 font-medium animate-pulse">Synchronizing applications...</p>
          </div>
        ) : error ? (
          <div className="glass p-8 rounded-3xl border-rose-500/20 text-center">
            <p className="text-rose-400 font-bold mb-2">Sync Error Detected</p>
            <p className="text-slate-600 text-sm">{error}</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="glass p-20 rounded-[3rem] text-center border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6">
              <HiSearch className="w-10 h-10 text-slate-700" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No matching records found</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Ready to start your journey? Add your first job application and we'll help you track it to the finish line.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              Initialize First Entry
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <ApplicationList
              applications={applications}
              onApplicationUpdated={fetchApplications}
              onApplicationDeleted={fetchApplications}
            />
          </div>
        )}
      </main>
    </div>
  );
}