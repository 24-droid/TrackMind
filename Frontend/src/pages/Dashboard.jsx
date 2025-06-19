
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 
import axios from '../api/axios'; 
import ApplicationList from '../components/ApplicationList'; 
import AddApplicationForm from '../components/AddApplicationForm'; 

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false); 

    const fetchApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('/applications');
            setApplications(res.data);
        } catch (err) {
            console.error("Failed to fetch applications:", err);
            setError(err.response?.data?.message || "Failed to load applications.");
            if (err.response && err.response.status === 401) {
                logout(); 
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []); 

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Welcome, {user?.fullName || 'User'}!</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            <div className="mb-6">
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {showAddForm ? 'Hide Form' : 'Add New Application'}
                </button>
                {showAddForm && (
                    <div className="mt-4 p-4 border rounded-md shadow-md">
                        <AddApplicationForm onApplicationAdded={fetchApplications} onCancel={() => setShowAddForm(false)} />
                    </div>
                )}
            </div>

            <h2 className="text-2xl font-semibold mb-4">Your Applications</h2>
            {loading && <p>Loading applications...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && applications.length === 0 && (
                <p>No applications found. Add one to get started!</p>
            )}
            {!loading && !error && applications.length > 0 && (
                <ApplicationList applications={applications} onApplicationUpdated={fetchApplications} onApplicationDeleted={fetchApplications} />
            )}
        </div>
    );
}