import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Data ko extend kiya gaya hai taaki naye sections (Gallery, Principal, Faculty) show ho sake
const institutionsData = [
  {
    id: 1,
    name: 'Bairagikami J.B. School',
    type: 'Government',
    badgeColor: 'bg-[#E6F4EA] text-[#1E7E34] border-[#1E7E34]/20',
    state: 'Tripura',
    district: 'Dhalai',
    location: 'Bairagikami Village, Dhalai District, Tripura - 799278',
    classes: '1 - 10',
    established: '1998',
    totalStudents: '450+',
    facultyCount: '35+',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
    description: 'Bairagikami J.B. School is a premier government institution dedicated to quality education, moral student empowerment, and holistic child development in Tripura.',
    
    // Gallery - Yahan aap apne local paths daal sakte hain jaise: import img1 from '../assets/img1.jpg' -> url: img1
    gallery: [
      { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80', title: 'Classroom' },
      { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=600&q=80', title: 'Sports' },
      { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80', title: 'Science Lab' },
      { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=600&q=80', title: 'Library' },
      { id: 5, type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', poster: 'https://images.unsplash.com/photo-1599058917215-40d9abc4412e?auto=format&fit=crop&w=600&q=80', title: 'Campus Video' },
    ],

    // Principal Info
    principal: {
      name: 'Mr. Ramesh Debbarma',
      role: 'Principal',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      quote: "At Bairagikami J.B. School, we believe that every child has the potential to shine. Our mission is to provide a nurturing environment that promotes academic excellence, character building, and leadership. Together, let's inspire young minds to build a brighter tomorrow.\n\nWe are committed to holistic education, blending academics, sports, technology, and values to shape responsible citizens and future leaders."
    },

    // Facilities with icons (SVG paths)
    facilities: [
      { title: 'Digital Classrooms', desc: 'Smart learning with digital boards & projectors.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
      { title: 'Sports Ground', desc: 'Spacious playground for outdoor activities.', icon: 'M14.752 11.168l-3.197-2.132A4 4 0 002 9.87v4.263a4 4 0 005.555 3.332l3.197-2.132a4 4 0 000-6.664z' },
      { title: 'Science Lab', desc: 'Well-equipped labs for practical learning.', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
      { title: 'Library', desc: 'Rich collection of books & digital resources.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
      { title: 'Free Mid-day Meals', desc: 'Nutritious meals for every student.', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' }
    ],

    // Faculty
    faculty: [
      { name: 'Anita Debnath', role: 'English Teacher', exp: '10+ Years Experience', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
      { name: 'Kamal Hossain', role: 'Maths Teacher', exp: '8+ Years Experience', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80' },
      { name: 'Sunita Reang', role: 'Science Teacher', exp: '12+ Years Experience', image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80' },
      { name: 'Rohit Chakma', role: 'Sports Instructor', exp: '6+ Years Experience', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  // Add baaki dummy data for ids 2, 3, 4 if needed...
];

const InstitutionsPages = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const institution = institutionsData.find((item) => item.id === parseInt(id)) || institutionsData[0]; // Fallback to id 1 for testing UI

  if (!institution) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Institution Not Found</h2>
          <button onClick={() => navigate('/institutions')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* 1. HERO SECTION (Banner) */}
      <div className="relative w-full h-[50vh] md:h-[70vh] rounded-b-[2rem] md:rounded-b-[4rem] overflow-hidden">
        <img src={institution.image} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-white animate-fade-in-up">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${institution.badgeColor}`}>
              {institution.type}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 tracking-tight drop-shadow-md">
              {institution.name}
            </h1>
            <p className="text-sm md:text-base text-gray-200 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              {institution.location}
            </p>
          </div>

          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
              Follow
            </button>
            <button className="px-8 py-3 rounded-full bg-[#FFB800] text-black hover:bg-[#e5a600] transition-all duration-300 shadow-lg font-semibold hover:scale-105">
              Contact School
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16 md:space-y-24">
        
        {/* 2. ABOUT & QUICK STATS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">About Institution</h2>
            <div className="w-12 h-1 bg-[#FFB800] mb-6 rounded-full"></div>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {institution.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <StatCard icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" title="Classes Offered" value={institution.classes} />
            <StatCard icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" title="Established" value={institution.established} />
            <StatCard icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" title="Total Students" value={institution.totalStudents} />
            <StatCard icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" title="Faculty Members" value={institution.facultyCount} />
          </div>
        </section>

        {/* 3. GALLERY SECTION (Images & Videos with Play/Pause) */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Gallery</h2>
          <div className="w-12 h-1 bg-[#FFB800] mb-8 rounded-full"></div>
          
          {/* Horizontal scroll for mobile, Grid for Desktop */}
          <div className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
            {institution.gallery?.map((item) => (
              <div key={item.id} className="relative group min-w-[240px] md:min-w-0 h-48 md:h-56 rounded-2xl overflow-hidden cursor-pointer snap-center shrink-0 shadow-sm hover:shadow-xl transition-all duration-300">
                
                {item.type === 'video' ? (
                  // Video Player - Users yahan direct click karke play/pause kar sakte hain
                  <video 
                    controls 
                    poster={item.poster} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  >
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  // Normal Image
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                )}
                
                {/* Title Overlay for Images */}
                {item.type === 'image' && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <span className="text-white font-medium text-sm">{item.title}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 4. FROM THE PRINCIPAL */}
        <section className="bg-gray-50 rounded-[2rem] p-6 md:p-12 border border-gray-100 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">From the Principal</h2>
            {/* Circular Profile Picture jaise aapne bola */}
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
              <img src={institution.principal.image} alt={institution.principal.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            {/* Fake Signature */}
            <div className="font-['Brush_Script_MT'] text-3xl md:text-4xl text-gray-800 opacity-80 mt-2 mb-2">
              R. Debbarma
            </div>
            <h3 className="font-bold text-gray-900">{institution.principal.name}</h3>
            <p className="text-sm text-gray-500">{institution.principal.role}</p>
          </div>
          
          <div className="w-full md:w-2/3 relative">
            <span className="text-6xl text-[#FFB800] absolute -top-8 -left-6 opacity-30 font-serif">"</span>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed relative z-10 whitespace-pre-line italic">
              {institution.principal.quote}
            </p>
          </div>
        </section>

        {/* 5. KEY FACILITIES */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Key Facilities</h2>
          <div className="w-12 h-1 bg-[#FFB800] mb-8 rounded-full"></div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {institution.facilities?.map((fac, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFB800]/10 transition-colors">
                  <svg className="w-6 h-6 text-gray-700 group-hover:text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={fac.icon}></path>
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">{fac.title}</h4>
                <p className="text-xs text-gray-500">{fac.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. KEY FACULTY */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Key Faculty</h2>
              <div className="w-12 h-1 bg-[#FFB800] rounded-full"></div>
            </div>
            <button className="text-sm font-medium text-gray-600 hover:text-black flex items-center gap-1 transition-colors">
              View All Faculty <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {institution.faculty?.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="h-56 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex items-start gap-3">
                  <div className="mt-1 text-[#FFB800]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm md:text-base">{member.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{member.role}</p>
                    <p className="text-xs text-gray-400 mt-1">{member.exp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* 7. FOOTER CTA SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#0B1221] rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Background Pattern Hint */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
             <svg width="200" height="200" viewBox="0 0 24 24" fill="white"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
          </div>

          <div className="z-10 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Be a part of our learning community</h2>
            <p className="text-gray-400 text-sm">Admissions open for the academic year 2026.</p>
          </div>
          
          <div className="z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="px-8 py-3 rounded-full bg-[#FFB800] text-black font-semibold hover:bg-[#e5a600] transition-all hover:scale-105">
              Inquire Now
            </button>
            <button className="px-8 py-3 rounded-full border border-gray-600 text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              Download Brochure
              <svg className="w-4 h-4 text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

// Reusable Stat Card Component (Mocks the small grey boxes in "About")
const StatCard = ({ icon, title, value }) => (
  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className="text-gray-500">
      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={icon}></path>
      </svg>
    </div>
    <div>
      <p className="text-xs md:text-sm text-gray-500">{title}</p>
      <p className="text-sm md:text-lg font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default InstitutionsPages;