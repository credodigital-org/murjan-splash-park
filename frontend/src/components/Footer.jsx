import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { getSiteSettings } from '../services/settingsService';

import waveTop from '../assets/HomeImages/wave-top.png';
import footerLogo from '../assets/HomeImages/footer-logo.png';
import mapImg from '../assets/HomeImages/map.png';
import instagramIcon from '../assets/HomeImages/instagram-icon.png';
import facebookIcon from '../assets/HomeImages/facebook-icon.png';

export default function Footer() {
  const [phone, setPhone] = useState('+97126756409');
  const [whatsapp, setWhatsapp] = useState('+971527186938');
  const [secondPhone, setSecondPhone] = useState('+971524153524');

  useEffect(() => {
    getSiteSettings()
      .then((settings) => {
        if (settings?.phone) {
          setPhone(settings.phone);
        }

        if (settings?.whatsapp_number) {
          setWhatsapp(settings.whatsapp_number);
        }

        if (settings?.second_phone) {
          setSecondPhone(settings.second_phone);
        }
      })
      .catch((error) => {
        console.error('Failed to load contact details:', error);
      });
  }, []);

  // Clean numbers for tel / WhatsApp links
  const phoneDigits = phone.replace(/[^0-9+]/g, '');
  const whatsappDigits = whatsapp.replace(/[^0-9]/g, '');
  const secondPhoneDigits = secondPhone.replace(/[^0-9+]/g, '');

  return (
    <footer className="relative w-full bg-[#FFE000] pt-10 sm:pt-14 lg:pt-20 pb-6 sm:pb-10 lg:pb-12 mt-8 sm:mt-12 lg:mt-16">

      {/* Wave Border */}
      <img
        src={waveTop}
        alt="Wave Border Top"
        className="absolute top-2 left-0 w-full h-auto -translate-y-[98%] pointer-events-none z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-2 sm:pt-6 lg:pt-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-12 lg:mb-14">

          {/* LEFT SIDE */}
          <div className="md:col-span-5 text-gray-800">
            <ScrollReveal animation="slide-left" delay={100}>

              {/* Logo */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 inline-flex items-center justify-center shadow-xs">
                <img
                  src={footerLogo}
                  alt="Murjan Splash Park Logo"
                  className="h-10 sm:h-14 lg:h-16 w-auto object-contain"
                />
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm leading-relaxed text-gray-800 font-medium max-w-sm mt-3 sm:mt-4">
                The region's premier family water park experience — open daily,
                creating memories since 2013.
              </p>

              {/* Address */}
              <div className="text-xs sm:text-sm space-y-0.5 sm:space-y-1 text-gray-800 font-medium mt-3 sm:mt-4">
                <p className="font-bold text-gray-900 mb-0.5 sm:mb-1">
                  Murjan Splash Park
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Murjan+Splash+Park+Abu+Dhabi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-gray-900 transition-colors"
                >
                  Inside Khalifa Park, Opp. FAB, Abu Dhabi
                </a>
              </div>

              {/* CONTACT DETAILS */}
              <div className="mt-5 sm:mt-6">

                <p className="font-bold text-gray-900 text-sm sm:text-base mb-2 sm:mb-3">
                  Contact Us
                </p>

                <div className="space-y-2">

                  {/* Main Phone */}
                  {phone && (
                    <a
                      href={`tel:${phoneDigits}`}
                      className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-800 hover:text-gray-950 hover:underline transition-colors"
                      aria-label={`Call ${phone}`}
                    >
                      <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.52 21 3 13.48 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.27 1.11l-2.2 2.2z" />
                        </svg>
                      </span>

                      <span>{phone}</span>
                    </a>
                  )}

                  {/* Second Phone */}
                  {secondPhone && (
                    <a
                      href={`tel:${secondPhoneDigits}`}
                      className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-800 hover:text-gray-950 hover:underline transition-colors"
                      aria-label={`Call ${secondPhone}`}
                    >
                      <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.52 21 3 13.48 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.27 1.11l-2.2 2.2z" />
                        </svg>
                      </span>

                      <span>{secondPhone}</span>
                    </a>
                  )}

                  {/* WhatsApp */}
                  {whatsapp && (
                    <a
                      href={`https://wa.me/${whatsappDigits}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-800 hover:text-gray-950 hover:underline transition-colors"
                      aria-label={`WhatsApp ${whatsapp}`}
                    >
                      <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M20.52 3.48A11.82 11.82 0 0012.07 0C5.5 0 .15 5.35.15 11.92c0 2.1.55 4.15 1.6 5.96L.05 24l6.27-1.64a11.88 11.88 0 005.75 1.47h.01c6.57 0 11.92-5.35 11.92-11.92a11.82 11.82 0 00-3.48-8.43zM12.08 21.8h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.72.98.99-3.63-.23-.37a9.88 9.88 0 01-1.51-5.27C2.21 6.47 6.64 2.04 12.08 2.04c2.63 0 5.1 1.03 6.96 2.9a9.82 9.82 0 012.88 6.98c0 5.45-4.43 9.88-9.84 9.88zm5.42-7.4c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35z" />
                        </svg>
                      </span>

                      <span>WhatsApp: {whatsapp}</span>
                    </a>
                  )}

                </div>
              </div>

              {/* SOCIAL MEDIA */}
              <div className="flex items-center space-x-3 pt-4 sm:pt-5">

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/murjansplashpark?igsh=cmdwNW5ubGp6emVv"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-xs hover:scale-110 transition-transform"
                  aria-label="Murjan Splash Park Instagram"
                >
                  <img
                    src={instagramIcon}
                    alt="Instagram"
                    className="w-4 h-4 object-contain brightness-0 invert"
                  />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/MurjanSplashParkOfficial/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#1877F2] flex items-center justify-center shadow-xs hover:scale-110 transition-transform"
                  aria-label="Murjan Splash Park Facebook"
                >
                  <img
                    src={facebookIcon}
                    alt="Facebook"
                    className="w-4 h-4 object-contain brightness-0 invert"
                  />
                </a>

              </div>

            </ScrollReveal>
          </div>

          {/* RIGHT SIDE — MAP */}
          <div className="md:col-span-7">
            <ScrollReveal animation="slide-right" delay={200}>

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

        {/* COPYRIGHT */}
        <div className="border-t border-black/10 pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-xs text-gray-700 space-y-2 sm:space-y-0 text-center sm:text-left">

          <p>
            © 2026 Murjan Splash Park. All rights reserved.
          </p>

          {/* Future Links */}
          {/*
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 font-medium">
            <Link
              to="/privacy-policy"
              className="hover:underline no-underline text-gray-700"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-of-service"
              className="hover:underline no-underline text-gray-700"
            >
              Terms of Service
            </Link>

            <Link
              to="/cookie-settings"
              className="hover:underline no-underline text-gray-700"
            >
              Cookie Settings
            </Link>
          </div>
          */}

        </div>

      </div>
    </footer>
  );
}