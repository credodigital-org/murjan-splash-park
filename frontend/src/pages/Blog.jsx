import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import { getBlogs } from "../services/blogService";

// --------------------------------------------------
// Hero Assets
// These are design assets and remain static.
// --------------------------------------------------

import herobg from "../assets/BlogImages/herobg.png";
import mainhead from "../assets/BlogImages/herotext.png";

// --------------------------------------------------
// Create a short text preview from blog HTML/content
// --------------------------------------------------

function getBlogPreview(content, maxLength = 30) {
  if (!content) return "";

  const temp = document.createElement("div");
  temp.innerHTML = content;

  // If blog content contains HTML paragraphs,
  // use ONLY the first real paragraph.
  const paragraphs = temp.querySelectorAll("p");

  let text = "";

  if (paragraphs.length > 0) {
    for (const paragraph of paragraphs) {
      const paragraphText = paragraph.textContent
        ?.replace(/\s+/g, " ")
        .trim();

      if (paragraphText) {
        text = paragraphText;
        break;
      }
    }
  }

  // Fallback for plain-text blog content
  if (!text) {
    text = (temp.textContent || temp.innerText || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  if (text.length > maxLength) {
    return `${text.slice(0, maxLength).trim()}...`;
  }

  return text;
}
// --------------------------------------------------
// Blog Page
// --------------------------------------------------

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --------------------------------------------------
  // Load blog posts from backend
  // --------------------------------------------------

  useEffect(() => {
    let mounted = true;

    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const posts = await getBlogs();

        if (!mounted) {
          return;
        }

        /*
         * Backend is the ONLY source of blog content.
         *
         * No hardcoded blog posts.
         * No local fallback images.
         */

        const normalizedPosts = Array.isArray(posts)
          ? posts
              .filter((post) => post)
              .map((post) => ({
                id: post.id ?? post.slug,
                slug: post.slug,
                title: post.title || "",
                description: post.content || "",
                image: post.featured_image || "",
              }))
              .filter(
                (post) =>
                  post.title ||
                  post.description ||
                  post.image
              )
          : [];

        setBlogPosts(normalizedPosts);
      } catch (err) {
        console.error("Failed to load blog posts:", err);

        if (mounted) {
          setBlogPosts([]);
          setError("Unable to load blog posts.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadBlogs();

    return () => {
      mounted = false;
    };
  }, []);

  // --------------------------------------------------
  // Loading State
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="w-full font-sans pb-0 overflow-x-hidden bg-white">

        {/* ==================================================
            HERO
        ================================================== */}

        <section className="relative w-full flex justify-center items-center">

          <img
            src={herobg}
            alt="Murjan Splash Park Blog Hero Background"
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

          <div className="absolute inset-0 flex justify-center items-center pointer-events-none px-4">

            <img
              src={mainhead}
              alt="Read More About Us"
              className="
                w-full
                max-w-2xl
                h-auto
                object-contain
              "
            />

          </div>
        </section>

        {/* ==================================================
            LOADING
        ================================================== */}

        <section className="w-full flex justify-center py-20">

          <p className="text-gray-500">
            Loading blog posts...
          </p>

        </section>

      </div>
    );
  }

  // --------------------------------------------------
  // Main Page
  // --------------------------------------------------

  return (
    <div className="w-full font-sans pb-0 overflow-x-hidden bg-white">

      {/* ==================================================
          SECTION 1: HERO & MAIN HEAD OVERLAY
      ================================================== */}

      <section className="relative w-full flex justify-center items-center">

        <img
          src={herobg}
          alt="Murjan Splash Park Blog Hero Background"
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

        <div className="absolute inset-0 flex justify-center items-center pointer-events-none px-4">

          <ScrollReveal
            animation="zoom-in"
            delay={100}
            className="
              w-full
              max-w-4xl
              flex
              justify-center
            "
          >

            <img
              src={mainhead}
              alt="Read More About Us"
              className="
                w-full
                max-w-2xl
                h-auto
                object-contain
              "
            />

          </ScrollReveal>

        </div>
      </section>

      {/* ==================================================
          SECTION 2: INTRO CARD
      ================================================== */}

      <section
        className="
          relative
          w-full
          px-4
          sm:px-8
          -mt-10
          sm:-mt-16
          z-20
          flex
          justify-center
        "
      >

        <div
          className="
            max-w-5xl
            w-full
            bg-[#F5FCFD]
            border
            border-cyan-50/60
            rounded-[32px]
            sm:rounded-[40px]
            px-6
            sm:px-12
            py-10
            sm:py-14
            text-center
            shadow-sm
          "
        >

          <ScrollReveal
            animation="fade-up"
            delay={100}
          >

            {/* Heading */}

            <h2
              className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-extrabold
                text-[#00BCDE]
                mb-4
                sm:mb-6
              "
            >
              Dive Into Adventure
            </h2>

            {/* Description */}

            <p
              className="
                text-xs
                sm:text-sm
                md:text-base
                font-normal
                text-gray-600
                leading-relaxed
                max-w-3xl
                mx-auto
                mb-8
              "
            >
              At Murjan, our mission is simple: to provide an
              exuberant, refreshing escape from the everyday.
              We are dedicated to delivering high-energy family
              fun and safe, buoyant adventures for visitors of
              all ages. From thrilling water slides to relaxing
              splash pads, every detail is designed to maximize
              excitement and create lasting memories under the sun.
            </p>

            {/* Water Drop Icon */}

            <div className="flex justify-center items-center">

              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-[#D5F5FA]
                  flex
                  items-center
                  justify-center
                "
              >

                <svg
                  className="w-6 h-6 text-[#00BCDE]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="
                      M12 2.69
                      l5.66 5.66
                      a8 8 0 1 1-11.31 0z
                    "
                  />
                </svg>

              </div>

            </div>

          </ScrollReveal>

        </div>

      </section>

      {/* ==================================================
          SECTION 3: BLOG CARDS
      ================================================== */}

      <section
        className="
          relative
          w-full
          px-4
          sm:px-8
          pt-12
          pb-20
          sm:pb-24
          flex
          justify-center
          bg-white
        "
      >

        <div className="max-w-5xl w-full">

          {/* ==================================================
              ERROR STATE
          ================================================== */}

          {error && (
            <div className="text-center py-12">

              <p className="text-red-500">
                {error}
              </p>

            </div>
          )}

          {/* ==================================================
              EMPTY STATE
          ================================================== */}

          {!error && blogPosts.length === 0 && (
            <div className="text-center py-16">

              <p className="text-gray-500 text-base">
                No blog posts available.
              </p>

            </div>
          )}

          {/* ==================================================
              BLOG GRID
          ================================================== */}

          {!error && blogPosts.length > 0 && (
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
                sm:gap-8
                items-start
              "
            >

              {blogPosts.map((post, index) => (

                <ScrollReveal
                  key={post.id || post.slug || index}
                  animation="fade-up"
                  delay={100 + index * 100}
                  className={
                    index % 3 === 1
                      ? "md:mt-8 lg:mt-12"
                      : ""
                  }
                >

                  {/* ==================================================
                      ENTIRE CARD IS CLICKABLE
                  ================================================== */}

                  <Link
                    to={`/blog/${post.slug || post.id}`}
                    className="
                      group
                      block
                      bg-[#F5FCFD]
                      rounded-3xl
                      overflow-hidden
                      shadow-sm
                      border
                      border-cyan-50/50
                      flex
                      flex-col
                      hover:shadow-lg
                      hover:-translate-y-1
                      transition-all
                      duration-300
                      no-underline
                    "
                  >

                    {/* ==================================================
                        CARD IMAGE
                    ================================================== */}

                    <div
                      className="
                        w-full
                        // h-48
                        // sm:h-52
                        h-40
sm:h-44
                        bg-slate-100
                        overflow-hidden
                      "
                    >

                      {post.image ? (

                        <img
                          src={post.image}
                          alt={post.title}
                          className="
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                          "
                        />

                      ) : (

                        <div
                          className="
                            w-full
                            h-full
                            flex
                            items-center
                            justify-center
                            bg-[#EAF9FC]
                            text-gray-400
                            text-sm
                          "
                        >
                          No image
                        </div>

                      )}

                    </div>

                    {/* ==================================================
                        CARD BODY
                    ================================================== */}

                    <div
                      className="
                        p-6
                        sm:p-7
                        flex
                        flex-col
                        flex-grow
                      "
                    >

                      {/* ==================================================
                          BLOG TITLE
                      ================================================== */}

                      <h3
                        className="
                          text-xl
                          sm:text-2xl
                          font-extrabold
                          text-gray-900
                          mb-3
                          leading-tight
                          transition-colors
                          duration-300
                          group-hover:text-[#00BCDE]
                        "
                      >
                        {post.title}
                      </h3>

                      {/* ==================================================
                          SHORT BLOG PREVIEW
                      ================================================== */}

                      {/* <p
                        className="
                          text-xs
                          sm:text-sm
                          text-gray-600
                          leading-relaxed
                          font-normal
                          mb-5
                        "
                      >
                        {getBlogPreview(post.description, 90)}
                      </p> */}
                      <p
  className="
    text-xs
    sm:text-sm
    text-gray-600
    leading-relaxed
    font-normal
    mb-4
    line-clamp-2
    min-h-[40px]
  "
>
  {getBlogPreview(post.description, 90)}
</p>

                      {/* ==================================================
                          READ MORE
                      ================================================== */}

                      <div
                        className="
                          inline-flex
                          items-center
                          gap-2
                          self-start
                          text-sm
                          font-bold
                          text-[#00BCDE]
                          group-hover:text-[#080B38]
                          transition-colors
                          duration-300
                        "
                      >

                        <span>
                          Read More
                        </span>

                        <span
                          className="
                            text-base
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        >
                          →
                        </span>

                      </div>

                    </div>

                  </Link>

                </ScrollReveal>

              ))}

            </div>
          )}

        </div>

      </section>

    </div>
  );
}