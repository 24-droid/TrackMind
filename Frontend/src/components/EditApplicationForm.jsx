
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext'; 
import { toast } from 'react-toastify';

export default function EditApplicationForm({ application, onApplicationUpdated, onCancel }) {
    const { logout } = useAuth();
    const [formData, setFormData] = useState({
        jobTitle: '',
        company: '',
        status: 'Applied',
        deadline: '',
        applicationLink: '',
        notes: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        if (application) {
            setFormData({
                jobTitle: application.jobTitle || '',
                company: application.company || '',
                status: application.status || 'Applied',
                deadline: application.deadline ? new Date(application.deadline).toISOString().split('T')[0] : '', // Format for date input
                applicationLink: application.applicationLink || '',
                notes: application.notes || '',
            });
        }
    }, [application]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
           
            const res = await axios.put(`/applications/${application._id}`, formData);
            console.log('Application updated:', res.data);
            toast.success("Application updated successfully!");
            onApplicationUpdated(); 
        } catch (err) {
            console.error('Error updating application:', err);
            setError(err.response?.data?.message || 'Failed to update application.');
            toast.error(err.response?.data?.message || 'Failed to update application.'); 
            if (err.response && err.response.status === 401) {
                logout(); 
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                    type="text"
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Offer">Offer</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Withdrawn">Withdrawn</option>
                </select>
            </div>
            <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                <input
                    type="date"
                    id="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label htmlFor="applicationLink" className="block text-sm font-medium text-gray-700">Application Link</label>
                <input
                    type="url"
                    id="applicationLink"
                    value={formData.applicationLink}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="e.g., https://example.com/job"
                />
            </div>
            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Application'}
                </button>
            </div>
        </form>
    );
}