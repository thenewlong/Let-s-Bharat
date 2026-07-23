import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

// High quality Avatar SVGs
const AVATARS = {
  male: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander&backgroundColor=b6e3f4',
  female: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia&backgroundColor=ffdfbf'
};

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 1. DRAFT STATE (Sirf type karte waqt change hoga)
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [bio, setBio] = useState('');
  const [genderAvatar, setGenderAvatar] = useState('male');

  // 2. ORIGINAL SAVED STATE (Cancel karne par purana data wapas laane ke liye)
  const [originalData, setOriginalData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');
  
  // 3. EDIT MODE STATE (Default false rakha hai taaki shuru mein locked rahe)
  const [isEditing, setIsEditing] = useState(false);

  // Fetch Data on Load
  useEffect(() => {
    if (user) {
      let fetchedName = user.displayName || '';
      let fetchedNick = '';
      let fetchedBio = 'Passionate about building innovative solutions and exploring new technologies.';
      let fetchedGender = 'male';

      const savedLocalData = localStorage.getItem(`profileData_${user.uid}`);
      if (savedLocalData) {
        const parsedData = JSON.parse(savedLocalData);
        if (parsedData.nickName) fetchedNick = parsedData.nickName;
        if (parsedData.bio) fetchedBio = parsedData.bio;
        if (parsedData.genderAvatar) fetchedGender = parsedData.genderAvatar;
        
        setIsEditing(false); // Data mil gaya toh Edit Mode OFF (Lock kar do)
      } else {
        setIsEditing(true); // Agar koi data nahi hai (Naya user), toh Edit Mode ON rakho
      }

      // States update karna
      setName(fetchedName);
      setNickName(fetchedNick);
      setBio(fetchedBio);
      setGenderAvatar(fetchedGender);

      // Backup save kar lena taaki Cancel hone pe restore ho sake
      setOriginalData({
        name: fetchedName,
        nickName: fetchedNick,
        bio: fetchedBio,
        genderAvatar: fetchedGender
      });

      setFetching(false);
    }
  }, [user]);

  // Save Data & Lock Form (Sirf click hone par chalega)
  const handleUpdate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { 
          displayName: name,
          photoURL: AVATARS[genderAvatar]
        });
      }

      const localDataToSave = { nickName, bio, genderAvatar };
      localStorage.setItem(`profileData_${user.uid}`, JSON.stringify(localDataToSave));

      // Save hone ke baad original data ko naye data se update kar do
      setOriginalData({ name, nickName, bio, genderAvatar });

      setSuccessMsg('Profile saved successfully!');
      setIsEditing(false); // Save hone ke baad form lock kar do
      
      setTimeout(() => setSuccessMsg(''), 3500);
    } catch (error) {
      console.error(error);
      alert('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cancel Edit (Purana Data wapas le aao bina save kiye)
  const handleCancel = () => {
    if (originalData) {
      setName(originalData.name);
      setNickName(originalData.nickName);
      setBio(originalData.bio);
      setGenderAvatar(originalData.genderAvatar);
    }
    setIsEditing(false); // Lock the form again
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      alert('Logout failed');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <button
          onClick={() => navigate('/auth')}
          className="bg-white text-black px-6 py-2.5 rounded-xl font-bold transition-all hover:bg-gray-200"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    // Clean, Real & Professional Black Background
    <div className="w-full min-h-screen bg-black flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans selection:bg-neutral-800">
      
      <div className="w-full max-w-2xl">
        {/* HEADER SECTION */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              My Profile
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">Manage your personal details</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all"
          >
            Log Out
          </button>
        </div>

        {successMsg && (
          <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium rounded-xl text-center">
            {successMsg}
          </div>
        )}

        {/* PROFILE CARD (Dark Mode UI) */}
        <div className="bg-[#111111] p-6 sm:p-8 rounded-2xl border border-[#222222] shadow-2xl">
          
          {fetching ? (
             <div className="py-12 text-center text-neutral-500 font-medium text-sm">Loading profile...</div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-6">
              
              {/* AVATAR DP SECTION */}
              <div className="flex flex-col items-center justify-center pb-6 border-b border-[#222222]">
                <div className="relative">
                  <img 
                    src={AVATARS[genderAvatar]} 
                    alt="Profile Avatar" 
                    className="w-24 h-24 rounded-full border-2 border-neutral-700 bg-neutral-900 p-1 object-cover"
                  />
                </div>

                {isEditing ? (
                  <div className="mt-5 flex items-center gap-3">
                    <span className="text-xs font-semibold text-neutral-500">Choose Avatar:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setGenderAvatar('male')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          genderAvatar === 'male'
                            ? 'bg-white text-black'
                            : 'bg-[#1a1a1a] text-neutral-400 hover:bg-[#222222] border border-[#333]'
                        }`}
                      >
                        👨 Male
                      </button>
                      <button
                        type="button"
                        onClick={() => setGenderAvatar('female')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          genderAvatar === 'female'
                            ? 'bg-white text-black'
                            : 'bg-[#1a1a1a] text-neutral-400 hover:bg-[#222222] border border-[#333]'
                        }`}
                      >
                        👩 Female
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="mt-3 text-xs font-medium text-neutral-500 capitalize">
                    {genderAvatar} Avatar
                  </span>
                )}
              </div>

              {/* FULL NAME */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">Full Name</label>
                <input
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  readOnly={!isEditing}
                  placeholder="Enter your full name"
                  className={`w-full rounded-lg p-3 text-sm font-medium transition-all outline-none ${
                    isEditing 
                      ? "bg-[#1a1a1a] border border-[#333] text-white focus:bg-black focus:border-white focus:ring-1 focus:ring-white" 
                      : "bg-transparent border-transparent text-neutral-200 cursor-not-allowed px-0 font-semibold text-base"
                  }`}
                />
              </div>

              {/* NICK NAME */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">Nick Name</label>
                <div className="relative flex items-center">
                  <input
                    type="text" 
                    value={nickName} 
                    onChange={(e) => setNickName(e.target.value)}
                    readOnly={!isEditing}
                    placeholder="e.g. alex_dev"
                    className={`w-full rounded-lg py-3 text-sm font-medium transition-all outline-none ${
                      isEditing 
                        ? "bg-[#1a1a1a] border border-[#333] text-white focus:bg-black focus:border-white focus:ring-1 focus:ring-white px-3" 
                        : "bg-transparent border-transparent text-neutral-200 cursor-not-allowed px-0 font-semibold"
                    }`}
                  />
                </div>
              </div>

              {/* BIO */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">Myself ( Bio )</label>
                <textarea
                  rows={3} 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)}
                  readOnly={!isEditing}
                  placeholder="Tell us a little bit about yourself..."
                  className={`w-full rounded-lg p-3 text-sm font-medium transition-all outline-none resize-none ${
                    isEditing 
                      ? "bg-[#1a1a1a] border border-[#333] text-white focus:bg-black focus:border-white focus:ring-1 focus:ring-white" 
                      : "bg-transparent border-transparent text-neutral-400 cursor-not-allowed px-0"
                  }`}
                />
              </div>

              {/* DYNAMIC BUTTONS (Save vs Cancel vs Edit) */}
              <div className="pt-6 flex justify-end">
                {isEditing ? (
                  <div className="flex gap-3 w-full sm:w-auto">
                    {/* CANCEL BUTTON */}
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="w-full sm:w-auto bg-transparent hover:bg-[#1a1a1a] text-neutral-400 hover:text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all"
                    >
                      Cancel
                    </button>
                    {/* SAVE BUTTON */}
                    <button
                      type="submit" 
                      disabled={loading}
                      className="w-full sm:w-auto bg-white hover:bg-gray-200 text-black px-8 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm active:scale-95"
                    >
                      {loading ? "Saving..." : "Save Profile"}
                    </button>
                  </div>
                ) : (
                  // EDIT BUTTON
                  <button
                    type="button" 
                    onClick={handleEditClick}
                    className="w-full sm:w-auto bg-white hover:bg-gray-200 text-black px-8 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm active:scale-95"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;