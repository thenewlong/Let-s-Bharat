import React, { useState } from 'react';

const FloatingSocialWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 🌐 Comprehensive list of social platforms with exact brand colors & SVG icons
  const socialLinks = [
    {
      name: 'WhatsApp',
      bg: 'bg-[#25D366] hover:bg-[#1da851]',
      url: 'https://wa.me/91XXXXXXXXXX', // 👈 Update WhatsApp Link
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      bg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      url: 'https://www.instagram.com/newlong.ai?cplk=MXVxNXNxenJueWFqaA==', // 👈 Update Instagram URL
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      bg: 'bg-[#1877F2] hover:bg-[#1464cc]',
      url: 'https://facebook.com/letsbharat', // 👈 Update Facebook URL
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      bg: 'bg-black hover:bg-gray-900',
      url: 'https://x.com/letsbharat', // 👈 Update X URL
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      bg: 'bg-[#FF0000] hover:bg-[#d60000]',
      url: 'https://youtube.com/@letsbharat', // 👈 Update YouTube URL
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'Kick',
      bg: 'bg-[#53FC18] hover:bg-[#43d910] text-black',
      url: 'https://kick.com/letsbharat', // 👈 Update Kick URL
      icon: (
        <span className="font-black text-xs tracking-tighter uppercase text-black">KICK</span>
      ),
    },
    {
      name: 'LinkedIn',
      bg: 'bg-[#0A66C2] hover:bg-[#084e96]',
      url: 'https://linkedin.com/company/letsbharat', // 👈 Update LinkedIn URL
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      bg: 'bg-[#24292e] hover:bg-[#1b1f23]',
      url: 'https://github.com/letsbharat', // 👈 Update GitHub URL
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'Discord',
      bg: 'bg-[#5865F2] hover:bg-[#4752c4]',
      url: 'https://discord.gg/letsbharat', // 👈 Update Discord URL
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
    },
    {
      name: 'Telegram',
      bg: 'bg-[#26A5E4] hover:bg-[#1e8cc4]',
      url: 'https://t.me/letsbharat', // 👈 Update Telegram URL
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm5.221 8.358c-.148 1.56-1.026 6.78-1.468 9.14-.188 1.002-.556 1.338-.916 1.371-.785.072-1.38-.518-2.14-1.017-1.19-.78-1.86-1.267-3.013-2.027-1.334-.88-.47-1.363.29-2.15.2-.204 3.66-3.355 3.73-3.645.008-.037.016-.176-.067-.25-.083-.073-.204-.048-.292-.028-.126.028-2.13 1.353-6.012 3.973-.568.39-1.083.58-1.546.57-.51-.01-1.492-.287-2.222-.525-.897-.29-1.611-.444-1.549-.937.033-.257.387-.52.1.62 1.517.697 2.923 1.83 5.374 9.176 2.222 1.32.535 2.186 1.144 2.127 1.76-.06 1.096-1.127 6.643-1.417 8.163z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[90] flex flex-col items-end group">
      
      {/* 📜 Scrollable Sub-Menu of Social Icons */}
      <div
        className={`flex flex-col gap-2.5 mb-3 transition-all duration-300 transform max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
            : 'opacity-0 translate-y-6 pointer-events-none scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-hover:scale-100'
        }`}
      >
        {socialLinks.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
            className={`w-11 h-11 ${item.bg} text-white border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#000] hover:scale-110 active:translate-x-0.5 active:translate-y-0.5 transition-all shrink-0`}
          >
            {item.icon}
          </a>
        ))}
      </div>

      {/* 🚀 Clean Neo-Brutalist Arcade Pill Button (No pulsing ring effect) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#CCFF00] hover:bg-[#b8e600] text-black border-4 border-black px-4 py-3 rounded-2xl shadow-[6px_6px_0px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all flex items-center gap-2"
        aria-label="Connect with us"
      >
        {isOpen ? (
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm uppercase tracking-widest text-black">
            <span>Close</span>
            <svg className="w-5 h-5 font-extrabold stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        ) : (
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm uppercase tracking-wider text-black">
            <span className="bg-black text-[#CCFF00] text-[10px] px-2 py-0.5 rounded border border-black uppercase font-bold">
              Stay Connected
            </span>
            <span>Join Us</span>
            <svg className="w-5 h-5 text-black stroke-[3] transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        )}
      </button>

    </div>
  );
};

export default FloatingSocialWidget;