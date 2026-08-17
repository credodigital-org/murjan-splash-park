import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import { getBlogs } from "../services/blogService";
import SEO from "../components/SEO";

export default function BlogDetail() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const posts = await getBlogs();

        const foundPost = Array.isArray(posts)
          ? posts.find(
              (item) =>
                item?.slug === slug ||
                String(item?.id) === String(slug)
            )
          : null;

        if (!mounted) return;

        if (!foundPost) {
          setError("Blog post not found.");
          setPost(null);
          return;
        }

        setPost(foundPost);
      } catch (err) {
        console.error("Failed to load blog post:", err);

        if (mounted) {
          setError("Unable to load this blog post.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadBlog();

    return () => {
      mounted = false;
    };
  }, [slug]);

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-white">
        <p className="text-gray-500 text-sm">
          Loading blog post...
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // Error / Not Found
  // --------------------------------------------------

  if (error || !post) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-4 bg-white text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#080B38] mb-3">
          Blog Not Found
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          {error || "The blog post you are looking for does not exist."}
        </p>

        <Link
          to="/blog"
          className="
            inline-flex
            items-center
            justify-center
            px-6
            py-3
            rounded-full
            bg-[#FFE000]
            text-[#080B38]
            font-bold
            text-sm
            hover:scale-105
            transition-transform
            no-underline
          "
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full font-sans bg-white">

      <SEO
        pageSlug="blog"
        defaultTitle={`${post.title} | Murjan Splash Park`}
        defaultDescription={
          post.content
            ? post.content.replace(/<[^>]*>/g, "").slice(0, 160)
            : post.title
        }
      />

      {/* ==================================================
          HERO / BLOG IMAGE
      ================================================== */}

      <section className="w-full bg-[#F5FCFD]">

        {post.featured_image ? (
          <div className="w-full h-[260px] sm:h-[380px] md:h-[480px] lg:h-[560px] overflow-hidden">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-[260px] sm:h-[380px] md:h-[480px] bg-[#EAF9FC] flex items-center justify-center">
            <span className="text-gray-400">
              No image available
            </span>
          </div>
        )}

      </section>

      {/* ==================================================
          BLOG CONTENT
      ================================================== */}

      <section className="relative w-full px-4 sm:px-8 py-10 sm:py-14 md:py-20 flex justify-center">

        <div className="w-full max-w-4xl">

          {/* Back Button */}

          <ScrollReveal animation="fade-up" delay={50}>
            <Link
              to="/blog"
              className="
                inline-flex
                items-center
                gap-2
                mb-8
                text-sm
                font-bold
                text-[#080B38]
                hover:text-[#00BCDE]
                transition-colors
                no-underline
              "
            >
              <span className="text-lg">←</span>
              Back to Blogs
            </Link>
          </ScrollReveal>

          {/* Blog Heading */}

          <ScrollReveal animation="fade-up" delay={100}>
            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-extrabold
                leading-tight
                text-[#080B38]
                mb-6
              "
            >
              {post.title}
            </h1>
          </ScrollReveal>

          {/* Divider */}

          <div className="w-16 h-1 bg-[#FFE000] rounded-full mb-8" />

          {/* Full Blog Content */}

          <ScrollReveal animation="fade-up" delay={150}>
            <article
              className="
                prose
                prose-sm
                sm:prose-base
                lg:prose-lg
                max-w-none

                prose-headings:text-[#080B38]
                prose-headings:font-extrabold

                prose-p:text-gray-700
                prose-p:leading-relaxed

                prose-a:text-[#00BCDE]
                prose-a:font-semibold

                prose-strong:text-[#080B38]

                prose-img:rounded-2xl
                prose-img:w-full
              "
              dangerouslySetInnerHTML={{
                __html: post.content || "",
              }}
            />
          </ScrollReveal>

          {/* Bottom Back Button */}

          <div className="mt-12 pt-8 border-t border-gray-100">

            <Link
              to="/blog"
              className="
                inline-flex
                items-center
                gap-2
                px-6
                py-3
                rounded-full
                bg-[#FFE000]
                text-[#080B38]
                font-bold
                text-sm
                hover:scale-105
                transition-transform
                no-underline
              "
            >
              ← Back to All Blogs
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

