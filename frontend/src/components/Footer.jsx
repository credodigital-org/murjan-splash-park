import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal'; // Adjust path if needed

import waveTop from '../assets/HomeImages/wave-top.png';
import footerLogo from '../assets/HomeImages/footer-logo.png';
import mapImg from '../assets/HomeImages/map.png';
import instagramIcon from '../assets/HomeImages/instagram-icon.png';
import facebookIcon from '../assets/HomeImages/facebook-icon.png';

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#FFE000] pt-10 sm:pt-14 lg:pt-20 pb-6 sm:pb-10 lg:pb-12 mt-8 sm:mt-12 lg:mt-16">
      <img 
        src={waveTop} 
        alt="Wave Border Top" 
        className="absolute top-2 left-0 w-full h-auto -translate-y-[98%] pointer-events-none z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-2 sm:pt-6 lg:pt-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-12 lg:mb-14">
          
          <div className="md:col-span-5 text-gray-800">
            <ScrollReveal animation="slide-left" delay={100}>
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 inline-flex items-center justify-center shadow-xs">
                <img src={footerLogo} alt="Murjan Logo" className="h-10 sm:h-14 lg:h-16 w-auto object-contain" />
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-gray-800 font-medium max-w-sm mt-3 sm:mt-4">
                The region's premier family water park experience — open daily, creating memories since 2013.
              </p>

              <div className="text-xs sm:text-sm space-y-0.5 sm:space-y-1 text-gray-800 font-medium mt-3 sm:mt-4">
                <p className="font-bold text-gray-900 mb-0.5 sm:mb-1">Murjan Splash Park</p>
                {/* <p>Inside Khalifa park,Opp. FAB ,Abu dhabi</p> */}
                <a
  href="https://www.google.com/maps/search/?api=1&query=Murjan+Splash+Park+Abu+Dhabi"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:underline hover:text-gray-900 transition-colors"
>
  Inside Khalifa Park, Opp. FAB, Abu Dhabi
</a>
              </div>

              <div className="flex items-center space-x-3 pt-3 sm:pt-4">
                <a href="https://www.instagram.com/murjansplashpark?igsh=cmdwNW5ubGp6emVv" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-xs hover:scale-110 transition-transform">
                  <img src={instagramIcon} alt="Instagram" className="w-4 h-4 object-contain brightness-0 invert" />
                </a>
                <a href="https://www.facebook.com/MurjanSplashParkOfficial/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-[#1877F2] flex items-center justify-center shadow-xs hover:scale-110 transition-transform">
                  <img src={facebookIcon} alt="Facebook" className="w-4 h-4 object-contain brightness-0 invert" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-7">
            <ScrollReveal animation="slide-right" delay={200}>
              {/* <div className="overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-md h-48 sm:h-64 md:h-72 lg:h-96 w-full">
                <img src={mapImg} alt="Location Map" className="w-full h-full object-cover" />
              </div> */}

              <a
  href="https://www.google.com/maps/search/?api=1&query=Murjan+Splash+Park+Abu+Dhabi"
  target="_blank"
  rel="noopener noreferrer"
  className="block overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-md h-48 sm:h-64 md:h-72 lg:h-96 w-full cursor-pointer"
  aria-label="Open Murjan Splash Park location in Google Maps"
>
  <img
    src={mapImg}
    alt="Murjan Splash Park Location Map"
    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
  />
</a>
            </ScrollReveal>
          </div>

        </div>

        <div className="border-t border-black/10 pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-xs text-gray-700 space-y-2 sm:space-y-0 text-center sm:text-left">
          <p>© 2026 Murjan Splash Park. All rights reserved.</p>
          {/* <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 font-medium">
            <Link to="/privacy-policy" className="hover:underline no-underline text-gray-700">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:underline no-underline text-gray-700">Terms of Service</Link>
            <Link to="/cookie-settings" className="hover:underline no-underline text-gray-700">Cookie Settings</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}