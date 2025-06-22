import React,{useState} from 'react';
import axios from '../api/axios'; 
import { useAuth } from '../context/AuthContext'; 
import EditApplicationForm from './EditApplicationForm';
import { toast } from 'react-toastify';

export default function ApplicationList({ applications, onApplicationUpdated, onApplicationDeleted }) {
    const { logout } = useAuth();
    const [editingApplication, setEditingApplication] = useState(null); 
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const handleDelete = async (appId) => {
        if (window.confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
            try {
                await axios.delete(`/applications/${appId}`);
                console.log(`Application with ID ${appId} deleted successfully.`);
                toast.success("Application deleted successfully!");
                onApplicationDeleted(); 
            } catch (err) {
                console.error("Error deleting application:", err);
                toast.error(err.response?.data?.message || "Failed to delete application.");
                if (err.response && err.response.status === 401) {
                    logout(); 
                }
            }
        }
    };
    const handleEditClick = (app) => {
        setEditingApplication(app); 
    };

    const handleEditFormClose = () => {
        setEditingApplication(null); 
    };

    const handleApplicationEdited = () => {
        handleEditFormClose(); 
        onApplicationUpdated(); 
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Job Title</th>
                        <th className="py-3 px-6 text-left">Company</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-left">Deadline</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                    {applications.map((app) => (
                        <tr key={app._id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-6 text-left whitespace-nowrap">{app.jobTitle}</td>
                            <td className="py-3 px-6 text-left">{app.company}</td>
                            <td className="py-3 px-6 text-left">
                                <span className={`py-1 px-3 rounded-full text-xs font-semibold
                                    ${app.status === 'Applied' ? 'bg-blue-200 text-blue-800' : ''}
                                    ${app.status === 'Interviewing' ? 'bg-purple-200 text-purple-800' : ''}
                                    ${app.status === 'Offer' ? 'bg-green-200 text-green-800' : ''}
                                    ${app.status === 'Rejected' ? 'bg-red-200 text-red-800' : ''}
                                    ${app.status === 'Accepted' ? 'bg-teal-200 text-teal-800' : ''}
                                    ${app.status === 'Withdrawn' ? 'bg-yellow-200 text-yellow-800' : ''}
                                `}>
                                    {app.status}
                                </span>
                            </td>
                            <td className="py-3 px-6 text-left">{formatDate(app.deadline)}</td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center space-x-2">
                                   
                                    <button
                                        onClick={() => handleEditClick(app)} 
                                        className="bg-yellow-500 text-white p-2 rounded text-xs hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(app._id)} 
                                        className="bg-red-500 text-white p-2 rounded text-xs hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingApplication && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
                        <button
                            onClick={handleEditFormClose}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                        >
                            &times;
                        </button>
                        <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-4 sm:p-6">
                        <div className="max-w-2xl mx-auto bg-white rounded-md shadow-md p-4 sm:p-6">
                        <h3 className="text-xl font-semibold mb-4">Edit Application</h3>
                        <EditApplicationForm
                            application={editingApplication}
                            onApplicationUpdated={handleApplicationEdited}
                            onCancel={handleEditFormClose}
                        />
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}