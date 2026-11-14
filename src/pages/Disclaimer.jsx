import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Disclaimer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fafafa] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2">Disclaimer</h1>
        <p className="text-sm text-gray-500 mb-8 font-bold uppercase tracking-wider">Last updated: November 2026 • letsbharat.com</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. General Information</h2>
            <p>
              All the information provided on <strong>Letsbharat</strong> (letsbharat.com)—including job listings, internships, hackathons, and institution details—is published in good faith and for general informational and educational purposes only. Letsbharat does not make any warranties about the completeness, reliability, and accuracy of this information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. External Links & Third-Party Opportunities</h2>
            <p>
              Our website contains links to external websites, official recruitment portals, and third-party application pages. While we strive to provide genuine and verified links, we have no control over the content, policies, or actions of these external sites. Any action you take upon the information found on Letsbharat is strictly at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. No Professional Advice</h2>
            <p>
              The content on Letsbharat should not be construed as professional career, legal, or financial advice. Users are strongly advised to independently verify all details directly from official organization websites before applying or making commitments.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Advertisements & Google AdSense</h2>
            <p>
              Letsbharat displays ads through Google AdSense to keep the platform free. We do not endorse or take responsibility for the products, services, or claims made in third-party advertisements displayed via ad networks on our platform.
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

export default Disclaimer;