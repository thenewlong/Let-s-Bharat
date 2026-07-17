import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth(); // Logout function add kiya
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || "");
  const [nickName, setNickName] = useState("");
  const [bio, setBio] = useState("Passionate about building innovative solutions and exploring new technologies.");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName: name });
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth'); // Logout hone ke baad login page par redirect
    } catch (error) {
      alert("Logout failed");
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center text-gray-600">Please Login first!</div>;

  return (
    <div className="min-h-screen p-4 md:p-10" style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #bae6fd 40%, #fef08a 100%)" }}>
      
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-md"
          >
            Log Out
          </button>
        </div>

        <p className="text-gray-600 mb-8">Manage your personal information</p>

        {/* Profile Card */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/50">
          
          {/* Form Fields */}
          <div className="space-y-8">
            
            {/* Full Name */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">👤</div>
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-900">Full Name</label>
                <p className="text-xs text-gray-500 mb-2">This will be your full name</p>
                <input 
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#f5a623] outline-none"
                />
              </div>
            </div>

            {/* Nick Name */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">@</div>
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-900">Nick Name</label>
                <p className="text-xs text-gray-500 mb-2">This will be your public display name</p>
                <input 
                  type="text" value={nickName} onChange={(e) => setNickName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#f5a623] outline-none"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">✏️</div>
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-900">Or Myself ( Bio )</label>
                <p className="text-xs text-gray-500 mb-2">Write a short bio about yourself</p>
                <textarea 
                  value={bio} onChange={(e) => setBio(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-4 h-32 focus:ring-2 focus:ring-[#f5a623] outline-none"
                />
              </div>
            </div>

          </div>

          {/* Save Button */}
          <div className="mt-10 flex justify-end">
            <button 
              onClick={handleUpdate}
              className="bg-[#f5a623] hover:bg-[#e0961b] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-yellow-500/30"
            >
              {loading ? "Saving..." : "Save Profile"} <span>→</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;