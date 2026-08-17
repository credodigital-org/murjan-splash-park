import React, { useEffect, useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import SEO from "../components/SEO";
import { getGalleryImages } from "../services/galleryService";

// Hero assets remain static because they are part of the page design.
import herobg from "../assets/GalleryImages/herobg.webp";
import mainhead from "../assets/GalleryImages/herotext.png";


// --------------------------------------------------
// Backend category → Frontend tab mapping
// --------------------------------------------------

// const CATEGORY_TO_TAB = {
//   water_slides: "Thrill Slides",
//   lazy_river: "Guest Memories",
//   kiddie_zone: "Kids Zone",
//   dining: "Happy moments",
//   events: "Happy moments",
//   general: "Family Memory",
// };

const CATEGORY_TO_TAB = {
  water_slides: "Thrill Slides",
  lazy_river: "Family Memory",
  kiddie_zone: "Kids Zone",
  dining: "Guest Memories",
  events: "Happy moments",
  general: "General",
};


// --------------------------------------------------
// Category filter buttons
// --------------------------------------------------

const categories = [
  "All Attractions",
  "Thrill Slides",
  "Family Memory",
  "Kids Zone",
  "Guest Memories",
  "Happy moments",
];


// --------------------------------------------------
// Convert backend category into the frontend label
// --------------------------------------------------

const getDisplayCategory = (category) => {
  return CATEGORY_TO_TAB[category] || "Family Memory";
};


// --------------------------------------------------
// Gallery page
// --------------------------------------------------

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All Attractions");

  const [galleryImages, setGalleryImages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);


  // ------------------------------------------------
  // Load gallery from backend
  // ------------------------------------------------

  useEffect(() => {
    let mounted = true;

    const loadGallery = async () => {
      try {
        setLoading(true);
        setError(null);

        const images = await getGalleryImages();

        if (!mounted) return;

        /*
         * The backend is the source of truth.
         *
         * Do NOT use hardcoded gallery images here.
         */
        // const normalizedImages = Array.isArray(images)
        //   ? images
        //       .filter((item) => item && item.image)
        //       .map((item) => ({
        //         id: item.id,
        //         title: item.title || "Murjan Splash Park",
        //         badge:
        //           item.caption ||
        //           getDisplayCategory(item.category),
        //         category: getDisplayCategory(item.category),
        //         src: item.image,
        //       }))
        //   : [];

        const normalizedImages = Array.isArray(images)
  ? images
      .filter((item) => item && item.image)
      .sort(
        (a, b) =>
          (Number(a.display_order) || 0) -
          (Number(b.display_order) || 0)
      )
      .map((item) => ({
        id: item.id,
        title: item.title || "Murjan Splash Park",
        badge:
          item.caption ||
          getDisplayCategory(item.category),
        category: getDisplayCategory(item.category),
        src: item.image,
        displayOrder: Number(item.display_order) || 0,
      }))
  : [];

        setGalleryImages(normalizedImages);
      } catch (err) {
        console.error("Failed to load gallery images:", err);

        if (mounted) {
          setError("Unable to load gallery images.");
          setGalleryImages([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadGallery();

    return () => {
      mounted = false;
    };
  }, []);


  // ------------------------------------------------
  // Filter gallery
  // ------------------------------------------------

  const filteredImages =
    activeTab === "All Attractions"
      ? galleryImages
      : galleryImages.filter(
          (item) => item.category === activeTab
        );


  // ------------------------------------------------
  // Fixed six-slot masonry layout
  //
  // The DESIGN remains the same.
  // The IMAGE DATA comes from the backend.
  // ------------------------------------------------

  const cardData = [
    filteredImages[0],
    filteredImages[1],
    filteredImages[2],
    filteredImages[3],
    filteredImages[4],
    filteredImages[5],
  ];


  // ------------------------------------------------
  // Gallery card
  // ------------------------------------------------

  const GalleryCard = ({
    item,
    heightClass = "h-[280px] sm:h-[340px]",
  }) => {
    if (!item) {
      return null;
    }

    return (
      <div
        className={`
          relative
          w-full
          ${heightClass}
          rounded-2xl
          sm:rounded-3xl
          overflow-hidden
          shadow-sm
          hover:shadow-md
          transition-all
          duration-300
          group
          cursor-pointer
          bg-slate-100
        `}
      >
        {/* Background Image */}

        {/* <img
          src={item.src}
          alt={item.title}
          className="
            w-full
            h-full
            object-cover
            group-hover:scale-105
            transition-transform
            duration-500
          "
        /> */}
        <img
  src={item.src}
  alt={item.title}
  loading="lazy"
  decoding="async"
  className="
    w-full
    h-full
    object-cover
    group-hover:scale-105
    transition-transform
    duration-500
  "
/>

        {/* Dark Gradient */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/80
            via-black/20
            to-transparent
            pointer-events-none
          "
        />

        {/* Card Content */}

        <div
          className="
            absolute
            bottom-4
            left-4
            sm:bottom-5
            sm:left-5
            right-4
            z-10
            text-white
            flex
            flex-col
            items-start
            gap-1.5
          "
        >
          <span
            className="
              bg-[#00BCDE]
              text-white
              text-[10px]
              sm:text-xs
              font-semibold
              px-2.5
              py-0.5
              rounded-full
              shadow-sm
            "
          >
            {item.badge}
          </span>

          <h3
            className="
              text-xl
              sm:text-2xl
              md:text-3xl
              font-extrabold
              tracking-tight
              leading-tight
            "
          >
            {item.title}
          </h3>
        </div>
      </div>
    );
  };


  // ------------------------------------------------
  // Loading
  // ------------------------------------------------

  if (loading) {
    return (
      <div className="w-full bg-white">
        <section className="relative w-full flex justify-center items-center">
          <img
            src={herobg}
            alt="Murjan Splash Park Gallery Hero Background"
            className="
              w-full
              h-auto
              max-w-full
              object-cover
              block
              min-h-[260px]
              bg-slate-100
            "
          />

          <div className="absolute inset-0 flex justify-center items-center px-4">
            <img
              src={mainhead}
              alt="Dive Into the Fun!"
              className="
                w-full
                max-w-2xl
                h-auto
                object-contain
              "
            />
          </div>
        </section>

        <div className="flex justify-center py-16">
          <p className="text-gray-500">
            Loading gallery...
          </p>
        </div>
      </div>
    );
  }


  // ------------------------------------------------
  // Render
  // ------------------------------------------------

  return (
    <div
      className="
        w-full
        font-sans
        pb-0
        overflow-x-hidden
        bg-white
      "
    >
      <SEO
        pageSlug="gallery"
        defaultTitle="Gallery | Murjan Splash Park"
        defaultDescription="Photos from Murjan Splash Park, Abu Dhabi."
      />


      {/* ==================================================
          SECTION 1: HERO
      ================================================== */}

      <section
        className="
          relative
          w-full
          flex
          justify-center
          items-center
        "
      >
        <img
          src={herobg}
          alt="Murjan Splash Park Gallery Hero Background"
          className="
            w-full
            h-auto
            max-w-full
            object-cover
            block
            min-h-[260px]
            bg-slate-100
          "
        />

        <div
          className="
            absolute
            inset-0
            flex
            justify-center
            items-center
            pointer-events-none
            px-4
          "
        >
          <ScrollReveal
            animation="zoom-in"
            delay={100}
            className="
              w-full
              max-w-4xl
              flex
              flex-col
              items-center
              text-center
            "
          >
            <img
              src={mainhead}
              alt="Dive Into the Fun!"
              className="
                w-full
                max-w-2xl
                h-auto
                object-contain
                mb-2
                sm:mb-3
              "
            />

            <p
              className="
                text-white
                text-xs
                sm:text-base
                md:text-lg
                font-medium
                drop-shadow-md
                max-w-xl
              "
            >
              Explore our gallery of thrilling slides,
              relaxing pools, and unforgettable family
              moments at Murjan.
            </p>
          </ScrollReveal>
        </div>
      </section>


      {/* ==================================================
          SECTION 2: CATEGORY FILTER
      ================================================== */}

      <section
        className="
          relative
          w-full
          px-4
          sm:px-8
          pt-6
          pb-8
          flex
          justify-center
          bg-white
        "
      >
        <div
          className="
            max-w-5xl
            w-full
            flex
            items-center
            justify-center
          "
        >
          <ScrollReveal
            animation="fade-up"
            delay={150}
          >
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-2.5
                sm:gap-4
              "
            >
              {categories.map((cat) => (
           <button
  key={cat}
  onClick={() => setActiveTab(cat)}
  className={`
    px-4
    sm:px-5
    py-2
    rounded-none
    text-xs
    sm:text-sm
    font-semibold
    transition-all
    duration-200
    ${
      activeTab === cat
        ? "bg-[#00BCDE] text-white shadow-sm"
        : "bg-[#EAEAEA] text-gray-700 hover:bg-gray-300"
    }
  `}
>
  {cat}
</button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ==================================================
          SECTION 3: GALLERY
      ================================================== */}

      <section
        className="
          relative
          w-full
          px-4
          sm:px-8
          pb-16
          flex
          justify-center
          bg-white
        "
      >
        <div className="max-w-5xl w-full">

          {/* API ERROR */}

          {error && (
            <div className="text-center py-10">
              <p className="text-red-500">
                {error}
              </p>
            </div>
          )}


          {/* EMPTY STATE */}

          {!error && filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">
                No gallery images available.
              </p>
            </div>
          )}


          {/* ==================================================
              ALL ATTRACTIONS
          ================================================== */}

          {!error &&
            filteredImages.length > 0 &&
            activeTab === "All Attractions" && (
              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  lg:grid-cols-4
                  gap-4
                  sm:gap-5
                "
              >

                {/* COLUMN 1 */}

                <div
                  className="
                    lg:col-span-2
                    flex
                    flex-col
                    gap-4
                    sm:gap-5
                  "
                >
                  {cardData[0] && (
                    <ScrollReveal
                      animation="fade-up"
                      delay={100}
                    >
                      <GalleryCard
                        item={cardData[0]}
                        heightClass="
                          h-[300px]
                          sm:h-[380px]
                        "
                      />
                    </ScrollReveal>
                  )}

                  {cardData[1] && (
                    <ScrollReveal
                      animation="fade-up"
                      delay={150}
                    >
                      <GalleryCard
                        item={cardData[1]}
                        heightClass="
                          h-[200px]
                          sm:h-[240px]
                        "
                      />
                    </ScrollReveal>
                  )}
                </div>


                {/* COLUMN 2 */}

                <div
                  className="
                    lg:col-span-1
                    flex
                    flex-col
                    gap-4
                    sm:gap-5
                  "
                >
                  {cardData[2] && (
                    <ScrollReveal
                      animation="fade-up"
                      delay={200}
                    >
                      <GalleryCard
                        item={cardData[2]}
                        heightClass="
                          h-[220px]
                          sm:h-[245px]
                        "
                      />
                    </ScrollReveal>
                  )}

                  {cardData[3] && (
                    <ScrollReveal
                      animation="fade-up"
                      delay={250}
                    >
                      <GalleryCard
                        item={cardData[3]}
                        heightClass="
                          h-[280px]
                          sm:h-[375px]
                        "
                      />
                    </ScrollReveal>
                  )}
                </div>


                {/* COLUMN 3 */}

                <div
                  className="
                    lg:col-span-1
                    flex
                    flex-col
                    gap-4
                    sm:gap-5
                  "
                >
                  {cardData[4] && (
                    <ScrollReveal
                      animation="fade-up"
                      delay={300}
                    >
                      <GalleryCard
                        item={cardData[4]}
                        heightClass="
                          h-[220px]
                          sm:h-[245px]
                        "
                      />
                    </ScrollReveal>
                  )}

                  {cardData[5] && (
                    <ScrollReveal
                      animation="fade-up"
                      delay={350}
                    >
                      <GalleryCard
                        item={cardData[5]}
                        heightClass="
                          h-[220px]
                          sm:h-[245px]
                        "
                      />
                    </ScrollReveal>
                  )}
                </div>

              </div>
            )}


          {/* ==================================================
              FILTERED CATEGORY VIEW
          ================================================== */}

          {!error &&
            filteredImages.length > 0 &&
            activeTab !== "All Attractions" && (
              <div
                className="
                  flex
                  flex-wrap
                  justify-center
                  items-center
                  gap-6
                  max-w-4xl
                  mx-auto
                "
              >
                {filteredImages.map((item, index) => (
                  <div
                    key={item.id || `${item.title}-${index}`}
                    className="
                      w-full
                      sm:w-[380px]
                    "
                  >
                    <ScrollReveal
                      animation="fade-up"
                      delay={100 * (index + 1)}
                    >
                      <GalleryCard
                        item={item}
                        heightClass="
                          h-[300px]
                          sm:h-[360px]
                        "
                      />
                    </ScrollReveal>
                  </div>
                ))}
              </div>
            )}

        </div>
      </section>
    </div>
  );
}