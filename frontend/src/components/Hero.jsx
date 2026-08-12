import { Link } from 'react-router-dom';

import backgroundParkImg from '../assets/HomeImages/hero-bg-park.png'; 
import foregroundKidsImg from '../assets/HomeImages/hero-fg-kids-text.png'; 

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden flex flex-col justify-between select-none bg-white">
      
      {/* Edge-to-Edge Container */}
      <div className="relative w-full overflow-hidden flex items-center justify-center leading-none">
        
        {/* LAYER 1: Static Background Image */}
        <img
          src={backgroundParkImg}
          alt="Murjan Splash Park Background"
          className="w-full h-auto block object-top hero-img-sharp align-bottom hero-bottom-blend"
        />

        {/* LAYER 2: Foreground Graphic swinging like a pendulum */}
        <div className="absolute top-[-3%] left-[2%] w-[50%] sm:top-[-2%] sm:left-[2%] sm:w-[40%] md:top-[-1%] md:w-[49%] lg:top-[0%] lg:w-[48%] xl:top-[4%] xl:w-[45%] z-10 pointer-events-none animate-pendulum">
          <img
            src={foregroundKidsImg}
            alt="Dive in to endless fun"
            className="w-full h-auto object-contain drop-shadow-xl"
          />
        </div>

        {/* Overlay CTA Button */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-12 lg:right-16 z-20">
          <Link
            to="/tickets"
            className="relative bg-[#EAE213] hover:bg-[#d4cb10] text-gray-900 font-bold px-4 py-2 sm:px-6 sm:py-3 lg:px-10 lg:py-4 xl:px-12 xl:py-5 rounded-full text-xs sm:text-sm lg:text-lg xl:text-xl no-underline transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 inline-block whitespace-nowrap"
          >
            Book Tickets
          </Link>
        </div>
      </div>

      {/* Continuous Ticker Bar Container */}
      <div className="w-full bg-white py-2.5 sm:py-3 lg:py-3.5 border-none outline-none overflow-hidden select-none flex-shrink-0 z-30 -mt-[1px]">
        <div className="animate-ticker text-[#00A896] font-semibold text-xs sm:text-sm lg:text-base tracking-wider whitespace-nowrap flex">
          
          <div className="flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12 flex-shrink-0">
            {[...Array(4)].map((_, i) => (
              <div key={`t1-${i}`} className="flex items-center space-x-2 sm:space-x-3">
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#00A896] rounded-full inline-block flex-shrink-0"></span>
                <span>OPEN DAILY • 1 PM – 9 PM</span>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12 flex-shrink-0">
            {[...Array(4)].map((_, i) => (
              <div key={`t2-${i}`} className="flex items-center space-x-2 sm:space-x-3">
                <span className="h-2.5 w-2.5 sm:h-2.5 sm:w-2.5 bg-[#00A896] rounded-full inline-block flex-shrink-0"></span>
                <span>OPEN DAILY • 1 PM – 9 PM</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}