import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GREEN = '#B6FF00';
const BORDER = '#303030';
const MUTED = '#A0A0A0';

const Footer = () => {
  return (
    <footer
      className="border-t px-6 py-12 md:px-10 lg:px-16"
      style={{ backgroundColor: '#0A0A0A', borderColor: BORDER }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="text-3xl font-black">
              fitpod
            </Link>

            <p
              className="mt-5 max-w-xs text-sm leading-7"
              style={{ color: MUTED }}
            >
              Your private fitness space. Train your way, at your pace.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold">Explore</h4>
            <div className="flex flex-col gap-3 text-sm" style={{ color: MUTED }}>
              <Link to="/" className="hover:text-[#B6FF00]">Home</Link>
              <Link to="/about" className="hover:text-[#B6FF00]">About Us</Link>
              <Link to="/services" className="hover:text-[#B6FF00]">Services</Link>
              <Link to="/our-pod" className="hover:text-[#B6FF00]">Our Pod</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold">Discover</h4>
            <div className="flex flex-col gap-3 text-sm" style={{ color: MUTED }}>
              <Link to="/cafe" className="hover:text-[#B6FF00]">Cafe</Link>
              <Link to="/contact" className="hover:text-[#B6FF00]">Contact Us</Link>
              <Link to="/booking" className="hover:text-[#B6FF00]">Book Your Pod</Link>
              <Link to="/login" className="hover:text-[#B6FF00]">Login</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold">Get in touch</h4>

            <p className="text-sm leading-7" style={{ color: MUTED }}>
              Have questions about FitPod?
              <br />
              We'd love to hear from you.
            </p>

            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold"
              style={{ color: GREEN }}
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div
          className="mt-14 flex flex-col justify-between gap-4 border-t pt-7 text-xs sm:flex-row"
          style={{ borderColor: BORDER, color: MUTED }}
        >
          <p>© {new Date().getFullYear()} FitPod. All rights reserved.</p>
          <p>YOUR SPACE. YOUR PACE.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
