import React, { useState } from 'react';
import axios from '../api/axios'; 
import { useAuth } from '../context/AuthContext'; 
import EditApplicationForm from './EditApplicationForm';
import { toast } from 'react-toastify';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineCalendar, HiOutlineOfficeBuilding } from 'react-icons/hi';

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
                toast.success("Application removed successfully.");
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

    const statusStyles = {
        'Applied': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        'Pending': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        'Interviewing': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        'Accepted': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'Rejected': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        'Withdrawn': 'bg-slate-500/10 text-slate-600 border-slate-500/20',
    };

    return (
        <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-separate border-spacing-y-3">
                <thead>
                    <tr className="text-slate-600 text-xs uppercase tracking-widest font-bold">
                        <th className="px-6 py-4">Position & Company</th>
                        <th className="px-6 py-4">Current Status</th>
                        <th className="px-6 py-4">Deadline</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm font-medium">
                    {applications.map((app) => (
                        <tr key={app._id} className="glass group hover:bg-white/[0.03] transition-all duration-300">
                            <td className="px-6 py-5 rounded-l-2xl">
                                <div className="flex flex-col">
                                    <span className="text-slate-900 text-lg font-bold group-hover:text-sky-400 transition-colors">
                                        {app.jobTitle}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                                        <HiOutlineOfficeBuilding className="w-4 h-4" />
                                        {app.company}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[app.status] || statusStyles['Pending']}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full mr-2 animate-pulse ${app.status === 'Accepted' ? 'bg-emerald-400' : 'bg-current'}`}></div>
                                    {app.status}
                                </span>
                            </td>
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-2 text-slate-600 font-bold">
                                    <HiOutlineCalendar className="w-4 h-4 text-sky-500" />
                                    {formatDate(app.deadline)}
                                </div>
                            </td>
                            <td className="px-6 py-5 rounded-r-2xl text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => setEditingApplication(app)} 
                                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-sky-400 hover:border-sky-500/50 transition-all shadow-lg"
                                        title="Edit Entry"
                                    >
                                        <HiOutlinePencil className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(app._id)} 
                                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-rose-400 hover:border-rose-500/50 transition-all shadow-lg"
                                        title="Remove Entry"
                                    >
                                        <HiOutlineTrash className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingApplication && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-50/80 backdrop-blur-md" onClick={() => setEditingApplication(null)}></div>
                    <div className="relative glass p-8 md:p-10 rounded-[2.5rem] w-full max-w-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
                        <header className="flex justify-between items-center mb-8 border-b border-slate-200 pb-6">
                            <div>
                                <h3 className="text-2xl font-extrabold text-slate-900">Update Application</h3>
                                <p className="text-slate-600 text-sm mt-1">Refine your tracking details</p>
                            </div>
                            <button
                                onClick={() => setEditingApplication(null)}
                                className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-600 hover:text-slate-900"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </header>
                        
                        <EditApplicationForm
                            application={editingApplication}
                            onApplicationUpdated={() => {
                                setEditingApplication(null);
                                onApplicationUpdated();
                            }}
                            onCancel={() => setEditingApplication(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}