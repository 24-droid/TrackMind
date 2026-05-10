import React, { useState } from 'react';
import axios from '../api/axios'; 
import { toast } from 'react-toastify';
import { HiOutlineUpload, HiOutlineLink, HiOutlineTag, HiOutlineBriefcase } from 'react-icons/hi';

export default function AddApplicationForm({ onApplicationAdded, onCancel }) {
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    
    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
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

            await axios.post('/applications', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            toast.success("New application tracked!");
            onApplicationAdded(); 
        } catch (err) {
            console.error('Error adding application:', err);
            setError(err.response?.data?.message || 'Failed to sync with server.');
            toast.error("Deployment failed. Please check your data.");
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
                        <HiOutlineBriefcase className="text-sky-400" /> Job Title
                    </label>
                    <input
                        type="text"
                        id="jobTitle"
                        placeholder="e.g. Senior Product Designer"
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
                        placeholder="e.g. Google"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 transition-all"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-bold text-slate-600 ml-1">Application Status</label>
                    <select
                        id="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 appearance-none cursor-pointer transition-all"
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Withdrawn">Withdrawn</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="deadline" className="text-sm font-bold text-slate-600 ml-1">Deadline Date</label>
                    <input
                        type="date"
                        id="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 color-scheme-dark transition-all"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="applicationLink" className="flex items-center gap-2 text-sm font-bold text-slate-600 ml-1">
                    <HiOutlineLink className="text-sky-400" /> Job URL
                </label>
                <input
                    type="url"
                    id="applicationLink"
                    placeholder="https://careers.google.com/..."
                    value={formData.applicationLink}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 transition-all"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-bold text-slate-600 ml-1">Internal Notes</label>
                <textarea
                    id="notes"
                    placeholder="Key requirements, referral info, etc."
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 transition-all resize-none"
                ></textarea>
            </div>

            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-600 ml-1">
                    <HiOutlineUpload className="text-sky-400" /> Supporting Documents
                </label>
                <div className="relative group">
                    <input
                        type="file"
                        id="document"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        multiple 
                    />
                    <div className="w-full px-4 py-8 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50 group-hover:bg-white/70 group-hover:border-sky-500/50 transition-all flex flex-col items-center justify-center gap-3">
                        <div className="p-3 bg-slate-100 rounded-full text-slate-600 group-hover:text-sky-400 transition-colors">
                            <HiOutlineUpload className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                            <p className="text-slate-900 font-medium">Click to upload or drag and drop</p>
                            <p className="text-slate-600 text-xs mt-1">PDF, DOCX up to 10MB</p>
                        </div>
                    </div>
                </div>
                
                {selectedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-lg text-xs font-bold text-sky-400">
                                {file.name.substring(0, 20)}{file.name.length > 20 ? '...' : ''}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-all"
                    disabled={loading}
                >
                    Discard
                </button>
                <button
                    type="submit"
                    className="btn-primary px-8"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Track Application'}
                </button>
            </div>
        </form>
    );
}