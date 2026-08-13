import React, { useEffect, useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { getTicketPricing } from '../services/ticketsService';
import { getSiteSettings, getWorkingHours } from '../services/settingsService';
import { formatTime12h } from '../utils/format';
import SEO from '../components/SEO';

// Hero Assets
import herobg from '../assets/TicketImages/herobg.png';

export default function Tickets() {
  const [kidsPrice, setKidsPrice] = useState('85');
  const [adultsPrice, setAdultsPrice] = useState('40');
  const [currency, setCurrency] = useState('AED');
  const [phone, setPhone] = useState('+97126756409');
  const [whatsapp, setWhatsapp] = useState('+971527186938');
  const [bookingUrl, setBookingUrl] = useState('');
  // const [hoursLabel, setHoursLabel] = useState('1.00PM to 09.00PM');
  const [weekdaysHoursLabel, setWeekdaysHoursLabel] = useState('');
  const [weekendHoursLabel, setWeekendHoursLabel] = useState('');

useEffect(() => {
  getTicketPricing()
    .then((types) => {
      const kids = types.find((t) =>
        t.name.toLowerCase().includes("kid")
      );

      const adults = types.find((t) =>
        t.name.toLowerCase().includes("adult")
      );

      if (kids) {
        setKidsPrice(kids.price);
        setCurrency(kids.currency);
      }

      if (adults) {
        setAdultsPrice(adults.price);
      }
    })
    .catch(() => {});

  getSiteSettings()
    .then((s) => {
      if (s.phone) setPhone(s.phone);
      if (s.whatsapp_number) setWhatsapp(s.whatsapp_number);
      if (s.booking_redirect_url) setBookingUrl(s.booking_redirect_url);
    })
    .catch(() => {});

  getWorkingHours()
    .then((hours) => {
      // Monday - Friday
      const monday = hours.find((h) => h.day === "mon");

      if (monday?.opening_time && monday?.closing_time) {
        setWeekdaysHoursLabel(
          `${formatTime12h(monday.opening_time)} to ${formatTime12h(
            monday.closing_time
          )}`
        );
      }

      // Saturday - Sunday
      const saturday = hours.find((h) => h.day === "sat");

      if (saturday?.opening_time && saturday?.closing_time) {
        setWeekendHoursLabel(
          `${formatTime12h(saturday.opening_time)} to ${formatTime12h(
            saturday.closing_time
          )}`
        );
      }
    })
    .catch((err) => {
      console.error("Failed to load working hours:", err);
    });
}, []);

  const phoneDigits = phone.replace(/[^0-9+]/g, '');
  const whatsappDigits = whatsapp.replace(/[^0-9+]/g, '');

  const BookButton = ({ children = 'Select Tickets' }) => (
    <a
      href={bookingUrl || '#'}
      target={bookingUrl ? '_blank' : undefined}
      rel={bookingUrl ? 'noopener noreferrer' : undefined}
      className="w-full bg-[#FFD600] hover:bg-[#f2cb00] text-gray-900 font-bold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-sm active:scale-[0.98] inline-block text-center no-underline"
    >
      {children}
    </a>
  );
  return (
    <div className="w-full font-sans pb-0 overflow-x-hidden bg-white">
      <SEO pageSlug="tickets" defaultTitle="Murjan Splash Park Tickets | Book Online - Abu Dhabi" defaultDescription="Murjan Splash Park ticket prices and booking." />

      {/* SECTION 1: HERO AREA */}
      <section className="relative w-full flex justify-center items-center min-h-[220px] sm:min-h-[280px] md:min-h-[340px] bg-[#E8F8FA]">
        <img
          src={herobg}
          alt="Murjan Splash Park Banner"
          className="absolute inset-0 w-full h-full object-cover block"
        />

        {/* White Card Overlay with Title */}
        <div className="relative z-10 w-full max-w-2xl mx-4 my-8">
          <ScrollReveal animation="zoom-in" delay={100}>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-8 sm:py-10 text-center border border-white/60">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#00BCDE] tracking-tight mb-2">
                Book Your Adventure
              </h1>
              <p className="text-[11px] sm:text-xs text-gray-500 max-w-md mx-auto font-normal leading-relaxed">
                Dive into a world of endless fun and thrilling rides. Secure your spot at Murjan today!
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: TICKET CARDS */}
      <section className="relative w-full px-4 sm:px-8 py-12 sm:py-16 bg-[#F4FCFE] flex justify-center">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">

          {/* TICKET CARD 1: SINGLE DAY TICKET */}
          <ScrollReveal animation="fade-up" delay={150} className="h-full">
            <div className="bg-gradient-to-b from-[#D8F3F8] via-[#E8F8FB] to-[#DDF5F9] rounded-3xl p-6 sm:p-8 shadow-sm border border-cyan-100 flex flex-col items-center text-center h-full relative overflow-hidden">
              
              {/* Circular Icon Top */}
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-6 h-6 text-[#00BCDE]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-[#0A3242] mb-1">
                Single Day Ticket
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500 mb-6">
                Unlimited all day access to "Murjan Splash Park"
              </p>

              {/* Pricing Rows */}
              <div className="w-full space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-gray-700 pb-2 border-b border-cyan-100/60">
                  <span>Kids (2 to 18 Years Old)</span>
                  <span className="text-[#00BCDE] font-bold text-sm sm:text-base">{currency} {kidsPrice}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-gray-700 pb-2 border-b border-cyan-100/60">
                  <span>Adults (Above 18 Years Old)</span>
                  <span className="text-[#00BCDE] font-bold text-sm sm:text-base">{currency} {adultsPrice}</span>
                </div>
              </div>

              {/* Free Entry Badge */}
              <div className="mt-auto mb-6 bg-[#FCE8E6] px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 border border-red-100">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                <p className="text-[10px] sm:text-[11px] font-bold text-red-600">
                  Children below 2 years or below 0.75 cm <span className="uppercase">FREE!</span>
                </p>
              </div>

              {/* Action Button */}
              <BookButton />
            </div>
          </ScrollReveal>

          {/* TICKET CARD 2: SCHOOL BULK BOOKING */}
          <ScrollReveal animation="fade-up" delay={200} className="h-full">
            <div className="bg-gradient-to-b from-[#D8F3F8] via-[#E8F8FB] to-[#DDF5F9] rounded-3xl p-6 sm:p-8 shadow-sm border border-cyan-100 flex flex-col items-center text-center h-full relative overflow-hidden">
              
              {/* Circular Icon Top */}
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-6 h-6 text-[#00BCDE]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-[#0A3242] mb-1">
                School Bulk Booking Available
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500 mb-6">
                For more details and pricing please get in touch with us.
              </p>

              {/* Inner Call/WhatsApp Container */}
              <div className="w-full bg-white/70 backdrop-blur-xs rounded-2xl p-4 mb-6 text-center border border-white/80">
                <p className="text-[10px] font-bold tracking-wider uppercase text-gray-600 mb-2">
                  CALL OR WHATSAPP
                </p>
                <div className="space-y-1.5">
                  <a href={`tel:${whatsappDigits}`} className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#00BCDE] hover:underline">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.52 21 3 13.48 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.27 1.11l-2.2 2.2z"/>
                    </svg>
                    {whatsapp}
                  </a>
                  <p className="text-[10px] text-gray-400 font-medium">— or —</p>
                  <a href={`tel:${phoneDigits}`} className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#00BCDE] hover:underline">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.52 21 3 13.48 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.27 1.11l-2.2 2.2z"/>
                    </svg>
                    {phone}
                  </a>
                </div>
              </div>

              {/* Free Entry Badge */}
              <div className="mt-auto mb-6 bg-[#FCE8E6] px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 border border-red-100">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                <p className="text-[10px] sm:text-[11px] font-bold text-red-600">
                  Children below 2 years or below 0.75 cm <span className="uppercase">FREE!</span>
                </p>
              </div>

              {/* Action Button */}
              {/* <BookButton /> */}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* SECTION 3: OPENING HOURS (DARK NAVY SECTION) */}
{/* SECTION 3: OPENING HOURS (DARK NAVY SECTION) */}
<section className="relative w-full bg-[#080B38] pt-12 sm:pt-16 pb-20 sm:pb-28 px-4 text-white flex flex-col items-center">
          <ScrollReveal animation="fade-up" delay={100} className="w-full max-w-2xl flex flex-col items-center text-center">
          
          {/* Clock Icon */}
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3 text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 tracking-wide">
            Opening Hours
          </h2>

          <div className="w-full space-y-8">
            
            {/* Monday - Friday */}
            <div className="bg-[#12164A]/80 border border-white/10 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span className="text-sm sm:text-base font-bold text-gray-100">
                Monday - Friday
              </span>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block w-8 h-[1px] bg-white/30"></span>
                {/* <span className="text-xs sm:text-sm font-semibold text-gray-300">
                  {hoursLabel}
                </span> */}
                <span className="text-xs sm:text-sm font-semibold text-gray-300">
  {weekdaysHoursLabel}
</span>
              </div>
            </div>

            {/* Saturday - Sunday */}
            <div className="bg-[#12164A]/80 border border-white/10 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span className="text-sm sm:text-base font-bold text-gray-100">
                Saturday - Sunday
              </span>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block w-8 h-[1px] bg-white/30"></span>
                {/* <span className="text-xs sm:text-sm font-semibold text-gray-300">
                  {hoursLabel}
                </span> */}

                <span className="text-xs sm:text-sm font-semibold text-gray-300">
  {weekendHoursLabel}
</span>
              </div>
            </div>

          </div>

        </ScrollReveal>
      </section>

    </div>
  );
}