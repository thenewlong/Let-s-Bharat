import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  // Page load hone pe top pe scroll karne ke liye
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fafafa] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8 font-bold uppercase tracking-wider">Last updated: July 2026</p>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, and in connection with other activities, services, features, or resources we make available.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Collected Information</h2>
            <p>Letsbharat may collect and use Users' personal information for the following purposes: To improve customer service, to personalize user experience, and to run a promotion, contest, survey, or other Site feature.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Protect Your Information</h2>
            <p>We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Site.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link to="/" className="inline-flex items-center text-sm font-bold text-black bg-[#ffcc00] px-6 py-3 rounded-xl hover:shadow-lg transition-all active:scale-95">
            ← BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;