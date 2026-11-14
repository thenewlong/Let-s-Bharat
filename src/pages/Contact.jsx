import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#fafafa] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        
        {/* Badge & Header */}
        <div className="inline-block bg-[#CCFF00] text-black border-2 border-black text-xs font-black uppercase tracking-widest px-3 py-1 mb-4 shadow-[3px_3px_0px_0px_#000]">
          Get In Touch
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-black mb-3 uppercase tracking-tight">Contact Us</h1>
        <p className="text-sm md:text-base font-bold text-gray-700 mb-8 leading-relaxed">
          Have questions, feedback, or partnership inquiries regarding LetsBharat? Reach out to us directly or drop a message below.
        </p>

        {submitted ? (
          <div className="bg-[#CCFF00] border-4 border-black p-6 text-black font-black text-center shadow-[4px_4px_0px_0px_#000]">
            <h2 className="text-xl uppercase mb-2">Message Received! 🎉</h2>
            <p className="text-sm font-bold mb-4">Thank you for reaching out. We will get back to you soon.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-black text-white px-5 py-2 text-xs uppercase tracking-wider border-2 border-black hover:bg-gray-900"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-[#FFFDF9] border-3 border-black p-3 text-sm font-bold shadow-[3px_3px_0px_0px_#000] focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-wider mb-2">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-[#FFFDF9] border-3 border-black p-3 text-sm font-bold shadow-[3px_3px_0px_0px_#000] focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-2">Message</label>
              <textarea
                rows="5"
                required
                placeholder="Write your message or inquiry here..."
                className="w-full bg-[#FFFDF9] border-3 border-black p-3 text-sm font-bold shadow-[3px_3px_0px_0px_#000] focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-[#CCFF00] hover:bg-[#b8e600] text-black font-black py-3 px-8 border-3 border-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              Send Message
            </button>
          </form>
        )}

        {/* Direct Email Info */}
        <div className="mt-12 p-5 bg-gray-100 border-3 border-black shadow-[4px_4px_0px_0px_#000]">
          <h3 className="text-sm font-black uppercase tracking-wider mb-1">Direct Support Email</h3>
          <p className="text-sm font-bold text-gray-700">
            You can also email us directly at: <strong className="text-black underline">letsbharatofficial@gmail.com</strong>
          </p>
        </div>

        <div className="mt-10 pt-6 border-t-2 border-black">
          <Link to="/" className="inline-flex items-center text-xs font-black text-black bg-[#00E5FF] px-5 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all uppercase tracking-wider">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;