import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h6 className="text-lg font-semibold mb-3 text-indigo-600">
            Doctor Appointment System
          </h6>
          <p className="text-sm text-gray-600 leading-relaxed">
            A modern platform to connect patients with doctors. Search, book,
            and manage appointments with ease — anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="text-lg font-semibold mb-3 text-indigo-600">
            Quick Links
          </h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-indigo-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-indigo-600">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h6 className="text-lg font-semibold mb-3 text-indigo-600">
            Support
          </h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contact" className="hover:text-indigo-600">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-indigo-600">
                FAQ
              </Link>
            </li>
            <li>
              <a href="mailto:sajjadjim15@gmail.com" className="hover:text-indigo-600">
                Email Support
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h6 className="text-lg font-semibold mb-3 text-indigo-600">
            Connect with Us
          </h6>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6c0-.955.192-1.333 1.115-1.333H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.6a10 10 0 0 1-2.8.8 4.9 4.9 0 0 0 2.1-2.7c-.9.6-1.9 1-3 1.3a4.9 4.9 0 0 0-8.4 4.4A14 14 0 0 1 1.7 3 4.9 4.9 0 0 0 3.2 10 4.8 4.8 0 0 1 .9 9.5v.1a4.9 4.9 0 0 0 3.9 4.8 5 5 0 0 1-2.2.1 4.9 4.9 0 0 0 4.6 3.4A9.9 9.9 0 0 1 0 21.5a14 14 0 0 0 7.6 2.2c9.1 0 14-7.6 14-14v-.6A10 10 0 0 0 24 4.6z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452H17.2V14.8c0-1.35-.027-3.082-1.878-3.082-1.88 0-2.168 1.466-2.168 2.98v5.754H9V9h3.11v1.56h.04c.43-.814 1.49-1.67 3.07-1.67 3.28 0 3.88 2.16 3.88 4.97v6.6zM5.337 7.433a1.8 1.8 0 1 1 .004-3.6 1.8 1.8 0 0 1-.004 3.6zM6.9 20.452H3.77V9h3.13v11.452z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Doctor Appointment System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
