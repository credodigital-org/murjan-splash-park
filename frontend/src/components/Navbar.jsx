import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/HomeImages/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Attractions', path: '/attractions' },
    { name: 'Birthday Parties', path: '/birthdayparties' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Park Rules', path: '/parkrules' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: 72px | Tablet: 88px | Desktop: 120px */}
        <div className="flex items-center justify-between h-[72px] sm:h-[88px] lg:h-[120px]">
          
          {/* Logo - scales per breakpoint */}
          <Link to="/" className="flex-shrink-0 flex items-center no-underline">
            <img 
              src={logo} 
              alt="Murjan Splash Park Logo" 
              className="h-14 sm:h-18 lg:h-24 w-auto object-contain"
            />
          </Link>

          {/* Desktop Links (visible ≥ 1024px) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[15px] xl:text-[17px] font-extrabold tracking-wide no-underline transition-all duration-200 hover:text-[#00A896] relative py-1 ${
                    isActive ? 'text-[#00A896] border-b-3 border-[#00A896]' : 'text-gray-800 hover:scale-105'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA (visible ≥ 1024px) */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/tickets"
              className="bg-[#EAE213] hover:bg-[#d4cb10] text-gray-900 font-extrabold text-sm xl:text-base px-6 xl:px-8 py-3 xl:py-3.5 rounded-full no-underline shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Book Tickets
            </Link>
          </div>

          {/* Mobile/Tablet Toggle (visible < 1024px) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-gray-700 hover:text-cyan-600 hover:bg-gray-50 focus:outline-none transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Drawer - Full-screen overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        style={{ top: '72px' }}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Drawer Panel */}
        <div className={`relative bg-white shadow-2xl border-t border-gray-100 max-h-[calc(100vh-72px)] sm:max-h-[calc(100vh-88px)] overflow-y-auto transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="px-5 sm:px-8 pt-4 pb-8 space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3.5 sm:py-4 text-base sm:text-lg font-bold rounded-2xl no-underline transition-all ${
                    isActive 
                      ? 'text-[#00A896] bg-cyan-50' 
                      : 'text-gray-800 hover:text-cyan-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-3">
              <Link
                to="/tickets"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-[#EAE213] hover:bg-[#d4cb10] text-gray-900 font-extrabold px-6 py-4 rounded-2xl no-underline shadow-md text-base sm:text-lg transition-all"
              >
                Book Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}