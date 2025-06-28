import React,{useState,useEffect} from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
export default function Profile(){
  const {user,login,logout}=useAuth();
  const [profileData,setProfileData]=useState({
    fullName:'',
    email:''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const[profileErrors,setProfileErrors]=useState({});
  const[passwordErrors,setPasswordErrors]=useState({});
  const[profileLoading,setProfileLoading]=useState(false);
  const[passwordLoading,setPasswordLoading]=useState(false);
  const[notificationsEnabled,setNotificationsEnabled]=useState(true);
  const[reminderDays,setReminderDays]=useState(3);
  const[notificationLoading,setNotificationLoading]=useState(false);
  const[notificationMessage,setNotificationMessage]=useState('');

  useEffect(()=>{
    const fetchUserProfileAndNotifications=async()=>{
      if(!user) return;
      setProfileLoading(true);
      try {
        const res=await axios.get('/users/profile');
        setProfileData({
          fullName:res.data.fullName,
          email:res.data.email,
        })
        setNotificationsEnabled(res.data.emailNotificationsEnabled);
        setReminderDays(res.data.reminderDaysBefore);
      } catch (error) {
        console.error("Error fetching user profile:",error);
        toast.error(error.response?.data?.message || "Failed to load profile data.");
        if (error.response && error.response.status === 401) {
          logout(); 
        }
      }
      finally{
        setProfileLoading(false);
      }
    }
    fetchUserProfileAndNotifications();
  },[user,logout]);
  const handleProfileChange=(e)=>{
    setProfileData({...profileData,[e.target.id]:e.target.value});
    setProfileErrors({...profileErrors,[e.target.id]:''});
  }
  const handlePasswordChange=(e)=>{
    setPasswordData({...passwordData,[e.target.id]:e.target.value});
    setPasswordErrors({...passwordErrors,[e.target.id]:''});

  }
  const validateProfile=()=>{
    const err={};
    if (!profileData.fullName) err.fullName = "Full name is required";
    if (!profileData.email || !/\S+@\S+\.\S+/.test(profileData.email)) err.email = "Enter a valid email";
    setProfileErrors(err);
    return Object.keys(err).length === 0;
  }

  const validatePassword=()=>{
    const err = {};
    if (!passwordData.currentPassword) err.currentPassword = "Current password is required";
    if (!passwordData.newPassword || passwordData.newPassword.length < 6) err.newPassword = "New password must be at least 6 characters";
    if (passwordData.newPassword !== passwordData.confirmNewPassword) err.confirmNewPassword = "New passwords do not match";
    setPasswordErrors(err);
    return Object.keys(err).length === 0;
  }
  const handleProfileSubmit=async(e)=>{
    e.preventDefault();
    if(!validateProfile()) return;
    setPasswordLoading(true);
    try {
      const res=await axios.put('/users/profile',profileData);
      login(res.data,res.data.token);
      toast.success("Profile updated Successfully");

    } catch (error) {
      console.error("Error updating profile",error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
      if (error.response && error.response.status === 401) {
        logout();
      }
    }
    finally{
      setProfileLoading(false);
    }
  }
  const handlePasswordSubmit=async(e)=>{
    e.preventDefault();
    if(!validatePassword()) return;
    setPasswordLoading(true);
    try {
      const res=await axios.put('/users/profile',{
        password:passwordData.newPassword,
        currentPassword:passwordData.currentPassword
      })
      login(res.data,res.data.token);
      toast.success("Password updated successfully!");
      setPasswordData({currentPassword:'',newPassword:'',confirmNewPassword:''});
    } catch (error) {
      console.error("Error updating password:",error);
      toast.error(error.response?.data?.message || "Failed to update password.");
      if (error.response && error.response.status === 401) {
        logout();
      }
    }
    finally{
      setPasswordLoading(false);
    }
  }
  const handleNotificationSubmit=async(e)=>{
    e.preventDefault();
    setNotificationLoading(true);
    setNotificationMessage('');
    try {
      await axios.put('/users/me/notifications',{
        emailNotificationsEnabled:notificationsEnabled,
        reminderDaysBefore:reminderDays,
      });
      setNotificationMessage('Notification preferences updated successfully!');
      toast.success("Notification preferences updated successfully!");
    } catch (error) {
      console.error("Error updating notifications preferences:",error);
      setNotificationMessage(`Failed to update preferences:${error.response?.data?.message||'Server error'}`);
      toast.error(error.response?.data?.message || "Failed to update notification preferences.");
      if(error.response && error.response.status===401)
        {
          logout();
        }
    }
    finally{
      setNotificationLoading(false);
    }
  }
  if (profileLoading && !profileData.fullName) { 
    return <div className="flex justify-center items-center h-screen text-lg">Loading profile...</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Profile</h1>

      
      <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Update Profile Information</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <FormInput
            id="fullName"
            label="Full Name"
            type="text"
            value={profileData.fullName}
            onChange={handleProfileChange}
            error={profileErrors.fullName}
            placeholder="Your Full Name"
          />
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            value={profileData.email}
            onChange={handleProfileChange}
            error={profileErrors.email}
            placeholder="your@email.com"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
              disabled={profileLoading}
            >
              {profileLoading ? 'Updating Profile...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>

      
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <FormInput
            id="currentPassword"
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.currentPassword}
            placeholder="••••••••"
          />
          <FormInput
            id="newPassword"
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.newPassword}
            placeholder="••••••••"
          />
          <FormInput
            id="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmNewPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.confirmNewPassword}
            placeholder="••••••••"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-purple-700 transition disabled:opacity-50"
              disabled={passwordLoading}
            >
              {passwordLoading ? 'Updating Password...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Notification Settings</h2>
        <form onSubmit={handleNotificationSubmit} className="space-y-6">
          {notificationMessage && (
            <p className={`text-center ${notificationMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {notificationMessage}
            </p>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="emailNotificationsEnabled"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded"
            />
            <label htmlFor="emailNotificationsEnabled" className="ml-2 text-gray-700 text-lg">
              Enable Email Reminders
            </label>
          </div>

          <div>
            <label htmlFor="reminderDays" className="block text-gray-700 text-lg font-medium mb-2">
              Remind me
            </label>
            <select
              id="reminderDays"
              value={reminderDays}
              onChange={(e) => setReminderDays(Number(e.target.value))}
              disabled={!notificationsEnabled || notificationLoading} // Disable if notifications are off or saving
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value={1}>1 day before deadline</option>
              <option value={3}>3 days before deadline</option>
              <option value={7}>7 days before deadline</option>
              <option value={14}>14 days before deadline</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
              disabled={notificationLoading}
            >
              {notificationLoading ? 'Saving Settings...' : 'Save Notification Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}