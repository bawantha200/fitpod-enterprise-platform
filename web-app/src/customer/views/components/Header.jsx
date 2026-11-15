import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Our Pod', href: '/our-pod' },
  { label: 'Cafe', href: '/cafe' },
  { label: 'Contact Us', href: '/contact' },
];

const buttonPrimary =
  'inline-flex items-center gap-2 rounded-md bg-[#B6FF00] px-5 py-3 text-[12px] font-bold text-black transition-colors hover:bg-white';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="absolute left-0 top-0 z-40 flex h-[88px] w-full items-center justify-between border-b border-[#303030] bg-[#0A0A0A]/95 px-6 backdrop-blur-xl sm:px-10 lg:px-12">

      {/* LOGO */}
      <Link
        to="/"
        onClick={closeMobileMenu}
        className="inline-flex items-center"
        >
        <img
            src="/images/fitpod-logo.jpg"
            alt="FitPod Logo"
            className="h-12 w-12 rounded-full border-2 border-[#B6FF00] object-cover"
        />
        </Link>

      {/* NAVIGATION */}
      <nav
        className={`${
          isMobileMenuOpen ? 'flex' : 'hidden'
        } absolute left-0 top-[88px] w-full flex-col border-b border-[#303030] bg-[#0A0A0A] px-6 py-5 lg:static lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-5 lg:border-0 lg:bg-transparent lg:p-0`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.href}
            end={link.href === '/'}
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `py-3 text-[13px] font-semibold tracking-[0.3px] transition-colors lg:py-2 ${
                isActive
                  ? 'text-[#B6FF00]'
                  : 'text-white hover:text-[#B6FF00]'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* DESKTOP ACTIONS */}
      <div className="hidden items-center gap-6 lg:flex">
        <Link
          to="/customer/login"
          className="text-[13px] font-semibold text-white transition-colors hover:text-[#B6FF00]"
        >
          Login
        </Link>

        <Link to="/customer/login" className={buttonPrimary}>
          Book Your Pod <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation"
        aria-expanded={isMobileMenuOpen}
        className="rounded-lg p-2 text-white transition-colors hover:bg-[#171717] lg:hidden"
      >
        {isMobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
      </button>

    </header>
  );
};

export default Header;
