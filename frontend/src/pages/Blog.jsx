import React, { useEffect, useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { getBlogs } from '../services/blogService';
import SEO from '../components/SEO';

// Hero Assets
import herobg from '../assets/BlogImages/herobg.png'; 
import mainhead from '../assets/BlogImages/herotext.png';

// Blog Card Image Assets
import blogImg1 from '../assets/HomeImages/dining.png';
import blogImg2 from '../assets/BlogImages/img2.png';
import blogImg3 from '../assets/AttractionImages/img9.png';

// Module-level (not re-created every render) so useEffect's dependency
// array can safely omit it without a stale-closure risk.
const localFallbackImages = { 'Birthday Parties': blogImg1, 'Interactive Water Play': blogImg2, 'Playground Adventures': blogImg3 };

export default function Blog() {
  const defaultPosts = [
    { id: 'birthday-parties', title: 'Birthday Parties', description: 'Celebrate your special day with a splash! Our customizable party packages offer dedicated spaces, catering, and non-stop water fun for unforgettable birthdays.', image: blogImg1 },
    { id: 'interactive-water-play', title: 'Interactive Water Play', description: 'Engage the senses with our dynamic splash zones and interactive fountains. Perfect for toddlers and kids wanting to cool off in a safe, engaging environment.', image: blogImg2 },
    { id: 'playground-adventures', title: 'Playground Adventures', description: 'Beyond the water, explore our extensive dry play areas. Shaded structures and safe equipment ensure the adventure continues even out of the pool.', image: blogImg3 },
  ];
  const [blogPosts, setBlogPosts] = useState(defaultPosts);

  useEffect(() => {
    getBlogs()
      .then((posts) => {
        if (!posts || posts.length === 0) return; // keep defaults if nothing published yet
        setBlogPosts(
          posts.map((p) => ({
            id: p.slug,
            title: p.title,
            description: p.excerpt,
            image: p.featured_image || localFallbackImages[p.title] || blogImg1,
          }))
        );
      })
      .catch(() => {}); // keep defaults on error
  }, []);

  return (
    <div className="w-full font-sans pb-0 overflow-x-hidden bg-white">
      <SEO pageSlug="blog" defaultTitle="Blog | Murjan Splash Park" defaultDescription="News and updates from Murjan Splash Park, Abu Dhabi." />

      {/* SECTION 1: HERO & MAIN HEAD OVERLAY */}
      <section className="relative w-full flex justify-center items-center">
        <img
          src={herobg}
          alt="Murjan Splash Park Blog Hero Background"
          className="w-full h-auto max-w-full object-cover block min-h-[260px] bg-slate-100"
        />

        <div className="absolute inset-0 flex justify-center items-center pointer-events-none px-4">
          <ScrollReveal animation="zoom-in" delay={100} className="w-full max-w-4xl flex justify-center">
            <img
              src={mainhead}
              alt="Read More About Us"
              className="w-full max-w-2xl h-auto object-contain"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: INTRO CARD ("Dive Into Adventure") */}
      <section className="relative w-full px-4 sm:px-8 -mt-10 sm:-mt-16 z-20 flex justify-center">
        <div className="max-w-5xl w-full bg-[#F5FCFD] border border-cyan-50/60 rounded-[32px] sm:rounded-[40px] px-6 sm:px-12 py-10 sm:py-14 text-center shadow-sm">
          <ScrollReveal animation="fade-up" delay={100}>
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#00BCDE] mb-4 sm:mb-6">
              Dive Into Adventure
            </h2>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm md:text-base font-normal text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              At Murjan, our mission is simple: to provide an exuberant, refreshing escape from the everyday. We are dedicated to delivering high-energy family fun and safe, buoyant adventures for visitors of all ages. From thrilling water slides to relaxing splash pads, every detail is designed to maximize excitement and create lasting memories under the sun.
            </p>

            {/* Water Drop Icon Container */}
            <div className="flex justify-center items-center">
              <div className="w-12 h-12 rounded-full bg-[#D5F5FA] flex items-center justify-center">
                <svg className="w-6 h-6 text-[#00BCDE]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: 3 BLOG CARDS GRID (WITH STEPPED CENTER CARD) */}
      <section className="relative w-full px-4 sm:px-8 pt-12 pb-20 sm:pb-24 flex justify-center bg-white">
        <div className="max-w-5xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
            {blogPosts.map((post, index) => (
              <ScrollReveal
                key={post.id}
                animation="fade-up"
                delay={100 + index * 100}
                /* Stepping down the middle card (index === 1) on medium and larger screens */
                className={index === 1 ? 'md:mt-8 lg:mt-12' : ''}
              >
                <div className="bg-[#F5FCFD] rounded-3xl overflow-hidden shadow-sm border border-cyan-50/50 flex flex-col hover:shadow-md transition-all duration-300">
                  {/* Card Image Container */}
                  <div className="w-full h-48 sm:h-52 bg-slate-100 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex flex-col flex-grow">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {post.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}