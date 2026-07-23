import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fafafa] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8 font-bold uppercase tracking-wider">Last updated: July 2026</p>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. User Accounts and Security</h2>
            <p>If you create an account on the Website, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Tournament Rules</h2>
            <p>Users participating in eSports tournaments on Letsbharat must adhere to the specific rules outlined for each tournament. Any use of cheats, hacks, or unfair exploits will result in immediate permanent bans from the platform.</p>
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