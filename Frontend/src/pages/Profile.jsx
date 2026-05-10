import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlineBell, HiOutlineSave } from 'react-icons/hi';

export default function Profile() {
  const { user, login, logout } = useAuth();
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reminderDays, setReminderDays] = useState(3);
  const [notificationLoading, setNotificationLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      setProfileLoading(true);
      try {
        const res = await axios.get('/users/profile');
        setProfileData({
          fullName: res.data.fullName,
          email: res.data.email,
        });
        setNotificationsEnabled(res.data.emailNotificationsEnabled);
        setReminderDays(res.data.reminderDaysBefore);
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 401) logout();
      } finally {
        setProfileLoading(false);
      }
    };
    fetchUserProfile();
  }, [user, logout]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.id]: e.target.value });
    setProfileErrors({ ...profileErrors, [e.target.id]: '' });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
    setPasswordErrors({ ...passwordErrors, [e.target.id]: '' });
  };

  const validateProfile = () => {
    const err = {};
    if (!profileData.fullName) err.fullName = "Required";
    if (!profileData.email || !/\S+@\S+\.\S+/.test(profileData.email)) err.email = "Invalid email";
    setProfileErrors(err);
    return Object.keys(err).length === 0;
  };

  const validatePassword = () => {
    const err = {};
    if (!passwordData.currentPassword) err.currentPassword = "Required";
    if (passwordData.newPassword.length < 8) err.newPassword = "Min 8 chars";
    if (passwordData.newPassword !== passwordData.confirmNewPassword) err.confirmNewPassword = "No match";
    setPasswordErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;
    setProfileLoading(true);
    try {
      const res = await axios.put('/users/profile', profileData);
      login(res.data, res.data.token);
      toast.success("Identity updated successfully.");
    } catch (error) {
      toast.error("Profile update failed.");
      if (error.response?.status === 401) logout();
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    setPasswordLoading(true);
    try {
      await axios.put('/users/profile', {
        password: passwordData.newPassword,
        currentPassword: passwordData.currentPassword
      });
      toast.success("Security protocols updated.");
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (error) {
      toast.error("Password update rejected.");
      if (error.response?.status === 401) logout();
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setNotificationLoading(true);
    try {
      await axios.put('/users/me/notifications', {
        emailNotificationsEnabled: notificationsEnabled,
        reminderDaysBefore: reminderDays,
      });
      toast.success("Alert preferences synced.");
    } catch (error) {
      toast.error("Failed to update alerts.");
      if (error.response?.status === 401) logout();
    } finally {
      setNotificationLoading(false);
    }
  };

  if (profileLoading && !profileData.fullName) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      
      {/* Background decoration */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

      <main className="container mx-auto px-4 pt-32 pb-20 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">Identity Matrix</h1>
          <p className="text-slate-600">Manage your profile credentials and security protocols.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Identity Section */}
          <div className="glass p-8 rounded-[2.5rem] border-sky-500/20">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HiOutlineUser className="text-sky-400" /> Core Profile
            </h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase ml-1">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  className={`w-full px-4 py-3 bg-white/70 border ${profileErrors.fullName ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:border-sky-500 text-slate-900 transition-all`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase ml-1">Email Terminal</label>
                <input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className={`w-full px-4 py-3 bg-white/70 border ${profileErrors.email ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:border-sky-500 text-slate-900 transition-all`}
                />
              </div>
              <button
                type="submit"
                disabled={profileLoading}
                className="w-full btn-primary py-3 text-sm flex items-center justify-center gap-2 mt-4"
              >
                {profileLoading ? 'Syncing...' : 'Confirm Identity'}
              </button>
            </form>
          </div>

          {/* Security Section */}
          <div className="glass p-8 rounded-[2.5rem] border-indigo-500/20">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HiOutlineLockClosed className="text-indigo-400" /> Security
            </h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                id="currentPassword"
                type="password"
                placeholder="Current Access Key"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 bg-white/70 border ${passwordErrors.currentPassword ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:border-indigo-500 text-slate-900 transition-all`}
              />
              <input
                id="newPassword"
                type="password"
                placeholder="New Access Key"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 bg-white/70 border ${passwordErrors.newPassword ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:border-indigo-500 text-slate-900 transition-all`}
              />
              <input
                id="confirmNewPassword"
                type="password"
                placeholder="Confirm Key"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 bg-white/70 border ${passwordErrors.confirmNewPassword ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:border-indigo-500 text-slate-900 transition-all`}
              />
              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-slate-900 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 mt-4"
              >
                {passwordLoading ? 'Rotating...' : 'Rotate Key'}
              </button>
            </form>
          </div>

          {/* Notifications Section */}
          <div className="md:col-span-2 glass p-8 rounded-[2.5rem] border-emerald-500/20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <HiOutlineBell className="text-emerald-400" /> Neural Alerts
                </h2>
                <p className="text-slate-600 text-sm mt-1">Configure automated deadline synchronization.</p>
              </div>
              <div className="flex items-center gap-3 bg-white/70 p-2 rounded-2xl border border-slate-200">
                <span className={`text-xs font-black uppercase tracking-widest ${notificationsEnabled ? 'text-emerald-400' : 'text-slate-600'}`}>
                  {notificationsEnabled ? 'Enabled' : 'Disabled'}
                </span>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${notificationsEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notificationsEnabled ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>

            <form onSubmit={handleNotificationSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-600 uppercase ml-1">Deadline Buffer (Days)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 3, 7, 14].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setReminderDays(days)}
                      disabled={!notificationsEnabled}
                      className={`py-3 rounded-xl font-bold transition-all border ${
                        reminderDays === days 
                          ? 'bg-emerald-500 border-emerald-400 text-slate-900 shadow-lg shadow-emerald-500/20' 
                          : 'bg-white/70 border-slate-200 text-slate-600 hover:border-slate-300'
                      } ${!notificationsEnabled ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                      {days}d
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={notificationLoading}
                className="w-full bg-white border border-slate-200 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
              >
                <HiOutlineSave className="w-5 h-5 text-emerald-400" />
                {notificationLoading ? 'Syncing...' : 'Save Preferences'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}