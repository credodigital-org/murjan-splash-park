import React, { useState } from 'react';
import Card3D from '../components/Card3D';
import ScrollReveal from '../components/ScrollReveal';
// Hero Assets
import herobg from '../assets/BirthdayPartyImages/herobg.png';
import mainhead from '../assets/BirthdayPartyImages/herotext.png';
import callIcon from '../assets/BirthdayPartyImages/call.png';
import whatsappIcon from '../assets/BirthdayPartyImages/whatsapp.png';

// Section 4 Assets (Birthday Party Package)
import packageGirlImg from '../assets/BirthdayPartyImages/package-girl.png';
import happyBirthdayBadge from '../assets/BirthdayPartyImages/happy-birthday-badge.png';
import cakeBadge from '../assets/BirthdayPartyImages/cake-badge.png';


// Section 6 Assets (Themes)
import themeHelloKitty from '../assets/BirthdayPartyImages/theme-kitty.png';
import themeSuperHero from '../assets/BirthdayPartyImages/theme-superhero.png';
import themePrincess from '../assets/BirthdayPartyImages/theme-princess.png';
import themeUnicorn from '../assets/BirthdayPartyImages/theme-unicorn.png';
import themeMoana from '../assets/BirthdayPartyImages/theme-moana.png';

// Section 7 Assets (Birthday Moments Overlapping Polaroids)
import moment1 from '../assets/BirthdayPartyImages/moment-1.png';
import moment2 from '../assets/BirthdayPartyImages/moment-2.png';
import moment3 from '../assets/BirthdayPartyImages/moment-3.png';
import moment4 from '../assets/BirthdayPartyImages/moment-4.png';

export default function BirthdayParty() {

  const [moments, setMoments] = useState([moment1, moment2, moment3, moment4]);

const handleCardClick = (clickedIndex) => {
  if (clickedIndex === 0) return;
  setMoments((prevMoments) => {
    const updatedMoments = [...prevMoments];
    const temp = updatedMoments[0];
    updatedMoments[0] = updatedMoments[clickedIndex];
    updatedMoments[clickedIndex] = temp;
    return updatedMoments;
  });
};
  return (
    <div className="w-full font-sans pb-0 overflow-x-hidden">
      
      {/* SECTION 1: HERO & MAIN HEAD OVERLAY */}
      <section className="relative w-full flex justify-center items-center">
        <img
          src={herobg}
          alt="Birthday Party Hero Background"
          className="w-full h-auto max-w-full object-cover block"
        />

        <div className="absolute inset-0 flex justify-center items-center pointer-events-none px-4">
          <ScrollReveal animation="zoom-in" delay={100} className="w-full max-w-4xl flex justify-center">
            <img
              src={mainhead}
              alt="Celebrate Your Child's Birthday With Us"
              className="w-full max-w-3xl h-auto object-contain"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: CONTACT & BOOKING ACTION BUTTONS */}
      <section className="relative z-10 w-full bg-white pt-10 sm:pt-14 pb-8 sm:pb-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          
          {/* Phone Call Card */}
          {/* <ScrollReveal animation="slide-left" delay={100} className="w-full sm:w-auto">
            <Card3D intensity={8}>
              <a
                href="tel:+97126756409"
                className="flex items-center justify-center space-x-3 bg-white border border-gray-200 rounded-full py-3.5 px-6 shadow-sm hover:shadow-md transition-all no-underline w-full"
              >
                <img src={callIcon} alt="Call Icon" className="w-8 h-8 sm:w-9 sm:h-9 object-contain flex-shrink-0" />
                <span className="font-bold text-gray-900 text-xs sm:text-sm md:text-base">
                  Book Now: +971 52718638 & +971 26756409
                </span>
              </a>
            </Card3D>
          </ScrollReveal> */}

          {/* Phone Call Card */}
<ScrollReveal animation="slide-left" delay={100} className="w-full sm:w-auto">
  <Card3D intensity={8}>
    <a
      href="tel:+97126756409"
      className="flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-full py-3.5 px-4 sm:px-6 shadow-sm hover:shadow-md transition-all no-underline w-full sm:w-auto min-w-0"
    >
      <img
        src={callIcon}
        alt="Call Icon"
        className="w-8 h-8 sm:w-9 sm:h-9 object-contain flex-shrink-0"
      />

      {/* <span className="font-bold text-gray-900 text-xs sm:text-sm md:text-base text-center leading-snug break-words">
        Book Now: +971 52718638 & +971 26756409
      </span> */}

      {/* <span className="font-bold text-gray-900 text-[11px] sm:text-sm md:text-base text-center leading-snug min-w-0"></span> */}
      {/* <span className="font-bold text-gray-900 text-[11px] sm:text-sm md:text-base text-center leading-snug min-w-0">
  Book Now: +971 52718638 & +971 26756409
</span> */}

{/* <span className="font-bold text-gray-900 text-[11px] sm:text-sm md:text-base text-center leading-snug min-w-0">
  <span className="block">Book Now</span>
  <span className="block">+971 52718638 & +971 26756409</span>
</span> */}
<span className="font-bold text-gray-900 text-[11px] sm:text-sm md:text-base text-center leading-snug min-w-0">
  <span className="block">Book Now: +971 527186938</span>
  <span className="block">& +971 26756409</span>
</span>
    </a>
  </Card3D>
</ScrollReveal>

          {/* WhatsApp Card */}
          {/* <ScrollReveal animation="slide-right" delay={200} className="w-full sm:w-auto">
            <Card3D intensity={8}>
              <a
                href="https://wa.me/97152718638"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 bg-white border border-gray-200 rounded-full py-3.5 px-6 shadow-sm hover:shadow-md transition-all no-underline w-full"
              >
                <img src={whatsappIcon} alt="WhatsApp Icon" className="w-8 h-8 sm:w-9 sm:h-9 object-contain flex-shrink-0" />
                <span className="font-bold text-gray-900 text-xs sm:text-sm md:text-base">
                  Contact Us WhatsApp for Enquiries
                </span>
              </a>
            </Card3D>
          </ScrollReveal> */}
          {/* WhatsApp Card */}
<ScrollReveal animation="slide-right" delay={200} className="w-full sm:w-auto">
  <Card3D intensity={8}>
    <a
      // href="https://wa.me/971527186938"
      href="https://wa.me/971527186938"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-full py-3.5 px-4 sm:px-6 shadow-sm hover:shadow-md transition-all no-underline w-full sm:w-auto min-w-0"
    >
      <img
        src={whatsappIcon}
        alt="WhatsApp Icon"
        className="w-8 h-8 sm:w-9 sm:h-9 object-contain flex-shrink-0"
      />

      <span className="font-bold text-gray-900 text-xs sm:text-sm md:text-base text-center leading-snug break-words">
        Contact Us WhatsApp for Enquiries
      </span>
    </a>
  </Card3D>
</ScrollReveal>

        </div>
      </section>

      {/* SECTION 3: INTRODUCTORY PARAGRAPH */}
      <section className="relative z-10 w-full flex justify-center items-center px-4 sm:px-8 bg-white mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal animation="fade-up" delay={100}>
            <p className="text-xs sm:text-sm md:text-base font-normal text-gray-800 leading-relaxed sm:leading-loose tracking-tight [text-wrap:pretty]">
  Have a dream of celebrating your birthday with a birthday party in water park Abu Dhabi? We make birthdays magical, filled with laughter, fun, and full of snap-worthy moments. Ready to have a splash-tastic birthday with us? Because we are! And we aim to transform ordinary birthdays into truly extraordinary events that you will be proud to share on social media. Just like our theme park and water rides, we have something for everyone here, so if you are a kid, a teen splash park birthday party with us.
</p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4: BIRTHDAY PARTY PACKAGE BANNER */}
      <section className="relative w-full px-4 sm:px-8 py-2 flex justify-center">
        <div className="max-w-5xl w-full">
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="relative bg-[#FFEB60] rounded-[32px] p-6 sm:p-10 shadow-lg overflow-hidden">
              
              {/* Happy Birthday Top Right Banner */}
              <img
  src={happyBirthdayBadge}
  alt="Happy Birthday"
  className="absolute top-116 right-3 sm:-top-5 sm:right-6 lg:top-5 lg:right-6 w-20 sm:w-28 h-auto object-contain z-20"
/>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00BCDE] mb-6 sm:mb-8">
                Birthday Party Package
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Left Card: Image & Price */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-between shadow-sm">
                  <div className="w-full overflow-hidden rounded-2xl mb-4">
                    <img
                      src={packageGirlImg}
                      alt="Birthday Party Package"
                      className="w-full h-64 sm:h-80 object-cover rounded-2xl"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#38C695]">
                      Price : AED 100 Per Kid
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-1">
                      Minimum Number of Kids : 20
                    </p>
                    <p className="text-xs sm:text-sm font-itallian text-gray-700 mt-1">Custom Packages Also Available </p>
                  </div>
                </div>

                {/* Right Columns: Package Details & Theme Info */}
                <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                  
                  {/* Package Includes Card */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#00BCDE] mb-4 text-center">
                      Package Includes
                    </h3>
                    <ul className="space-y-3 text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wide">
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-black rounded-full inline-block"></span>
                        <span>FREE ACCESS TO THE ENTIRE PARK</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-black rounded-full inline-block"></span>
                        <span>DEDICATED BIRTHDAY SEATING AREA</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-black rounded-full inline-block"></span>
                        <span>1 ADULT FREE WITH EVERY CHILD</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-black rounded-full inline-block"></span>
                        <span>E-INVITATION PROVIDED</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-black rounded-full inline-block"></span>
                        <span>"Free Kid's Meal Included in the Package"</span>
                      </li>
                    </ul>
                  </div>

                  {/* Additional Theme Info Card */}
                  <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
                    {/* Cake Sticker overlapping bottom right */}
                    <img
                      src={cakeBadge}
                      alt="Birthday Cake"
                      className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 w-20 sm:w-28 h-auto object-contain z-20"
                    />
                    <p className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed pr-6">
                      <span className="font-bold text-gray-900">Additional Themed Decorations on Additional price of Dhs:500.00</span><br />
                      Theme options: Hello kitty / Super Hero / Barbie /Unicorn / Moana.<br />
                      With Themed cake table and Cake plates.
                    </p>
                  </div>

                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE MURJAN SPLASH PARK & 4 ICON CARDS */}
      <section className="relative w-full px-4 sm:px-8 py-12 flex justify-center bg-white">
        <div className="max-w-5xl w-full space-y-12">
          
          {/* Top Row: Heading/Text & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ScrollReveal animation="slide-left" delay={100}>
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00BCDE] leading-tight mb-4">
                  Why Choose<br />Murjan Splash<br />Park?
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-md">
                  Make your child's next birthday unforgettable with our premium party packages in Abu Dhabi. From thrilling water slides to safe, dedicated celebration areas, we provide everything needed for a splashing good time.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-right" delay={150}>
              <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={moment4}
                  alt="Murjan Splash Park Birthday Seating"
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Bottom Row: 4 Round Icon Benefit Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-gradient-to-b from-cyan-50/50 to-white border border-gray-100 rounded-2xl p-6 flex flex-col items-start justify-between min-h-[160px] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#D5F5FA] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#00BCDE]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#00BCDE] text-base leading-snug">
                  We have rides for all
                </h3>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-gradient-to-b from-cyan-50/50 to-white border border-gray-100 rounded-2xl p-6 flex flex-col items-start justify-between min-h-[160px] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#D5F5FA] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#00BCDE]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8s0 0 0 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#00BCDE] text-base leading-snug">
                  Perfectly Safe and Secure
                </h3>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="bg-gradient-to-b from-cyan-50/50 to-white border border-gray-100 rounded-2xl p-6 flex flex-col items-start justify-between min-h-[160px] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#D5F5FA] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#00BCDE]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#00BCDE] text-base leading-snug">
                  Unique Party Areas
                </h3>
              </div>
            </ScrollReveal>

            {/* Card 4 */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="bg-gradient-to-b from-cyan-50/50 to-white border border-gray-100 rounded-2xl p-6 flex flex-col items-start justify-between min-h-[160px] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#D5F5FA] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#00BCDE]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#00BCDE] text-base leading-snug">
                  Customisable and themed
                </h3>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* SECTION 6: CHOOSE YOUR BIRTHDAY THEME (6 GRID CARDS) */}
      <section className="relative w-full px-4 sm:px-8 py-12 flex justify-center bg-white">
        <div className="max-w-5xl w-full">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00BCDE] mb-3">
                Choose Your Birthday Theme
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Select a magical theme to make your celebration unforgettable. We'll tailor the decorations and activities to match!
              </p>
            </ScrollReveal>
          </div>

          {/* 6 Theme Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Theme 1 */}
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-between min-h-[300px] hover:shadow-md transition-shadow">
                <div className="w-full h-36 flex items-center justify-center mb-4">
                  <img src={themeHelloKitty} alt="Hello Kitty" className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Hello Kitty</h3>
                  <p className="text-xs text-gray-500">Purr-fectly pink celebration</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Theme 2 */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-between min-h-[300px] hover:shadow-md transition-shadow">
                <div className="w-full h-36 flex items-center justify-center mb-4">
                  <img src={themeSuperHero} alt="Super Hero" className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Super Hero</h3>
                  <p className="text-xs text-gray-500">Action-packed adventures</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Theme 3 */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-between min-h-[300px] hover:shadow-md transition-shadow">
                <div className="w-full h-36 flex items-center justify-center mb-4">
                  <img src={themePrincess} alt="Princess Popstar" className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Princess Popstar</h3>
                  <p className="text-xs text-gray-500">Glamorous rockstar fun</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Theme 4 */}
            <ScrollReveal animation="fade-up" delay={250}>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-between min-h-[300px] hover:shadow-md transition-shadow">
                <div className="w-full h-36 flex items-center justify-center mb-4">
                  <img src={themeUnicorn} alt="Magical Unicorn" className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Magical Unicorn</h3>
                  <p className="text-xs text-gray-500">Rainbows and sparkles</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Theme 5 */}
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-between min-h-[300px] hover:shadow-md transition-shadow">
                <div className="w-full h-36 flex items-center justify-center mb-4">
                  <img src={themeMoana} alt="Moana Adventure" className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Moana Adventure</h3>
                  <p className="text-xs text-gray-500">Ocean splash party</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Theme 6: Custom Theme Dotted Card */}
            <ScrollReveal animation="fade-up" delay={350}>
              <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-gray-300 text-center flex flex-col items-center justify-center min-h-[300px] hover:border-cyan-400 transition-colors">
                <div className="w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center mb-4 text-[#00BCDE]">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.5c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.2 19.64 10.55 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-3 8c-.83 0-1.5-.67-1.5-1.5S8.17 8 9 8s1.5.67 1.5 1.5S9.83 11 9 11zm3-3c-.83 0-1.5-.67-1.5-1.5S11.17 5 12 5s1.5.67 1.5 1.5S12.83 8 12 8zm3 3c-.83 0-1.5-.67-1.5-1.5S14.17 8 15 8s1.5.67 1.5 1.5S15.83 11 15 11z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Custom Theme</h3>
                <p className="text-xs text-gray-500">Let’s build it together</p>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* SECTION 7: MURJAN'S BIRTHDAY MOMENTS (POLAROID OVERLAY STACK) */}
      <section className="relative w-full px-4 sm:px-8 py-16 flex justify-center bg-white overflow-hidden">
        <div className="max-w-5xl w-full">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00BCDE] mb-3">
                Murjan’s Birthday Moments
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Celebrate every joyful moment at Murjan, where laughter, splashes, and memories come together for a day to remember.
              </p>
            </ScrollReveal>
          </div>

          {/* Overlapping Polaroids Container */}
<div className="relative min-h-[350px] sm:min-h-[440px] lg:min-h-[500px] w-full flex justify-center items-center -mb-0 sm:pb-1 lg:pb-10">  
  {/* Cyan Radial Glow Background */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[650px] aspect-square bg-[#E0F7FD] rounded-full blur-3xl opacity-90 pointer-events-none z-0" />  <ScrollReveal animation="zoom-in" delay={150} className="w-full flex justify-center">
    
    {/* Desktop Dynamic Layering Layout */}
    <div className="relative w-full max-w-4xl h-[420px] sm:h-[520px]">
      
      {/* Slot 1: Primary Main Position (Top Center-Left) */}
      <div 
        onClick={() => handleCardClick(0)}
        className="absolute top-0 left-[18%] sm:left-[22%] w-44 sm:w-64 bg-white p-3 sm:p-4 rounded-2xl shadow-xl transform -rotate-6 transition-all duration-500 hover:scale-105 z-30 cursor-pointer"
      >
        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
          <img src={moments[0]} alt="Birthday Moment 1" className="w-full h-full object-cover select-none" />
        </div>
      </div>

      {/* Slot 2: (Top Center-Right) */}
      <div 
        onClick={() => handleCardClick(1)}
        className="absolute top-10 right-[10%] sm:right-[15%] w-52 sm:w-80 bg-white p-3 sm:p-4 rounded-2xl shadow-xl transform rotate-3 transition-all duration-500 hover:scale-105 z-10 cursor-pointer"
      >
        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
          <img src={moments[1]} alt="Birthday Moment 2" className="w-full h-full object-cover select-none" />
        </div>
      </div>

      {/* Slot 3: (Bottom Left) */}
      <div 
        onClick={() => handleCardClick(2)}
        className="absolute bottom-2 left-[5%] sm:left-[10%] w-48 sm:w-72 bg-white p-3 sm:p-4 rounded-2xl shadow-2xl transform -rotate-12 transition-all duration-500 hover:scale-105 z-20 cursor-pointer"
      >
        <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
          <img src={moments[2]} alt="Birthday Moment 3" className="w-full h-full object-cover select-none" />
        </div>
      </div>

      {/* Slot 4: (Bottom Center) */}
      <div 
        onClick={() => handleCardClick(3)}
        className="absolute bottom-0 left-[42%] sm:left-[40%] w-36 sm:w-56 bg-white p-3 sm:p-4 rounded-2xl shadow-2xl transform rotate-2 transition-all duration-500 hover:scale-105 z-20 cursor-pointer"
      >
        <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
          <img src={moments[3]} alt="Birthday Moment 4" className="w-full h-full object-cover select-none" />
        </div>
      </div>

    </div>

  </ScrollReveal>
</div>
        </div>
      </section>

    </div>
  );
}