import { Link } from 'react-router-dom';
import defaultBackground from '../assets/HomeImages/herobg.png';

export default function Hero({ backgroundImage, hoursLabel }) {
  const background = backgroundImage || defaultBackground;
  const hours = hoursLabel || '1 PM – 9 PM';
  return (
    <section className="relative w-full bg-sky-50 overflow-hidden flex flex-col justify-between select-none">
      
      {/* Image container: uses natural aspect ratio on smaller screens and object-cover to prevent distortion */}
      <div className="relative w-full overflow-hidden flex items-center justify-center bg-sky-50 min-h-[300px] sm:min-h-[420px] lg:min-h-[calc(100vh-120px)]">
        <img
          src={background}
          alt="Murjan Splash Park Banner"
          className="w-full h-full object-cover sm:object-cover object-center block hero-img-sharp"
        />

        {/* Overlay CTA Button */}
        <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 lg:bottom-10 lg:right-12 z-20">
          <Link
            to="/tickets"
            className="bg-[#EAE213] hover:bg-[#d4cb10] text-gray-900 font-extrabold px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-3.5 rounded-full text-xs sm:text-sm lg:text-base no-underline shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 inline-block whitespace-nowrap"
          >
            Book Tickets
          </Link>
        </div>
      </div>

      {/* Continuous Ticker Bar */}
      <div className="w-full bg-white py-2.5 sm:py-3 lg:py-3.5 border-t border-sky-100 overflow-hidden select-none flex-shrink-0 z-30">
        <div className="animate-ticker text-[#00A896] font-extrabold text-xs sm:text-sm lg:text-base tracking-wider whitespace-nowrap flex">
          {/* Track 1 */}
          <div className="flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12">
            {[...Array(4)].map((_, i) => (
              <div key={`t1-${i}`} className="flex items-center space-x-2 sm:space-x-3">
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#00A896] rounded-full inline-block flex-shrink-0"></span>
                <span>OPEN DAILY • {hours}</span>
              </div>
            ))}
          </div>
          {/* Track 2 (Seamless loop duplicate) */}
          <div className="flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12">
            {[...Array(4)].map((_, i) => (
              <div key={`t2-${i}`} className="flex items-center space-x-2 sm:space-x-3">
                <span className="h-3 w-3 sm:h-2.5 sm:w-2.5 bg-[#00A896] rounded-full inline-block flex-shrink-0"></span>
                <span>OPEN DAILY • {hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}