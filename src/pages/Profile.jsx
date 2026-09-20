import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

// 1. High Quality 5 Avatar Options
const AVATARS = {
  male: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4',
  female: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia&backgroundColor=ffdfbf',
  boy: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack&backgroundColor=c0aede',
  girl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily&backgroundColor=ffdfbf',
  old: 'https://api.dicebear.com/7.x/avataaars/svg?seed=George&backgroundColor=d1d4f9'
};

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // State Management
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [genderAvatar, setGenderAvatar] = useState('male');
  
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showAvatarSelect, setShowAvatarSelect] = useState(false);
  
  // Naya State: Edit Mode ke liye
  const [isEditing, setIsEditing] = useState(false);

  // Fetch Data on Load
  useEffect(() => {
    if (user) {
      let fetchedName = user.displayName || '';
      let fetchedBio = '';
      let fetchedGender = 'male';

      const savedLocalData = localStorage.getItem(`profileData_${user.uid}`);
      if (savedLocalData) {
        const parsedData = JSON.parse(savedLocalData);
        if (parsedData.bio) fetchedBio = parsedData.bio;
        if (parsedData.genderAvatar) fetchedGender = parsedData.genderAvatar;
      }

      setName(fetchedName);
      setBio(fetchedBio);
      setGenderAvatar(fetchedGender);

      setOriginalData({
        name: fetchedName,
        bio: fetchedBio,
        genderAvatar: fetchedGender
      });

      setFetching(false);
    }
  }, [user]);

  // Save Data
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { 
          displayName: name,
          photoURL: AVATARS[genderAvatar]
        });
      }

      const localDataToSave = { bio, genderAvatar };
      localStorage.setItem(`profileData_${user.uid}`, JSON.stringify(localDataToSave));

      setOriginalData({ name, bio, genderAvatar });
      setIsEditing(false); // Save ke baad edit mode off
      alert("Profile Saved Successfully!");
    } catch (error) {
      console.error(error);
      alert('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cancel Changes
  const handleCancel = () => {
    if (originalData) {
      setName(originalData.name);
      setBio(originalData.bio);
      setGenderAvatar(originalData.genderAvatar);
    }
    setShowAvatarSelect(false);
    setIsEditing(false);
  };

  // Logout Functionality
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error("Logout failed", error);
      alert("Failed to logout. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <button onClick={() => navigate('/auth')} className="bg-yellow-400 text-black px-6 py-2.5 rounded-xl font-bold">
          Go to Login
        </button>
      </div>
    );
  }

  return (
    // Mobile screen par fit karne ke liye h-[100dvh] aur overflow-hidden lagaya hai
    <div className="w-full h-[100dvh] overflow-hidden bg-black text-white font-sans flex flex-col items-center selection:bg-yellow-500/30">
      
      {/* Custom CSS for Letter Animation */}
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5) translateY(5px); }
          50% { transform: scale(1.1) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-letter {
          display: inline-block;
          animation: popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      <div className="w-full max-w-md flex flex-col h-full p-4 sm:p-6 relative">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 mt-2 relative shrink-0">
          {isEditing ? (
            <button onClick={handleCancel} className="text-gray-400 text-sm font-medium hover:text-white transition-colors">
              Cancel
            </button>
          ) : (
            <button onClick={handleLogout} className="text-red-400 text-sm font-medium hover:text-red-300 transition-colors flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Logout
            </button>
          )}
          
          <h1 className="text-lg font-semibold absolute left-1/2 -translate-x-1/2">
            My Profile
          </h1>

          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="text-[#F5CE45] text-sm font-medium hover:text-yellow-300 transition-colors">
              Edit
            </button>
          )}
        </div>

        {fetching ? (
          <div className="flex-grow flex items-center justify-center text-neutral-500 text-sm">Loading profile...</div>
        ) : (
          <div className="flex flex-col flex-grow overflow-y-auto pb-4 custom-scrollbar">
            
            {/* AVATAR SECTION */}
            <div className="flex flex-col items-center mb-8 relative shrink-0">
              <div className="relative">
                <img 
                  src={AVATARS[genderAvatar]} 
                  alt="User Avatar" 
                  className={`w-28 h-28 rounded-full bg-[#1a1a1a] object-cover border-2 ${isEditing ? 'border-[#F5CE45]' : 'border-transparent'} transition-colors`}
                />
                
                {/* Camera Badge - Sirf Edit Mode mein dikhega */}
                {isEditing && (
                  <div 
                    onClick={() => setShowAvatarSelect(!showAvatarSelect)}
                    className="absolute bottom-0 right-1 bg-[#F5CE45] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-lg border-2 border-black active:scale-95 transition-transform"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                      <circle cx="12" cy="13" r="3"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Avatar Selection Dropdown/Modal */}
              {isEditing && showAvatarSelect && (
                <div className="absolute top-[100%] mt-4 bg-[#1a1a1a] border border-[#333] rounded-2xl p-4 shadow-2xl z-20 w-full max-w-[300px] animate-fade-in">
                  <p className="text-xs text-gray-400 mb-3 text-center uppercase tracking-wider">Select Avatar</p>
                  <div className="grid grid-cols-5 gap-3">
                    {Object.keys(AVATARS).map((key) => (
                      <div 
                        key={key}
                        onClick={() => {
                          setGenderAvatar(key);
                          setShowAvatarSelect(false);
                        }}
                        className={`cursor-pointer rounded-full p-1 border-2 transition-all ${genderAvatar === key ? 'border-[#F5CE45]' : 'border-transparent hover:border-gray-500'}`}
                      >
                        <img src={AVATARS[key]} alt={key} className="w-full h-full rounded-full bg-black" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FORM INPUTS */}
            <div className="space-y-6 flex-grow">
              
              {/* MYSELF (Name) */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">
                  Myself
                </label>
                
                {/* Animation Overlay Trick Container */}
                <div className="relative w-full h-[56px] bg-[#1c1c1e] rounded-2xl overflow-hidden">
                  
                  {/* Visual Animated Text Layer */}
                  <div className="absolute inset-0 p-4 text-[15px] pointer-events-none flex items-center whitespace-pre overflow-hidden">
                    {!name && <span className="text-gray-600">Enter your name</span>}
                    {name.split('').map((char, i) => (
                      <span key={i} className="animate-letter">
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </div>

                  {/* Real Input Layer (Transparent text, visible caret) */}
                  <input
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className="absolute inset-0 w-full h-full bg-transparent p-4 text-[15px] text-transparent caret-white outline-none focus:ring-1 focus:ring-gray-600 transition-all z-10 disabled:cursor-not-allowed"
                    spellCheck={false}
                  />
                </div>
              </div>

              {/* ABOUT YOURSELF (Bio) */}
              <div className="space-y-2 relative">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">
                  About Yourself
                </label>
                
                {/* Animation Overlay Trick Container for Textarea */}
                <div className="relative w-full h-[120px] bg-[#1c1c1e] rounded-2xl overflow-hidden">
                  
                  {/* Visual Animated Text Layer */}
                  <div className="absolute inset-0 p-4 text-[15px] pointer-events-none whitespace-pre-wrap break-words leading-relaxed">
                    {!bio && <span className="text-gray-600">Tell us a little bit about yourself...</span>}
                    {bio.split('').map((char, i) => (
                      <span key={i} className="animate-letter">
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </div>

                  {/* Real Textarea Layer */}
                  <textarea
                    maxLength={150}
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                    className="absolute inset-0 w-full h-full bg-transparent p-4 text-[15px] text-transparent caret-white outline-none focus:ring-1 focus:ring-gray-600 transition-all resize-none leading-relaxed z-10 disabled:cursor-not-allowed custom-scrollbar"
                    spellCheck={false}
                  />
                </div>
                
                {/* Character Count */}
                {isEditing && (
                  <div className="absolute -bottom-6 right-2 text-[11px] font-medium text-gray-500">
                    {bio.length}/150
                  </div>
                )}
              </div>

            </div>

            {/* SAVE BUTTON (Fixed at bottom aur sirf edit mode me dikhega) */}
            {isEditing && (
              <div className="mt-auto pt-8 shrink-0">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full bg-[#F5CE45] hover:bg-[#e3be38] text-black py-4 rounded-[20px] font-bold text-[16px] transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 shadow-[0_4px_14px_rgba(245,206,69,0.2)]"
                >
                  {loading ? "Saving..." : "Save Profile"}
                </button>
              </div>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;