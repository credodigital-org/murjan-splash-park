import React, { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import SEO from '../components/SEO';
import { getGalleryImages } from '../services/galleryService';

// Hero Assets
import herobg from '../assets/GalleryImages/herobg.png';
import mainhead from '../assets/GalleryImages/herotext.png'; 

// Gallery Grid Image Assets
import imgFamilySlides from '../assets/AttractionImages/img8.png'; 
import imgWaterSlides from '../assets/AttractionImages/img1.png'; 
import imgRainbowArches from '../assets/AttractionImages/img5.png'; 
import imgBirthdayParty from '../assets/BirthdayPartyImages/package-girl.png'; 
import imgLazyRiver from '../assets/HomeImages/river.png'; 
import imgKidsPool from '../assets/AttractionImages/img6.png'; 

// Module-level (stable reference, not re-created every render) so
// useEffect's dependency array doesn't need to include it.
const CURATED_TITLES = ['Family Slides', 'Water Slides', 'Rainbow Arches', 'Birthday Party', 'Lazy River', 'Kids Pool'];

export default function Gallery() {
  // Active category filter state
  const [activeTab, setActiveTab] = useState('All Attractions');

  // Real gallery images from the admin panel, keyed by title so each fixed
  // layout slot below can be swapped for a real upload without changing
  // this page's masonry layout (admin uploads a gallery item titled e.g.
  // "Water Slides" and it replaces the bundled placeholder automatically).
  const [apiImagesByTitle, setApiImagesByTitle] = useState({});
  // Any admin-uploaded image whose title does NOT match one of the 6 curated
  // slots below — these previously vanished silently. They now render in an
  // additional grid so every admin upload actually appears on this page.
  const [extraImages, setExtraImages] = useState([]);

  useEffect(() => {
    getGalleryImages()
      .then((images) => {
        const byTitle = {};
        images.forEach((img) => {
          if (img.image) byTitle[img.title] = img.image;
        });
        setApiImagesByTitle(byTitle);
        setExtraImages(images.filter((img) => img.image && !CURATED_TITLES.includes(img.title)));
      })
      .catch(() => {});
  }, []);

  // Category filter buttons matching the reference image
  const categories = [
    'All Attractions',
    'Thrill Slides',
    'Family Memory',
    'Kids Zone',
    'Guest Memories',
    'Happy moments',
  ];

  // Card items config mapped to exact positions. `src` falls back to the
  // bundled image, but uses a real admin-uploaded image if one exists
  // matching this card's title exactly.
  const cardData = {
    familySlides: {
      title: 'Family Slides',
      badge: 'Family Memory',
      category: 'Family Memory',
      src: apiImagesByTitle['Family Slides'] || imgFamilySlides,
    },
    waterSlides: {
      title: 'Water Slides',
      badge: 'Thrill slides',
      category: 'Thrill Slides',
      src: apiImagesByTitle['Water Slides'] || imgWaterSlides,
    },
    rainbowArches: {
      title: 'Rainbow Arches',
      badge: 'Thrilled Memory',
      category: 'Thrill Slides',
      src: apiImagesByTitle['Rainbow Arches'] || imgRainbowArches,
    },
    birthdayParty: {
      title: 'Birthday Party',
      badge: 'Happy Moments',
      category: 'Happy moments',
      src: apiImagesByTitle['Birthday Party'] || imgBirthdayParty,
    },
    lazyRiver: {
      title: 'Lazy River',
      badge: 'Guest Memory',
      category: 'Guest Memories',
      src: apiImagesByTitle['Lazy River'] || imgLazyRiver,
    },
    kidsPool: {
      title: 'Kids Pool',
      badge: 'Kids Zone',
      category: 'Kids Zone',
      src: apiImagesByTitle['Kids Pool'] || imgKidsPool,
    },
  };

  // Backend GalleryImage.category values (water_slides, lazy_river, etc.)
  // don't match this page's filter tab labels (Thrill Slides, Guest
  // Memories, etc.) — map them so filtering behaves correctly instead of
  // extra images silently disappearing when a specific tab is selected.
  const CATEGORY_TO_TAB = {
    water_slides: 'Thrill Slides',
    lazy_river: 'Guest Memories',
    kiddie_zone: 'Kids Zone',
    dining: 'Happy moments',
    events: 'Happy moments',
    general: 'Family Memory',
  };

  // Helper function to check category visibility
  const isVisible = (itemCategory) => {
    return activeTab === 'All Attractions' || activeTab === itemCategory;
  };

  // Shared Card Reusable Component
  const GalleryCard = ({ item, heightClass = 'h-[220px]' }) => {
    if (!isVisible(item.category)) return null;

    return (
      <div className={`relative w-full ${heightClass} rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer bg-slate-100`}>
        {/* Card Background Image */}
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark Bottom Gradient for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Card Content Overlay */}
        <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 right-4 z-10 text-white flex flex-col items-start gap-1.5">
          <span className="bg-[#00BCDE] text-white text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
            {item.badge}
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
            {item.title}
          </h3>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full font-sans pb-0 overflow-x-hidden bg-white">
      <SEO pageSlug="gallery" defaultTitle="Gallery | Murjan Splash Park" defaultDescription="Photos from Murjan Splash Park, Abu Dhabi." />

      {/* SECTION 1: HERO & MAIN HEAD OVERLAY WITH SUBHEAD */}
      <section className="relative w-full flex justify-center items-center">
        <img
          src={herobg}
          alt="Murjan Splash Park Gallery Hero Background"
          className="w-full h-auto max-w-full object-cover block min-h-[260px] bg-slate-100"
        />

        <div className="absolute inset-0 flex justify-center items-center pointer-events-none px-4">
          <ScrollReveal animation="zoom-in" delay={100} className="w-full max-w-4xl flex flex-col items-center text-center">
            {/* Main Head Image */}
            <img
              src={mainhead}
              alt="Dive Into the Fun!"
              className="w-full max-w-2xl h-auto object-contain mb-2 sm:mb-3"
            />
            {/* Subhead Text */}
            <p className="text-white text-xs sm:text-base md:text-lg font-medium drop-shadow-md max-w-xl">
              Explore our gallery of thrilling slides, relaxing pools, and unforgettable family moments at Murjan.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: HORIZONTAL CATEGORY FILTER BUTTONS */}
      <section className="relative w-full px-4 sm:px-8 pt-6 pb-8 flex justify-center bg-white">
        <div className="max-w-5xl w-full flex items-center justify-center">
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    activeTab === cat
                      ? 'bg-[#00BCDE] text-white shadow-sm'
                      : 'bg-[#EAEAEA] text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: EXACT MATCH ASYMMETRIC MASONRY GALLERY GRID */}
      <section className="relative w-full px-4 sm:px-8 pb-16 flex justify-center bg-white">
        <div className="max-w-5xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            
            {/* COLUMN 1: LEFT SIDE (2 COLS WIDE ON LARGE DESKTOP) */}
            <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">
              <ScrollReveal animation="fade-up" delay={100}>
                <GalleryCard item={cardData.familySlides} heightClass="h-[300px] sm:h-[380px]" />
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={150}>
                <GalleryCard item={cardData.waterSlides} heightClass="h-[200px] sm:h-[240px]" />
              </ScrollReveal>
            </div>

            {/* COLUMN 2: MIDDLE COLUMN */}
            <div className="lg:col-span-1 flex flex-col gap-4 sm:gap-5">
              <ScrollReveal animation="fade-up" delay={200}>
                <GalleryCard item={cardData.rainbowArches} heightClass="h-[220px] sm:h-[245px]" />
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={250}>
                <GalleryCard item={cardData.birthdayParty} heightClass="h-[280px] sm:h-[375px]" />
              </ScrollReveal>
            </div>

            {/* COLUMN 3: RIGHT COLUMN */}
            <div className="lg:col-span-1 flex flex-col gap-4 sm:gap-5">
              <ScrollReveal animation="fade-up" delay={300}>
                <GalleryCard item={cardData.lazyRiver} heightClass="h-[220px] sm:h-[245px]" />
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={350}>
                <GalleryCard item={cardData.kidsPool} heightClass="h-[220px] sm:h-[245px]" />
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: ADDITIONAL ADMIN-UPLOADED PHOTOS — anything added via the
          admin panel that isn't one of the 6 curated slots above still needs
          somewhere to appear, otherwise it silently vanishes from this page. */}
      {extraImages.filter((img) => isVisible(CATEGORY_TO_TAB[img.category] || 'Family Memory')).length > 0 && (
        <section className="relative w-full px-4 sm:px-8 pb-16 flex justify-center bg-white">
          <div className="max-w-5xl w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {extraImages
                .filter((img) => isVisible(CATEGORY_TO_TAB[img.category] || 'Family Memory'))
                .map((img, idx) => (
                  <ScrollReveal key={img.id} animation="fade-up" delay={100 + idx * 50}>
                    <GalleryCard
                      item={{ title: img.title, badge: img.caption || img.category, category: CATEGORY_TO_TAB[img.category] || 'Family Memory', src: img.image }}
                      heightClass="h-[220px] sm:h-[260px]"
                    />
                  </ScrollReveal>
                ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}