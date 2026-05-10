import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext'; 
import { toast } from 'react-toastify';
import { HiOutlineUpload, HiOutlineLink, HiOutlineTag, HiOutlineBriefcase, HiOutlineXCircle, HiOutlineDocumentDownload } from 'react-icons/hi';

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
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [existingDocuments, setExistingDocuments] = useState([]);

    useEffect(() => {
        if (application) {
            setFormData({
                jobTitle: application.jobTitle || '',
                company: application.company || '',
                status: application.status || 'Applied',
                deadline: application.deadline ? new Date(application.deadline).toISOString().split('T')[0] : '', 
                applicationLink: application.applicationLink || '',
                notes: application.notes || '',
            });
            setExistingDocuments(application.documents || []);
        }
    }, [application]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleRemoveExistingDocument = (public_id) => {
        setExistingDocuments(existingDocuments.filter(doc => doc.public_id !== public_id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const form = new FormData();
            Object.keys(formData).forEach(key => {
                form.append(key, formData[key]);
            });
            selectedFiles.forEach(file => {
                form.append('document', file);
            });
            form.append('documents', JSON.stringify(existingDocuments));

            await axios.put(`/applications/${application._id}`, form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            toast.success("Application updated!");
            onApplicationUpdated(); 
        } catch (err) {
            console.error('Error updating application:', err);
            setError(err.response?.data?.message || 'Update synchronization failed.');
            toast.error("Failed to sync changes."); 
            if (err.response?.status === 401) logout(); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="jobTitle" className="flex items-center gap-2 text-sm font-bold text-slate-600 ml-1">
                        <HiOutlineBriefcase className="text-sky-400" /> Position
                    </label>
                    <input
                        type="text"
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 transition-all"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="company" className="flex items-center gap-2 text-sm font-bold text-slate-600 ml-1">
                        <HiOutlineTag className="text-sky-400" /> Company
                    </label>
                    <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 transition-all"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-bold text-slate-600 ml-1">Status</label>
                    <select
                        id="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 appearance-none cursor-pointer"
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Withdrawn">Withdrawn</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="deadline" className="text-sm font-bold text-slate-600 ml-1">Deadline</label>
                    <input
                        type="date"
                        id="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 color-scheme-dark"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="applicationLink" className="flex items-center gap-2 text-sm font-bold text-slate-600 ml-1">
                    <HiOutlineLink className="text-sky-400" /> Job Link
                </label>
                <input
                    type="url"
                    id="applicationLink"
                    value={formData.applicationLink}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 transition-all"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-bold text-slate-600 ml-1">Notes</label>
                <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 transition-all resize-none"
                ></textarea>
            </div>

            {existingDocuments.length > 0 && (
                <div className="space-y-3">
                    <p className="text-sm font-bold text-slate-600 ml-1">Stored Assets</p>
                    <div className="grid grid-cols-1 gap-2">
                        {existingDocuments.map((doc) => (
                            <div key={doc.public_id} className="flex items-center justify-between p-3 bg-white/70 border border-slate-200 rounded-xl">
                                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sky-400 hover:text-sky-300 font-medium text-sm">
                                    <HiOutlineDocumentDownload className="w-5 h-5" />
                                    {doc.fileName}
                                </a>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveExistingDocument(doc.public_id)}
                                    className="text-slate-600 hover:text-rose-400 transition-colors"
                                >
                                    <HiOutlineXCircle className="w-6 h-6" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-600 ml-1">
                    <HiOutlineUpload className="text-sky-400" /> Add More Documents
                </label>
                <input
                    type="file"
                    id="document"
                    onChange={handleFileChange}
                    className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-white file:text-slate-600 hover:file:bg-slate-100 file:transition-all cursor-pointer"
                    multiple
                />
            </div>

            <div className="flex justify-end gap-3 pt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-all"
                    disabled={loading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn-primary px-8"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Confirm Changes'}
                </button>
            </div>
        </form>
    );
}