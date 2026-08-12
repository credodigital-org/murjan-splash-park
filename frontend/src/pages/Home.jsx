import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Card3D from '../components/Card3D';
import ScrollReveal from '../components/ScrollReveal';

// --- Official Public Services Imports ---
import { getHomeData, getWorkingHours } from '../services/settingsService';
import { getGalleryImages } from '../services/galleryService';
import { getBlogs } from '../services/blogService';

// --- Assets Imports ---
import attract from '../assets/HomeImages/attract.png';
import splash from '../assets/HomeImages/splash.png';
import river from '../assets/HomeImages/river.png';
import slide from '../assets/HomeImages/slide.png';
import family from '../assets/AttractionImages/img8.png';

import waveTop from '../assets/HomeImages/wave-top.png';
import waveBottom from '../assets/HomeImages/wave-bottom.png';
import whyMurjanLogo from '../assets/HomeImages/why-murjan-logo.png';
import safeFamilies from '../assets/HomeImages/safe-families.png';
import excitingAttractions from '../assets/HomeImages/exciting-attractions.png';
import deliciousDining from '../assets/HomeImages/delicious-dining.png';
import pristineFacilities from '../assets/HomeImages/pristine-facilities.png';
import foodLogo from '../assets/HomeImages/food-logo.png';
import spoonForkIcon from '../assets/HomeImages/spoon-fork-icon.png';

import galleryLogo from '../assets/HomeImages/gallery-logo.png';
import gallery1 from '../assets/HomeImages/gallery-1.png';
import gallery2 from '../assets/HomeImages/gallery-2.png';
import gallery3 from '../assets/HomeImages/gallary-3.png';
import gallery4 from '../assets/AttractionImages/img8.png';
import gallery5 from '../assets/HomeImages/gallery-5.png';
import gallery6 from '../assets/HomeImages/gallery-6.png';

import adventureBg from '../assets/HomeImages/adventure-bg.png';
import lifeguardBoy from '../assets/HomeImages/lifeguard-boy.png';
import splashBoys from '../assets/HomeImages/splash-boys.png';

export default function Home() {
  const [workingHours, setWorkingHours] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [blogItems, setBlogItems] = useState([]);
  const [apiErrorOccurred, setApiErrorOccurred] = useState(false);

  const fallbackGalleryAssets = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        // Fetch primary aggregate Home endpoint
        const homeData = await getHomeData().catch(() => null);

        if (!isMounted) return;

        if (homeData) {
          if (homeData.testimonials) {
            const testList = Array.isArray(homeData.testimonials)
              ? homeData.testimonials
              : homeData.testimonials.results || [];
            setTestimonials(testList);
          }

          if (homeData.gallery) {
            const galList = Array.isArray(homeData.gallery)
              ? homeData.gallery
              : homeData.gallery.results || [];
            setGalleryItems(galList);
          }

          if (homeData.blog) {
            const bList = Array.isArray(homeData.blog)
              ? homeData.blog
              : homeData.blog.results || [];
            setBlogItems(bList);
          }
        } else {
          // Individual fallback fetches if /home/ endpoint doesn't include everything
          const [galRes, blogRes] = await Promise.allSettled([
            getGalleryImages(),
            getBlogs(),
          ]);

          if (!isMounted) return;

          if (galRes.status === 'fulfilled' && galRes.value) {
            setGalleryItems(Array.isArray(galRes.value) ? galRes.value : galRes.value.results || []);
          } else if (galRes.status === 'rejected') {
            setApiErrorOccurred(true);
          }

          if (blogRes.status === 'fulfilled' && blogRes.value) {
            setBlogItems(Array.isArray(blogRes.value) ? blogRes.value : blogRes.value.results || []);
          }
        }

        // Fetch Working Hours
        const hoursData = await getWorkingHours().catch(() => null);
        if (isMounted && hoursData) {
          const hoursList = Array.isArray(hoursData) ? hoursData : hoursData.results || [];
          setWorkingHours(hoursList);
        }
      } catch (error) {
        console.error('Error fetching home page data:', error);
        if (isMounted) setApiErrorOccurred(true);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Helper to extract image source cleanly from object or string
  const getImageSrc = (item, index) => {
    if (!item) {
      return apiErrorOccurred ? fallbackGalleryAssets[index % 6] : null;
    }
    if (typeof item === 'string') return item;
    return item.image || item.file || item.url || item.image_url || (apiErrorOccurred ? fallbackGalleryAssets[index % 6] : null);
  };

  const attractionsData = [
    { id: 1, title: 'Water Slides', description: 'Adrenaline-pumping slides for thrill seekers of every age.', image: slide, link: '/attractions' },
    { id: 2, title: 'Lazy River', description: 'Drift through scenic waterways at your own peaceful pace.', image: river, link: '/attractions' },
    { id: 3, title: 'Kiddie Foam Party', description: 'Safe, joyful water play designed for little ones.', image: splash, link: '/attractions' },
    { id: 4, title: 'Family Slides', description: 'More Family fun Awaits with three new slides', image: family, link: '/dining' },
  ];

  const whyMurjanCards = [
    { id: 1, titleImage: safeFamilies, alt: 'Safe for Families', description: 'Certified lifeguards on duty at every attraction, every hour of operation.' },
    { id: 2, titleImage: excitingAttractions, alt: 'Exciting Attractions', description: '10+ rides and pools crafted for maximum joy, variety, and wonder.' },
    { id: 3, titleImage: deliciousDining, alt: 'Delicious Dining', description: 'Seven venues serving fresh, locally sourced cuisine and refreshments.' },
    { id: 4, titleImage: pristineFacilities, alt: 'Pristine Facilities', description: 'Maintained to international standards — spotless, safe, and welcoming.' },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. Hero Banner */}
      <Hero workingHours={workingHours} />

      {/* ========== 2. OUR ATTRACTIONS ========== */}
      <section className="relative z-20 bg-white pt-1 pb-22 sm:pt-10 sm:pb-20 lg:pt-8 lg:pb-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 lg:mb-12 gap-3 sm:gap-4">
            <ScrollReveal animation="slide-left" delay={0}>
              <div>
                <img src={attract} alt="Our Attractions" className="h-30 sm:h-30 md:h-32 lg:h-55 w-auto object-contain mb-1 sm:mb-2" />
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold text-[#38C6DF] tracking-tight">
                  Something for everyone.
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="slide-right" delay={100}>
              <Link 
                to="/attractions" 
                className="text-gray-400 hover:text-[#38C6DF] text-sm font-semibold flex items-center space-x-1 whitespace-nowrap shrink-0 no-underline transition-colors self-start sm:self-auto"
              >
                <span>View all</span>
                <span className="text-base">›</span>
              </Link>
            </ScrollReveal>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {attractionsData.map((item, index) => (
              <ScrollReveal key={item.id} animation="fade-up" delay={index * 100} className="h-full">
                <Card3D intensity={12} className="h-full">
                  <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-3 sm:p-4 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between h-full">
                    <div>
                      <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 aspect-square mb-3 sm:mb-4">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                      </div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{item.description}</p>
                    </div>
                    <Link to={item.link} className="text-[#38C6DF] hover:text-cyan-600 font-semibold text-sm inline-flex items-center space-x-1 no-underline transition-colors mt-auto">
                      <span>Explore</span>
                      <span>›</span>
                    </Link>
                  </div>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. WHY MURJAN ========== */}
      <section className="relative z-20 w-full bg-[#FFE000] pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <img 
          src={waveTop} 
          alt="Top Wave" 
          className="absolute top-1 left-0 w-full h-auto -translate-y-[99%] pointer-events-none z-30 block" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal animation="zoom-in" delay={0}>
            <div className="flex justify-center mb-1 sm:mb-1">
              <img src={whyMurjanLogo} alt="Why Murjan Logo" className="h-30 sm:h-30 md:h-32 lg:h-55 w-auto object-contain" />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            {/* <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold text-[#20C8EC] drop-shadow-[0_2px_0px_#13A0C0] sm:drop-shadow-[0_3px_0px_#13A0C0] tracking-tight mt-2 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              Why families love Murjan.
            </h2> */}
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold text-[#20C8EC] drop-shadow-[0_2px_0px_#13A0C0] sm:drop-shadow-[0_3px_0px_#13A0C0] tracking-tight mt-2 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
  Why families love Murjan.
</h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-8 pt-8 sm:pt-10 md:pt-12 lg:pt-14">
            {whyMurjanCards.map((card, index) => (
              <ScrollReveal key={card.id} animation="fade-up" delay={index * 100} className="h-full">
                <Card3D intensity={14} className="h-full">
                  <div className="bg-white rounded-2xl sm:rounded-[32px] lg:rounded-[36px] p-3 sm:p-5 lg:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center justify-between min-h-[200px] sm:min-h-[280px] lg:min-h-[320px] h-full">
                    <div className="h-20 sm:h-32 md:h-36 lg:h-44 w-full flex items-center justify-center mb-2 sm:mb-4 px-1 sm:px-2">
                      <img src={card.titleImage} alt={card.alt} className="max-h-full max-w-[90%] object-contain drop-shadow-sm hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-gray-800 text-[11px] sm:text-sm lg:text-base font-medium leading-snug sm:leading-relaxed mt-auto">{card.description}</p>
                  </div>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="overflow-x-clip bottom-2 left-0 w-full pointer-events-none z-40 translate-y-[99%]">
          <img 
            src={waveBottom} 
            alt="Bottom Wave" 
            className="absolute bottom-0 pt-10 left-0 w-full h-auto translate-y-[100%] pointer-events-none z-30 block" 
          />
        </div>
      </section>

      {/* ========== 4. FOOD / DINING DELIGHTS ========== */}
      <section className="relative z-20 bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <ScrollReveal animation="slide-left" delay={100}>
              <img 
                src={foodLogo} 
                alt="Food" 
                className="h-30 sm:h-30 lg:h-55 w-auto object-contain" 
              />
            </ScrollReveal>
          </div>

          <ScrollReveal animation="zoom-in" delay={150}>
            <div className="relative bg-white rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-[#E0F7FD] shadow-[0_10px_40px_rgba(56,198,223,0.12)] hover:shadow-[0_15px_50px_rgba(56,198,223,0.2)] transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#38C6DF] tracking-tight">
                    Dining Delights
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed sm:leading-loose">
                    Take a break from the excitement and explore the dining options available within Murjan Splash Park Abu Dhabi. With a selection of restaurants and food outlets located inside the park, you can enjoy a variety of snacks, refreshing drinks, meals, and treats whenever you need a delicious break.
                  </p>
                </div>

                <div className="lg:col-span-4 flex justify-center lg:justify-end mt-4 lg:mt-0">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full bg-[#E0F7FD]/80 flex items-center justify-center p-6 shadow-[0_0_40px_rgba(56,198,223,0.35)]">
                    <div className="absolute inset-0 rounded-full bg-[#38C6DF]/20 blur-xl pointer-events-none" />
                    <img 
                      src={spoonForkIcon} 
                      alt="Cutlery" 
                      className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain z-10" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
{/* ========== 5. GALLERY ========== */}
<section className="bg-[#090E38] text-white py-10 sm:py-16 lg:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 lg:mb-12 gap-3">

      <ScrollReveal animation="slide-left" delay={0}>
        <div>
          <img
            src={galleryLogo}
            alt="Gallery Logo"
            className="h-30 sm:h-30 lg:h-55 w-auto object-contain mb-1 sm:mb-2"
          />

          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#20C8EC] tracking-tight">
            Moments and Murjan.
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="slide-right" delay={100}>
        <Link
          to="/gallery"
          className="text-gray-300 hover:text-[#20C8EC] text-sm font-semibold flex items-center space-x-1 no-underline transition-colors"
        >
          <span>View all</span>
          <span className="text-base">›</span>
        </Link>
      </ScrollReveal>

    </div>

    {/* Gallery Grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">

      {/* =====================================================
          COLUMN 1
          Backend image 0 → Tall
          Backend image 1 → Short
      ===================================================== */}

      <ScrollReveal
        animation="zoom-in"
        delay={100}
        className="flex flex-col gap-3 sm:gap-4 lg:gap-6"
      >

        {getImageSrc(galleryItems[0], 0) && (
          <Card3D intensity={12}>
            <div className="overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[32px] h-36 sm:h-56 md:h-64 lg:h-[310px] bg-blue-950/40 shadow-md border border-white transition-all">

              <img
                src={getImageSrc(galleryItems[0], 0)}
                alt={
                  galleryItems[0]?.title ||
                  "Gallery Image 1"
                }
                className="w-full h-full object-cover hover:scale-108 transition-transform duration-500"
              />

            </div>
          </Card3D>
        )}

        {getImageSrc(galleryItems[1], 1) && (
          <Card3D intensity={12}>
            <div className="overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[32px] h-24 sm:h-36 md:h-40 lg:h-[190px] bg-blue-950/40 shadow-md border border-white transition-all">

              <img
                src={getImageSrc(galleryItems[1], 1)}
                alt={
                  galleryItems[1]?.title ||
                  "Gallery Image 2"
                }
                className="w-full h-full object-cover hover:scale-108 transition-transform duration-500"
              />

            </div>
          </Card3D>
        )}

      </ScrollReveal>


      {/* =====================================================
          COLUMN 2
          Backend image 2 → Short
          Backend image 3 → Tall
      ===================================================== */}

      <ScrollReveal
        animation="zoom-in"
        delay={220}
        className="flex flex-col gap-3 sm:gap-4 lg:gap-6"
      >

        {getImageSrc(galleryItems[2], 2) && (
          <Card3D intensity={12}>
            <div className="overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[32px] h-24 sm:h-36 md:h-40 lg:h-[190px] bg-blue-950/40 shadow-md border border-white transition-all">

              <img
                src={getImageSrc(galleryItems[2], 2)}
                alt={
                  galleryItems[2]?.title ||
                  "Gallery Image 3"
                }
                className="w-full h-full object-cover hover:scale-108 transition-transform duration-500"
              />

            </div>
          </Card3D>
        )}

        {getImageSrc(galleryItems[3], 3) && (
          <Card3D intensity={12}>
            <div className="overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[32px] h-36 sm:h-56 md:h-64 lg:h-[310px] bg-blue-950/40 shadow-md border border-white transition-all">

              <img
                src={getImageSrc(galleryItems[3], 3)}
                alt={
                  galleryItems[3]?.title ||
                  "Gallery Image 4"
                }
                className="w-full h-full object-cover hover:scale-108 transition-transform duration-500"
              />

            </div>
          </Card3D>
        )}

      </ScrollReveal>


      {/* =====================================================
          COLUMN 3
          Backend image 4 → Short
          Backend image 5 → Tall
      ===================================================== */}

      <ScrollReveal
        animation="zoom-in"
        delay={340}
        className="hidden md:flex flex-col gap-3 sm:gap-4 lg:gap-6"
      >

        {getImageSrc(galleryItems[4], 4) && (
          <Card3D intensity={12}>
            <div className="overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[32px] h-24 sm:h-36 md:h-40 lg:h-[190px] bg-blue-950/40 shadow-md border border-white transition-all">

              <img
                src={getImageSrc(galleryItems[4], 4)}
                alt={
                  galleryItems[4]?.title ||
                  "Gallery Image 5"
                }
                className="w-full h-full object-cover hover:scale-108 transition-transform duration-500"
              />

            </div>
          </Card3D>
        )}

        {getImageSrc(galleryItems[5], 5) && (
          <Card3D intensity={12}>
            <div className="overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[32px] h-36 sm:h-56 md:h-64 lg:h-[310px] bg-blue-950/40 shadow-md border border-white transition-all">

              <img
                src={getImageSrc(galleryItems[5], 5)}
                alt={
                  galleryItems[5]?.title ||
                  "Gallery Image 6"
                }
                className="w-full h-full object-cover hover:scale-108 transition-transform duration-500"
              />

            </div>
          </Card3D>
        )}

      </ScrollReveal>

    </div>
  </div>
</section>

      {/* ========== 6. TESTIMONIALS & ADVENTURE BANNER ========== */}
      <section className="bg-white pt-10 sm:pt-14 lg:pt-16 relative overflow-hidden">
        {testimonials.length > 0 && (
          <>
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-10 lg:mb-12">
                <p className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase mb-1.5 sm:mb-2">TESTIMONIALS</p>
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#20C8EC] tracking-tight">
                  What our guests say.
                </h2>
              </div>
            </ScrollReveal>

            {/* Testimonials Grid (Admin Dependent) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-16 lg:mb-20">
              {testimonials.map((item, index) => {
                // const name = item.name || item.author || 'Guest';
                const name = item.guest_name || item.name || item.author || 'Guest';
                const initial = name.charAt(0).toUpperCase();
                const quoteText = item.quote || item.content || item.comment || item.text || '';
                const locationText = item.location || item.city || 'Abu Dhabi, UAE';
                const ratingStars = Number(item.rating || 5);

                return (
                  <ScrollReveal key={item.id || index} animation="fade-up" delay={index * 100} className="h-full">
                    <Card3D intensity={10} className="h-full">
                      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-xl border border-gray-100 flex flex-col justify-between h-full">
                        <div>
                          <div className="text-cyan-400 text-xs sm:text-sm tracking-widest mb-2 sm:mb-3">
                            {'★ '.repeat(Math.min(5, Math.max(1, ratingStars)))}
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm italic leading-relaxed mb-4 sm:mb-6">
                            “{quoteText}”
                          </p>
                        </div>
                        <div className="flex items-center space-x-2.5 sm:space-x-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-100 text-[#20C8EC] font-bold flex items-center justify-center text-xs sm:text-sm shadow-xs flex-shrink-0">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-bold text-gray-900 text-xs sm:text-sm truncate">{name}</h5>
                            <p className="text-[10px] sm:text-xs text-gray-400 truncate">{locationText}</p>
                          </div>
                        </div>
                      </div>
                    </Card3D>
                  </ScrollReveal>
                );
              })}
            </div>
          </>
        )}

        {/* Adventure Banner - Full Width */}
        <ScrollReveal animation="zoom-in" delay={150}>
          <div className="relative w-full overflow-hidden bg-white select-none mt-4 sm:mt-8 lg:mt-10 mb-0">
            <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] lg:aspect-[2.1/1] overflow-hidden">
              <img
                src={adventureBg}
                alt="Lazy River Adventure"
                className="w-full h-full object-cover block"
              />

              <div className="absolute top-[4%] left-[4%] max-w-[85%] sm:top-[8%] sm:left-[6%] sm:max-w-[60%] md:top-[12%] lg:top-[4%] lg:left-[8%] lg:max-w-[40%] z-10">
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-[800] text-[#38C6DF] leading-[1.15] !text-[20px] sm:!text-[32px] md:!text-[28px] lg:!text-[60px]">
                  Ready for your<br />next adventure?
                </h2>
              </div>

              <img
                src={lifeguardBoy}
                alt="Lifeguard Boy"
                className="absolute left-0 bottom-0 w-[22%] sm:w-[22%] max-w-[320px] object-contain z-20 pointer-events-none"
              />

              <div className="absolute right-[5%] sm:right-[12%] bottom-[10%] sm:bottom-[20%] flex flex-col items-center z-20">
                <img
                  src={splashBoys}
                  alt="Boys Splashing"
                  className="w-28 sm:w-48 md:w-60 lg:w-72 object-contain pointer-events-none mb-2 sm:mb-3"
                />

                <Link
                  to="/tickets"
                  className="bg-[#FFE000] hover:bg-[#ebd000] text-gray-900 font-extrabold text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-8 py-2 sm:py-3.5 rounded-2xl sm:rounded-3xl no-underline shadow-md hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-yellow-300"
                >
                  Book Tickets
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}