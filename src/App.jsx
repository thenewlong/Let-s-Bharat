import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AuthProvider } from './context/AuthContext'; // Auth Context import karo
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth'; 
import Hackathons from './pages/Hackathons'; 
import Internships from './pages/Internships'; // Internship page import karo
import Tournaments from './pages/Tournaments'; // Tournaments page import karo
import Communities from './pages/Communities';
import Resources from './pages/Resources';
import About from './pages/About';
import Profile from './pages/Profile'; // About page import karo

function App() {
  return (
    <AuthProvider> {/* AuthProvider se pure app ko wrap karo taki user state har component mein accessible ho */ }
      <Router>
        
        {/* Pure website ka dark premium base background color */}
        <div className="bg-[#0b0f19] min-h-screen font-sans text-white overflow-x-hidden">
          {/* Navbar sirf yahan pure app mein ek hi baar render hoga */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/internships" element={<Internships />} /> {/* Internship route */}
          <Route path="/tournaments" element={<Tournaments />} /> {/* Tournaments route */}
          <Route path="/communities" element={<Communities />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} /> {/* Profile route */}
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;