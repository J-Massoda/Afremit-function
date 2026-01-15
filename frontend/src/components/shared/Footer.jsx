import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">A</span>
              </div>
              <span className="text-xl font-bold font-heading">Afremit</span>
            </Link>
            <p className="text-neutral-300 text-sm">
              The safest way to pay globally for construction projects with milestone-based escrow protection.
            </p>
          </div>

          {/* Content */}
          <div>
            <h5 className="font-bold mb-4">Content</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="text-neutral-300 hover:text-accent">Business</Link></li>
              <li><Link to="/about" className="text-neutral-300 hover:text-accent">About</Link></li>
              <li><Link to="/services" className="text-neutral-300 hover:text-accent">Our Services</Link></li>
              <li><Link to="/how-it-works" className="text-neutral-300 hover:text-accent">How It Works</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-bold mb-4">Contact</h5>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>+27 63 562 9324</li>
              <li>partners@afremit.com</li>
              <li className="leading-relaxed">
                Unit 1 Sundowners Creek<br />
                Hole In One Street<br />
                Willowbrook 1724<br />
                Johannesburg
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="font-bold mb-4">Newsletter</h5>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="w-full bg-accent hover:bg-accent-700 px-4 py-2 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-12 pt-8 text-center text-sm text-neutral-400">
          <p>© 2025 - <Link to="/" className="hover:text-accent">Afremit</Link>. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
