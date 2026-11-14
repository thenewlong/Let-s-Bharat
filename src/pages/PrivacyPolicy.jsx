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
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8 font-bold uppercase tracking-wider">Last updated: November 2026 • letsbharat.com</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Free Access & Overview</h2>
            <p>
              Welcome to <strong>Letsbharat</strong>. Visitors can freely access, read, and explore all educational resources, hackathons, internships, jobs, and institution details on our platform <strong>without creating an account or logging in</strong>. Browsing our website is entirely open and optional.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect (Minimal Data)</h2>
            <p className="mb-2">
              We believe in minimal data collection. We do not take any extra or sensitive personal details from our users:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
              <li>
                <strong>Optional Email Authentication:</strong> If a user chooses to sign up or log in, we only use secure email authentication (powered by Google Firebase). No other personal or financial records are collected.
              </li>
              <li>
                <strong>Browser Storage:</strong> We use standard browser <code>localStorage</code> purely for improving user experience (such as session timing and UI preferences).
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Google AdSense & Cookies Disclosure</h2>
            <p className="mb-2">
              We display advertisements on Letsbharat via <strong>Google AdSense</strong>. 
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
              <li>
                Google uses cookies (such as the DART cookie) to serve ads based on users&apos; prior visits to our website and other sites across the internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting Google&apos;s Ads Privacy Policy at{' '}
                <a 
                  href="https://policies.google.com/technologies/ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black font-bold underline"
                >
                  https://policies.google.com/technologies/ads
                </a>.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. How We Protect Your Information</h2>
            <p>
              We adopt appropriate data collection, storage, and processing security measures (via Firebase and Vercel infrastructure) to protect against unauthorized access, alteration, disclosure, or destruction of your basic account information.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to remove your optional login data, you can contact us directly via our platform.
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

export default PrivacyPolicy;