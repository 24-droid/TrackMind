
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 
import axios from '../api/axios'; 
import ApplicationList from '../components/ApplicationList'; 
import AddApplicationForm from '../components/AddApplicationForm';
import { toast } from 'react-toastify'; 

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
            toast.error("Failed to load applications.");
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
                <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <p className="text-gray-600 text-lg mb-4">You haven't added any applications yet!</p>
                    <p className="text-gray-500 mb-6">
                        Start tracking your job search by adding your first application.
                    </p>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-lg font-medium"
                    >
                        + Add Your First Application
                    </button>
                </div>
            )}
            {!loading && !error && applications.length > 0 && (
                <ApplicationList applications={applications} onApplicationUpdated={fetchApplications} onApplicationDeleted={fetchApplications} />
            )}
        </div>
    );
}