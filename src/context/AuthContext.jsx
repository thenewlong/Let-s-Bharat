import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase'; 
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Admin State (localStorage se load karein)
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState(() => {
    return localStorage.getItem('adminEmail') || null;
  });

  // Signup function
  const signup = async (fullName, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: fullName });
    
    setUser({ ...userCredential.user, displayName: fullName });
    return userCredential.user;
  };

  // Normal Student / User Login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign In
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  };

  // 🔥 ADMIN LOGIN LOGIC
  const adminLogin = async (email) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      throw new Error('Please enter Admin Email');
    }

    if (!db) {
      throw new Error('Firestore database initialized nahi hai. firebase.js check karein.');
    }

    const adminDocRef = doc(db, 'allowed_admins', cleanEmail);
    const adminDocSnap = await getDoc(adminDocRef);

    if (adminDocSnap.exists()) {
      setIsAdmin(true);
      setAdminEmail(cleanEmail);
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('adminEmail', cleanEmail);
      return true;
    } else {
      throw new Error('Unauthorized Access: Ye Email whitelisted admin list mein nahi hai.');
    }
  };

  // Admin Logout
  const adminLogout = () => {
    setIsAdmin(false);
    setAdminEmail(null);
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminEmail');
  };

  // Complete Logout
  const logout = async () => {
    adminLogout();
    return await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        signup, 
        login, 
        signInWithGoogle, 
        logout, 
        loading,
        isAdmin,
        adminEmail,
        adminLogin,
        adminLogout
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);