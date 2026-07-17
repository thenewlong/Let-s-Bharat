import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");

  const handleUpdate = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName: name });
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  if (!user) return <div className="text-white p-20 text-center">Please Login first!</div>;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-10">
      <div className="max-w-2xl mx-auto bg-[#1a1f2e] p-8 rounded-2xl border border-gray-700">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-4xl font-bold">
            {user.displayName?.charAt(0).toUpperCase() || 'U'}
          </div>
          
          <div className="flex-1">
            {isEditing ? (
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 p-2 rounded text-white w-full border border-gray-600"
              />
            ) : (
              <h2 className="text-2xl font-semibold">{user.displayName}</h2>
            )}
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        {isEditing ? (
          <button onClick={handleUpdate} className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700">
            Save Changes
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;