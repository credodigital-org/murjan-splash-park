import React, { useEffect, useState } from 'react';
import { getSiteSettings } from '../services/settingsService';

export default function FloatingContactButtons() {
  const [phone, setPhone] = useState('+97126756409');
  const [whatsapp, setWhatsapp] = useState('+971527186938');

  useEffect(() => {
    getSiteSettings()
      .then((settings) => {
        if (settings?.phone) {
          setPhone(settings.phone);
        }

        if (settings?.whatsapp_number) {
          setWhatsapp(settings.whatsapp_number);
        }
      })
      .catch((error) => {
        console.error(
          'Failed to load floating contact details:',
          error
        );
      });
  }, []);

  // Clean numbers for links
  const phoneDigits = phone.replace(/[^0-9+]/g, '');
  const whatsappDigits = whatsapp.replace(/[^0-9]/g, '');

  return (
    <div
      className="
        fixed
        bottom-5 right-4
        sm:bottom-6 sm:right-6
        z-[9999]
        flex flex-col
        items-end
        gap-3
      "
    >

      {/* =========================================================
          WHATSAPP BUTTON
      ========================================================= */}
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsappDigits}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Murjan Splash Park on WhatsApp"
          title="WhatsApp"
          className="
            group
            flex items-center
            rounded-full
            overflow-hidden
            bg-white
            border-2 border-[#008C95]
            shadow-[0_6px_20px_rgba(0,0,0,0.18)]
            transition-all duration-300
            hover:scale-105
            hover:shadow-[0_8px_25px_rgba(0,0,0,0.25)]
            active:scale-95
          "
        >
          {/* Desktop Label */}
          <span
            className="
              hidden sm:block
              pl-4 pr-2
              text-sm
              font-bold
              text-[#080B38]
              whitespace-nowrap
            "
          >
            WhatsApp
          </span>

          {/* WhatsApp Icon */}
          <span
            className="
              w-12 h-12
              sm:w-14 sm:h-14
              rounded-full
              bg-[#008C95]
              flex items-center justify-center
              text-white
              transition-transform duration-300
              group-hover:rotate-6
            "
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.52 3.48A11.82 11.82 0 0012.07 0C5.5 0 .15 5.35.15 11.92c0 2.1.55 4.15 1.6 5.96L.05 24l6.27-1.64a11.88 11.88 0 005.75 1.47h.01c6.57 0 11.92-5.35 11.92-11.92a11.82 11.82 0 00-3.48-8.43zM12.08 21.8h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.72.98.99-3.63-.23-.37a9.88 9.88 0 01-1.51-5.27C2.21 6.47 6.64 2.04 12.08 2.04c2.63 0 5.1 1.03 6.96 2.9a9.82 9.82 0 012.88 6.98c0 5.45-4.43 9.88-9.84 9.88zm5.42-7.4c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35z" />
            </svg>
          </span>
        </a>
      )}

      {/* =========================================================
          PHONE BUTTON
      ========================================================= */}
      {phone && (
        <a
          href={`tel:${phoneDigits}`}
          aria-label="Call Murjan Splash Park"
          title={`Call ${phone}`}
          className="
            group
            flex items-center
            rounded-full
            overflow-hidden
            bg-[#080B38]
            border-2 border-[#080B38]
            shadow-[0_6px_20px_rgba(0,0,0,0.20)]
            transition-all duration-300
            hover:scale-105
            hover:shadow-[0_8px_25px_rgba(0,0,0,0.28)]
            active:scale-95
          "
        >
          {/* Desktop Label */}
          <span
            className="
              hidden sm:block
              pl-4 pr-2
              text-sm
              font-bold
              text-white
              whitespace-nowrap
            "
          >
            Call Us
          </span>

          {/* Phone Icon */}
          <span
            className="
              w-12 h-12
              sm:w-14 sm:h-14
              rounded-full
              bg-[#FFE000]
              flex items-center justify-center
              text-[#080B38]
              transition-transform duration-300
              group-hover:rotate-6
            "
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.52 21 3 13.48 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.27 1.11l-2.2 2.2z" />
            </svg>
          </span>
        </a>
      )}

    </div>
  );
}

