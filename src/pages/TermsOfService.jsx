import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fafafa] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8 font-bold uppercase tracking-wider">Last updated: November 2026 • letsbharat.com</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and browsing <strong>Letsbharat</strong> (letsbharat.com), you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Free Access & Use of Platform</h2>
            <p>
              All educational resources, hackathons, job listings, internships, and institution details provided on Letsbharat are freely accessible to all visitors without mandatory registration. Users are permitted to view and use the information for personal, non-commercial educational and career-seeking purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. User Accounts & Optional Login</h2>
            <p>
              Users may voluntarily create an account using secure email authentication to access personalized features. If you create an account, you are responsible for maintaining the security of your credentials and for all activities that occur under your account. We reserve the right to suspend or terminate accounts that violate platform policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. External Links & Opportunities Disclaimer</h2>
            <p>
              Our platform lists third-party job openings, internships, hackathons, and institution links for informational purposes. Letsbharat does not directly control, host, or guarantee the outcomes of external recruitment processes or third-party websites. Users are advised to verify official guidelines before applying to any external listings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Advertisements & Google AdSense</h2>
            <p>
              To keep Letsbharat free for everyone, we display advertisements via Google AdSense. By using our platform, you acknowledge and agree that third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Modifications</h2>
            <p>
              Letsbharat may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.
            </p>
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

export default TermsOfService;