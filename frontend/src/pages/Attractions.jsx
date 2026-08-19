import React from 'react';
import Card3D from '../components/Card3D';
import ScrollReveal from '../components/ScrollReveal';

import herobg from '../assets/AttractionImages/herobg.png';
import mainhead from '../assets/AttractionImages/mainhead.png'; 

import img1 from '../assets/AttractionImages/img1.png';
import img2 from '../assets/AttractionImages/img2.png';
import img3 from '../assets/AttractionImages/img3.png';
import img4 from '../assets/AttractionImages/img4.png';
import img5 from '../assets/AttractionImages/img5.png';
import img6 from '../assets/AttractionImages/img6.png';
import img7 from '../assets/AttractionImages/img7.png';
import img8 from '../assets/AttractionImages/img8.png';
import img9 from '../assets/AttractionImages/attraction1.jpeg';
import unionWave from '../assets/AttractionImages/Union.svg'; 

import murjanRestIcon from '../assets/AttractionImages/murjan-restaurant.png';
import alShahadIcon from '../assets/AttractionImages/al-shahad.png';
import zillasRefreshIcon from '../assets/AttractionImages/zillas-refreshment.png';
import zillasCafeIcon from '../assets/AttractionImages/zillas-cafe.png';
import retailOutletIcon from '../assets/AttractionImages/retail-outlet.png';

export default function Attraction() {
  const outletsData = [
    {
      id: 1,
      title: 'Murjan Restaurant',
      description: 'Get in touch with us and enjoy a variety of food and beverages.',
      icon: murjanRestIcon,
    },
    {
      id: 2,
      title: 'Al Shahad',
      description: 'Get in touch with us and enjoy a variety of food and beverages.',
      icon: alShahadIcon, 
    },
    {
      id: 3,
      title: 'Zillas Refreshment',
      description: 'Get in touch with us and enjoy a variety of food and beverages.',
      icon: zillasRefreshIcon,
    },
    {
      id: 4,
      title: 'Zillas Cafe and Snacks',
      description:
        'Get in touch with us and enjoy a variety of food and beverages. Perfect for a quick recharge before hitting the slides again.',
      icon: zillasCafeIcon, 
      isWide: true,
    },
    {
      id: 5,
      title: 'The Murjan Retail Outlet',
      description:
        'For all kind of swimming costumes and safety accessories.',
      icon: retailOutletIcon,
    },
  ];

  return (
    <div className="w-full bg-white pb-10 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* SECTION 1: HERO & MAIN HEAD */}
      <section className="relative w-full flex justify-center items-center">
        <img
          src={herobg}
          alt="Main Play Structure Background"
          className="w-full h-auto max-w-full object-contain block"
        />

        <div className="absolute inset-0 flex justify-center items-center pointer-events-none px-4 md:px-16 pl-20">
          <ScrollReveal animation="zoom-in" delay={100} className="w-full max-w-6xl">
            <img
              src={mainhead}
              alt="Main Play Structure"
              className="w-full h-auto object-contain"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: SUBHEAD TEXT */}
      <section className="relative z-10 w-full flex justify-center items-center px-4 sm:px-8 py-8 sm:py-12 text-center bg-white">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <ScrollReveal animation="fade-up" delay={0}>
            <p className="text-xs sm:text-sm md:text-base font-normal text-slate-500 leading-relaxed sm:leading-loose">
  Welcome to Murjan Splash Park, the best water park for families in Abu Dhabi! We have done a lot of research to make our park the most sought after spot for family water games Abu Dhabi, and we invite you to come and enjoy it.<br/>
  The main attraction at Murjan Splash Park, the best water park for families in Abu Dhabi is the children’s play structure situated in a shallow pool. This vibrant area boasts of a number of fun activities through its four small water slides, a colossal tipping bucket, a crawl tunnel, water guns, a water umbrella, small tipping buckets, a water wheel, and refreshing water showers.
</p>
          </ScrollReveal>

          {/* <ScrollReveal animation="fade-up" delay={100}>
            <p className="text-sm sm:text-base md:text-lg font-normal text-slate-600 leading-relaxed sm:leading-loose">
              The main attraction at Murjan Splash Park, the best water park for families in Abu Dhabi is the children’s play structure situated in a shallow pool. This vibrant area boasts of a number of fun activities through its four small water slides, a colossal tipping bucket, a crawl tunnel, water guns, a water umbrella, small tipping buckets, a water wheel, and refreshing water showers.
            </p>
          </ScrollReveal> */}
        </div>
      </section>

      {/* SECTION 3: ALTERNATING ATTRACTIONS */}
      <section className="relative w-full bg-white py-0">
  
        {/* ROW 1: WATER SLIDES */}
        <div className="relative w-full flex flex-col md:flex-row items-stretch">
          <div className="w-full md:w-1/2">
            <ScrollReveal animation="slide-left" delay={0} className="w-full h-full">
              <Card3D intensity={10} className="w-full h-full">
                <div className="w-full h-full relative overflow-hidden min-h-[280px] sm:min-h-[360px]">
                  <img
                    src={img1}
                    alt="Water Slides"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </Card3D>
            </ScrollReveal>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            <ScrollReveal animation="slide-right" delay={100} className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center text-center p-6 sm:p-10 md:p-14 bg-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#20C8EC] tracking-wide mb-3 uppercase border-b-2 border-[#20C8EC] pb-1 inline-block">
                  WATER SLIDES
                </h2>
                <p className="max-w-md text-[11px] sm:text-[13px] md:text-[14px] font-normal italic text-slate-500 leading-relaxed tracking-normal normal-case">
                  “The water slides at the park is perfect for kids looking for gentle fun, with slow gentle slope and shallow water at the bottom. Its designed for young children's to enjoy safely. Brightly coloured and easy to climb and always under the supervision of our lifeguards.”
                </p>
              </div>
            </ScrollReveal>
          </div>

          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 2: LAZY RIVER */}
        <div className="relative w-full flex flex-col md:flex-row-reverse items-stretch">
          <div className="w-full md:w-1/2">
            <ScrollReveal animation="slide-right" delay={0} className="w-full h-full">
              <Card3D intensity={10} className="w-full h-full">
                <div className="w-full h-full relative overflow-hidden min-h-[280px] sm:min-h-[360px]">
                  <img
                    src={img2}
                    alt="Lazy River"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </Card3D>
            </ScrollReveal>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            <ScrollReveal animation="slide-left" delay={100} className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center text-center p-6 sm:p-10 md:p-14 bg-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#20C8EC] tracking-wide mb-3 uppercase border-b-2 border-[#20C8EC] pb-1 inline-block">
                  LAZY RIVER
                </h2>
                <p className="max-w-md text-[11px] sm:text-[13px] md:text-[14px] font-normal italic text-slate-500 leading-relaxed tracking-normal normal-case">
                  “Immerse yourself in leisure at our family water park Abu Dhabi. Our well-maintained, clean and hygienic 257-meter lazy river, gently winds its way through the park at a depth of 0.6 meters. You can take one of our tubes, secure yourself inside it, and let the tranquil currents guide you through the scenic twists and turns of this water oasis. It's the perfect way to unwind and enjoy a carefree journey surrounded by the beauty of Murjan's picturesque landscapes.”
                </p>
              </div>
            </ScrollReveal>
          </div>

          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 3: SWIMMING POOL */}
        <div className="relative w-full flex flex-col md:flex-row items-stretch">
          <div className="w-full md:w-1/2">
            <ScrollReveal animation="slide-left" delay={0} className="w-full h-full">
              <Card3D intensity={10} className="w-full h-full">
                <div className="w-full h-full relative overflow-hidden min-h-[280px] sm:min-h-[360px]">
                  <img
                    src={img3}
                    alt="Swimming Pool"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </Card3D>
            </ScrollReveal>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            <ScrollReveal animation="slide-right" delay={100} className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center text-center p-6 sm:p-10 md:p-14 bg-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#20C8EC] tracking-wide mb-3 uppercase border-b-2 border-[#20C8EC] pb-1 inline-block">
                  SWIMMING POOL
                </h2>
                <p className="max-w-md text-[11px] sm:text-[13px] md:text-[14px] font-normal italic text-slate-500 leading-relaxed tracking-normal normal-case">
                  “Indulge in fun at the family water games Abu Dhabi spot at Murjan. Dive into a world of relaxation and fun for all ages! Our swimming pools offer refreshing escapes for both adults and kids alike, where every splash is a moment of joy and every swim is a memory in the making. Join us for endless aquatic adventures and unforgettable family moments!”
                </p>
              </div>
            </ScrollReveal>
          </div>

          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 4: BUMPER BOATS */}
        <div className="relative w-full flex flex-col md:flex-row-reverse items-stretch">
          <div className="w-full md:w-1/2">
            <ScrollReveal animation="slide-right" delay={0} className="w-full h-full">
              <Card3D intensity={10} className="w-full h-full">
                <div className="w-full h-full relative overflow-hidden min-h-[280px] sm:min-h-[360px]">
                  <img
                    src={img4}
                    alt="Bumper Boats"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </Card3D>
            </ScrollReveal>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            <ScrollReveal animation="slide-left" delay={100} className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center text-center p-6 sm:p-10 md:p-14 bg-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#20C8EC] tracking-wide mb-3 uppercase border-b-2 border-[#20C8EC] pb-1 inline-block">
                  BUMPER BOATS
                </h2>
                <p className="max-w-md text-[11px] sm:text-[13px] md:text-[14px] font-normal italic text-slate-500 leading-relaxed tracking-normal normal-case">
                  “Navigate the waters with our steerable, battery-operated boats designed for kids! Watch with pride as little captains take control and drive around engaging in playful and gentle collisions.”
                </p>
              </div>
            </ScrollReveal>
          </div>

          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 5: RAINBOW ARCHES */}
        <div className="relative w-full flex flex-col md:flex-row items-stretch">
          <div className="w-full md:w-1/2">
            <ScrollReveal animation="slide-left" delay={0} className="w-full h-full">
              <Card3D intensity={10} className="w-full h-full">
                <div className="w-full h-full relative overflow-hidden min-h-[280px] sm:min-h-[360px]">
                  <img
                    src={img5}
                    alt="Rainbow Arches"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </Card3D>
            </ScrollReveal>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            <ScrollReveal animation="slide-right" delay={100} className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center text-center p-6 sm:p-10 md:p-14 bg-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#20C8EC] tracking-wide mb-3 uppercase border-b-2 border-[#20C8EC] pb-1 inline-block">
                  RAINBOW ARCHES
                </h2>
                <p className="max-w-md text-[11px] sm:text-[13px] md:text-[14px] font-normal italic text-slate-500 leading-relaxed tracking-normal normal-case">
                  “The rainbow arch is a highlight of Murjan Splash Park. Dive into the ultimate aquatic adventure with our splash pool game and experience a refreshing burst of fun!”
                </p>
              </div>
            </ScrollReveal>
          </div>

          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 6: KIDS POOL */}
        <div className="relative w-full flex flex-col md:flex-row-reverse items-stretch">
          <div className="w-full md:w-1/2">
            <ScrollReveal animation="slide-right" delay={0} className="w-full h-full">
              <Card3D intensity={10} className="w-full h-full">
                <div className="w-full h-full relative overflow-hidden min-h-[280px] sm:min-h-[360px]">
                  <img
                    src={img6}
                    alt="Kids Pool"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </Card3D>
            </ScrollReveal>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            <ScrollReveal animation="slide-left" delay={100} className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center text-center p-6 sm:p-10 md:p-14 bg-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#20C8EC] tracking-wide mb-3 uppercase border-b-2 border-[#20C8EC] pb-1 inline-block">
                  KIDS POOL
                </h2>
                <p className="max-w-md text-[11px] sm:text-[13px] md:text-[14px] font-normal italic text-slate-500 leading-relaxed tracking-normal normal-case">
                  “The shallow kids' pool is designed for young children to enjoy a safe and fun water experience with gentle waters, soft non-slip surfaces, and bright, colorful features.”
                </p>
              </div>
            </ScrollReveal>
          </div>

          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-3 sm:-bottom-3 md:-bottom-4 lg:-bottom-6 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 7: SPLASH POOL */}
        <div className="relative w-full flex flex-col md:flex-row items-stretch">
          <div className="w-full md:w-1/2">
            <ScrollReveal animation="slide-left" delay={0} className="w-full h-full">
              <Card3D intensity={10} className="w-full h-full">
                <div className="w-full h-full relative overflow-hidden min-h-[280px] sm:min-h-[360px]">
                  <img
                    src={img7}
                    alt="Splash Pool"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </Card3D>
            </ScrollReveal>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            <ScrollReveal animation="slide-right" delay={100} className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center text-center p-6 sm:p-10 md:p-14 bg-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#20C8EC] tracking-wide mb-3 uppercase border-b-2 border-[#20C8EC] pb-1 inline-block">
                  SPLASH POOL
                </h2>
                <p className="max-w-md text-[11px] sm:text-[13px] md:text-[14px] font-normal italic text-slate-500 leading-relaxed tracking-normal normal-case">
                  “Featuring playful water umbrellas and water guns, this pool is perfect for little ones to cool off and get soaked in a safe, colorful environment.”
                </p>
              </div>
            </ScrollReveal>
          </div>

          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 8: FAMILY SLIDE */}
        <div className="relative w-full flex flex-col md:flex-row-reverse items-stretch">
          <div className="w-full md:w-1/2">
            <ScrollReveal animation="slide-right" delay={0} className="w-full h-full">
              <Card3D intensity={10} className="w-full h-full">
                <div className="w-full h-full relative overflow-hidden min-h-[280px] sm:min-h-[360px]">
                  <img
                    src={img8}
                    alt="Family Slide"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </Card3D>
            </ScrollReveal>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            <ScrollReveal animation="slide-left" delay={100} className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center text-center p-6 sm:p-10 md:p-14 bg-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#20C8EC] tracking-wide mb-3 uppercase border-b-2 border-[#20C8EC] pb-1 inline-block">
                  FAMILY SLIDE
                </h2>
                <p className="max-w-md text-[11px] sm:text-[13px] md:text-[14px] font-normal italic text-slate-500 leading-relaxed tracking-normal normal-case">
                  “Towering slides that deliver fast-paced fun, exciting twists, and unforgettable water adventures. Bigger slides, more fun, more adventure!”
                </p>
              </div>
            </ScrollReveal>
          </div>

          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-3 sm:-bottom-4 md:-bottom-5 lg:-bottom-6 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 9: FOAM PARTY */}
        <div className="relative w-full flex flex-col md:flex-row items-stretch">
          <div className="w-full md:w-1/2">
            <ScrollReveal animation="slide-left" delay={0} className="w-full h-full">
              <Card3D intensity={10} className="w-full h-full">
                <div className="w-full h-full relative overflow-hidden min-h-[280px] sm:min-h-[360px]">
                  <img
                    src={img9}
                    alt="Foam Party"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </Card3D>
            </ScrollReveal>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            <ScrollReveal animation="slide-right" delay={100} className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center text-center p-6 sm:p-10 md:p-14 bg-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#20C8EC] tracking-wide mb-3 uppercase border-b-2 border-[#20C8EC] pb-1 inline-block">
                  FOAM PARTY
                </h2>
                <p className="max-w-md text-[11px] sm:text-[13px] md:text-[14px] font-normal italic text-slate-500 leading-relaxed tracking-normal normal-case">
                  “A vibrant, lively setting with 100% safe foam where guests of all ages can enjoy water games, dancing, and endless fun.”
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

      </section>

      {/* SECTION 4: RESTAURANTS & RETAIL OUTLETS */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-6 sm:p-10 lg:p-16">
            
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1.5 sm:mb-2">
                DINING &amp; SHOPPING
              </p>
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#20C8EC] tracking-tight mb-3 sm:mb-4">
                Murjan Splash Park Restaurants &amp; Retail Outlets
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm lg:text-base font-normal leading-relaxed">
                Recharge and refresh with our wide selection of dining and shopping options, designed to keep the fun flowing all day long.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {outletsData.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center justify-start ${
                    item.isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                >
                  <div className="w-20 h-20 sm:w-20 sm:h-20 rounded-full bg-[#CCF5FD] flex items-center justify-center mb-5 sm:mb-6 flex-shrink-0">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-20 h-20 sm:w-20 sm:h-20 object-contain"
                    />
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal italic leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}