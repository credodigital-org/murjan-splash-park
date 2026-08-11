import React from 'react';
import Card3D from '../components/Card3D';
import ScrollReveal from '../components/ScrollReveal';
import SEO from '../components/SEO';

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
import img9 from '../assets/AttractionImages/img9.png';
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
    <div className="w-full font-sans bg-white pb-10 overflow-hidden">
      <SEO pageSlug="attractions" defaultTitle="Attractions | Murjan Splash Park Abu Dhabi" defaultDescription="Explore water slides, lazy river, and kiddie splash zone." />
      
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
      <section className="relative z-10 w-full flex justify-center items-center px-4 sm:px-8 pb-8 sm:pb-12 text-center bg-white">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Top Heading Paragraph */}
          <ScrollReveal animation="fade-up" delay={0}>
            <p className="text-xs sm:text-base md:text-lg font-bold text-gray-900 leading-relaxed">
              Welcome to Murjan Splash Park, the best water park for families in Abu Dhabi! We have done a lot of research to make our park the most sought after spot for family water games Abu Dhabi, and we invite you to come and enjoy it.
            </p>
          </ScrollReveal>

          {/* Bottom Body Paragraph */}
          <ScrollReveal animation="fade-up" delay={100}>
            <p className="text-[11px] sm:text-sm md:text-base font-medium text-gray-800 leading-relaxed">
              The main attraction at Murjan Splash Park, the best water park for families in Abu Dhabi is the children’s play structure situated in a shallow pool. This vibrant area boasts of a number of fun activities through its four small water slides, a colossal tipping bucket, a crawl tunnel, water guns, a water umbrella, small tipping buckets, a water wheel, and refreshing water showers.
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* SECTION 3: WATER SLIDES & LAZY RIVER */}
      <section className="relative w-full bg-white py-0">
  
        {/* ROW 1: WATER SLIDES (Image Left, Text Right) */}
        <div className="relative w-full grid grid-cols-2 items-stretch">
          {/* Left Side: Photo */}
          <ScrollReveal animation="slide-left" delay={0} className="w-full h-full">
            <Card3D intensity={10} className="w-full h-full">
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src={img1}
                  alt="Water Slides"
                  className="w-full h-full object-cover block min-h-[200px]"
                />
              </div>
            </Card3D>
          </ScrollReveal>

          {/* Right Side: Text Description */}
          <ScrollReveal animation="slide-right" delay={100} className="w-full h-full">
            <div className="w-full h-full flex flex-col justify-center items-center text-center p-3 sm:p-8 md:p-12 bg-white">
              <h2 className="text-xs sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-[#29b6d8] mb-2 sm:mb-4 border-b-2 border-[#29b6d8] inline-block pb-1">
                WATER SLIDES
              </h2>
              <p className="max-w-md text-[10px] sm:text-sm md:text-base leading-tight sm:leading-relaxed text-gray-800 font-medium uppercase">
                "THE WATER SLIDES AT THE PARK IS PERFECT FOR KIDS LOOKING FOR GENTLE FUN. WITH SLOW GENTLE SLOPE AND SHALLOW WATER AT THE BOTTOM, ITS DESIGNED FOR YOUNG CHILDREN'S TO ENJOY SAFELY. BRIGHTLY COLOURED AND EASY TO CLIMB AND ALWAYS UNDER THE SUPERVISION OF OUR LIFEGUARDS."
              </p>
            </div>
          </ScrollReveal>

          {/* Wave Overlay */}
          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 2: LAZY RIVER (Text Left, Image Right) */}
        <div className="relative w-full grid grid-cols-2 items-stretch">
          {/* Left Side: Text Description */}
          <ScrollReveal animation="slide-left" delay={100} className="w-full h-full order-1">
            <div className="w-full h-full flex flex-col justify-center items-center text-center p-3 sm:p-8 md:p-12 bg-white">
              <h2 className="text-xs sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-[#29b6d8] mb-2 sm:mb-4 border-b-2 border-[#29b6d8] inline-block pb-1">
                LAZY RIVER
              </h2>
              <p className="max-w-md text-[10px] sm:text-sm md:text-base leading-tight sm:leading-relaxed text-gray-800 font-medium uppercase">
                "IMMERSE YOURSELF IN LEISURE AT OUR FAMILY WATER PARK ABU DHABI. OUR WELL-MAINTAINED, CLEAN AND HYGIENIC 257-METER LAZY RIVER, GENTLY WINDS ITS WAY THROUGH THE PARK AT A DEPTH OF 0.6 METERS. YOU CAN TAKE ONE OF OUR TUBES, SECURE YOURSELF INSIDE IT, AND LET THE TRANQUIL CURRENTS GUIDE YOU THROUGH THE SCENIC TWISTS AND TURNS OF THIS WATER OASIS. IT'S THE PERFECT WAY TO UNWIND AND ENJOY A CAREFREE JOURNEY SURROUNDED BY THE BEAUTY OF MURJAN'S PICTURESQUE LANDSCAPES."
              </p>
            </div>
          </ScrollReveal>

          {/* Right Side: Photo (img2) */}
          <ScrollReveal animation="slide-right" delay={0} className="w-full h-full order-2">
            <Card3D intensity={10} className="w-full h-full">
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src={img2}
                  alt="Lazy River"
                  className="w-full h-full object-cover block min-h-[200px]"
                />
              </div>
            </Card3D>
          </ScrollReveal>

          {/* Wave Overlay */}
          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 3: ATTRACTION 3 (Image Left, Text Right) */}
        <div className="relative w-full grid grid-cols-2 items-stretch">
          <ScrollReveal animation="slide-left" delay={0} className="w-full h-full">
            <Card3D intensity={10} className="w-full h-full">
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src={img3}
                  alt="Attraction 3"
                  className="w-full h-full object-cover block min-h-[200px]"
                />
              </div>
            </Card3D>
          </ScrollReveal>

          <ScrollReveal animation="slide-right" delay={100} className="w-full h-full">
            <div className="w-full h-full flex flex-col justify-center items-center text-center p-3 sm:p-8 md:p-12 bg-white">
              <h2 className="text-xs sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-[#29b6d8] mb-2 sm:mb-4 border-b-2 border-[#29b6d8] inline-block pb-1">
                Swimming Pool
              </h2>
              <p className="max-w-md text-[10px] sm:text-sm md:text-base leading-tight sm:leading-relaxed text-gray-800 font-medium uppercase">
                "Indulge in fun at the family water games Abu Dhabi spot at Murjan. Dive into a world of relaxation and fun for all ages! Our swimming pools offer refreshing escapes for both adults and kids alike, where every splash is a moment of joy and every swim is a memory in the making. Join us for endless aquatic adventures and unforgettable family moments!"
              </p>
            </div>
          </ScrollReveal>

          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 4: ATTRACTION 4 (Text Left, Image Right) */}
        <div className="relative w-full grid grid-cols-2 items-stretch">
          <ScrollReveal animation="slide-left" delay={100} className="w-full h-full order-1">
            <div className="w-full h-full flex flex-col justify-center items-center text-center p-3 sm:p-8 md:p-12 bg-white">
              <h2 className="text-xs sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-[#29b6d8] mb-2 sm:mb-4 border-b-2 border-[#29b6d8] inline-block pb-1">
                Bumper Boats
              </h2>
              <p className="max-w-md text-[10px] sm:text-sm md:text-base leading-tight sm:leading-relaxed text-gray-800 font-medium uppercase">
                "Navigate the waters with our small, steerable, battery-operated boats designed for kids! Watch with pride as the little captains take control, and skillfully ‘drive’ around in a pool of water, engaging in playful and gentle collisions. It's the perfect blend of fun and skill, providing a delightful experience for young sailors to enjoy a safe and interactive aquatic adventure."
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slide-right" delay={0} className="w-full h-full order-2">
            <Card3D intensity={10} className="w-full h-full">
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src={img4}
                  alt="Attraction 4"
                  className="w-full h-full object-cover block min-h-[200px]"
                />
              </div>
            </Card3D>
          </ScrollReveal>

          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 5: ATTRACTION 5 (Image Left, Text Right) */}
        <div className="relative w-full grid grid-cols-2 items-stretch">
          <ScrollReveal animation="slide-left" delay={0} className="w-full h-full">
            <Card3D intensity={10} className="w-full h-full">
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src={img5}
                  alt="Attraction 5"
                  className="w-full h-full object-cover block min-h-[200px]"
                />
              </div>
            </Card3D>
          </ScrollReveal>

          <ScrollReveal animation="slide-right" delay={100} className="w-full h-full">
            <div className="w-full h-full flex flex-col justify-center items-center text-center p-3 sm:p-8 md:p-12 bg-white">
              <h2 className="text-xs sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-[#29b6d8] mb-2 sm:mb-4 border-b-2 border-[#29b6d8] inline-block pb-1">
                Rainbow Arches
              </h2>
              <p className="max-w-md text-[10px] sm:text-sm md:text-base leading-tight sm:leading-relaxed text-gray-800 font-medium uppercase">
                The Rainbow Arch is the highlight of Murjan Splash Park, one of the best water park for families in Abu Dhabi. Dive into the ultimate aquatic adventure with our splash pool game! Experience a refreshing burst of fun as you splash, play, and soak up the excitement in this water-filled paradise. Get ready to make a splash at the family fun splash water park, and create unforgettable memories with friends and family!
              </p>
            </div>
          </ScrollReveal>

          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 6: ATTRACTION 6 (Text Left, Image Right) */}
        <div className="relative w-full grid grid-cols-2 items-stretch">
          <ScrollReveal animation="slide-left" delay={100} className="w-full h-full order-1">
            <div className="w-full h-full flex flex-col justify-center items-center text-center p-3 sm:p-8 md:p-12 bg-white">
              <h2 className="text-xs sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-[#29b6d8] mb-2 sm:mb-4 border-b-2 border-[#29b6d8] inline-block pb-1">
                Kids Pool
              </h2>
              <p className="max-w-md text-[10px] sm:text-sm md:text-base leading-tight sm:leading-relaxed text-gray-800 font-medium uppercase">
                "The shallow kids' pool is designed for young children to enjoy a safe and fun water experience. With gentle, shallow waters and soft, non-slip surfaces, it’s the perfect spot for toddlers to splash, play, and explore. Surrounded by bright, colourful features. The pool provides a calm, secure environment for little ones to enjoy the water in a relaxed and enjoyable setting."
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slide-right" delay={0} className="w-full h-full order-2">
            <Card3D intensity={10} className="w-full h-full">
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src={img6}
                  alt="Attraction 6"
                  className="w-full h-full object-cover block min-h-[200px]"
                />
              </div>
            </Card3D>
          </ScrollReveal>

          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 7: ATTRACTION 7 (Image Left, Text Right) */}
        <div className="relative w-full grid grid-cols-2 items-stretch">
          <ScrollReveal animation="slide-left" delay={0} className="w-full h-full">
            <Card3D intensity={10} className="w-full h-full">
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src={img7}
                  alt="Attraction 7"
                  className="w-full h-full object-cover block min-h-[200px]"
                />
              </div>
            </Card3D>
          </ScrollReveal>

          <ScrollReveal animation="slide-right" delay={100} className="w-full h-full">
            <div className="w-full h-full flex flex-col justify-center items-center text-center p-3 sm:p-8 md:p-12 bg-white">
              <h2 className="text-xs sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-[#29b6d8] mb-2 sm:mb-4 border-b-2 border-[#29b6d8] inline-block pb-1">
                Splash Pool
              </h2>
              <p className="max-w-md text-[10px] sm:text-sm md:text-base leading-tight sm:leading-relaxed text-gray-800 font-medium uppercase">
                "The splash pool is a fun-filled, interactive water play area designed for kids. Featuring playful water umbrellas that release refreshing streams of water and water guns for added excitement, this pool is perfect for little ones to cool off and get soaked in a safe, shallow environment. With its colourful, vibrant design, the splash pool offers endless entertainment as children enjoy splashing under the umbrellas and spraying each other with water guns, making it an ideal spot for fun and laughter.​"
              </p>
            </div>
          </ScrollReveal>

          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 8: ATTRACTION 8 (Text Left, Image Right) */}
        <div className="relative w-full grid grid-cols-2 items-stretch">
          <ScrollReveal animation="slide-left" delay={100} className="w-full h-full order-1">
            <div className="w-full h-full flex flex-col justify-center items-center text-center p-3 sm:p-8 md:p-12 bg-white">
              <h2 className="text-xs sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-[#29b6d8] mb-2 sm:mb-4 border-b-2 border-[#29b6d8] inline-block pb-1">
                Family slide
              </h2>
              <p className="max-w-md text-[10px] sm:text-sm md:text-base leading-tight sm:leading-relaxed text-gray-800 font-medium uppercase">
                Get ready for bigger splashes and even bigger excitement with our Mega Slides at Murjan Splash Park! Designed for thrill-seekers of all ages, these towering slides deliver fast-paced fun, exciting twists, and unforgettable water adventures. Whether you're racing down with friends or taking on the challenge yourself, the Mega Slides are the perfect way to add extra excitement to your day at Abu Dhabi's favorite family water park. Bigger Slides. More Fun. More Adventure.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slide-right" delay={0} className="w-full h-full order-2">
            <Card3D intensity={10} className="w-full h-full">
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src={img8}
                  alt="Attraction 8"
                  className="w-full h-full object-cover block min-h-[200px]"
                />
              </div>
            </Card3D>
          </ScrollReveal>

          <img
            src={unionWave}
            alt=""
            className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 left-0 w-full h-auto pointer-events-none z-20 block object-cover"
          />
        </div>

        {/* ROW 9: ATTRACTION 9 (Image Left, Text Right) */}
        <div className="relative w-full grid grid-cols-2 items-stretch">
          <ScrollReveal animation="slide-left" delay={0} className="w-full h-full">
            <Card3D intensity={10} className="w-full h-full">
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src={img9}
                  alt="Attraction 9"
                  className="w-full h-full object-cover block min-h-[200px]"
                />
              </div>
            </Card3D>
          </ScrollReveal>

          <ScrollReveal animation="slide-right" delay={100} className="w-full h-full">
            <div className="w-full h-full flex flex-col justify-center items-center text-center p-3 sm:p-8 md:p-12 bg-white">
              <h2 className="text-xs sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-[#29b6d8] mb-2 sm:mb-4 border-b-2 border-[#29b6d8] inline-block pb-1">
                Foam Party
              </h2>
              <p className="max-w-md text-[10px] sm:text-sm md:text-base leading-tight sm:leading-relaxed text-gray-800 font-medium uppercase">
                "A Foam filled water party at the park is the ultimate way to celebrate with family and friends, the water park creates a vibrant, lively setting where guests of all ages can enjoy water games, dancing, and endless fun. Were the foam being entirely safe for all the guests."
              </p>
            </div>
          </ScrollReveal>
        </div>

      </section>

      {/* SECTION 4: RESTAURANTS & RETAIL OUTLETS */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-6 sm:p-10 lg:p-16">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#38C6DF] tracking-tight mb-3 sm:mb-4">
                Murjan Splash Park Restaurants &amp; Retail Outlets
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Recharge and refresh with our wide selection of dining and shopping options, designed to keep the fun flowing all day long.
              </p>
            </div>

            {/* Outlets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {outletsData.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center justify-start ${
                    item.isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                >
                  {/* Rounded Icon Container with Hover Zoom */}
{/* Rounded Icon Container */}
<div className="w-20 h-20 sm:w-20 sm:h-20 rounded-full bg-[#CCF5FD] flex items-center justify-center mb-5 sm:mb-6 flex-shrink-0">
  <img
    src={item.icon}
    alt={item.title}
    className="w-20 h-20 sm:w-20 sm:h-20 object-contain"
  />
</div>

                  {/* Details */}
                  <h3 className="text-base sm:text-lg font-bold text-[#38C6DF] mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-md">
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