from django.http import HttpResponse
from django.urls import reverse
from django.utils import timezone
from apps.blog.models import BlogPost
from apps.pages.models import Page


def sitemap_xml(request):
    """
    Dynamically generated sitemap — automatically includes new blog posts
    and pages as they're published, with no manual maintenance needed.
    IMPORTANT: update BASE_URL below to the real production domain before launch.
    """
    BASE_URL = "https://murjansplashpark.com"  # TODO: confirm/update at deploy time

    static_pages = [
        ("", "1.0", "daily"),          # homepage — highest priority given branded search volume
        ("/tickets", "0.9", "weekly"), # commercial-intent page, protect this
        ("/gallery", "0.6", "weekly"),
        ("/blog", "0.6", "weekly"),
        ("/contact", "0.5", "monthly"),
    ]

    urls = []
    for path, priority, freq in static_pages:
        urls.append(f"""
  <url>
    <loc>{BASE_URL}{path}</loc>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
  </url>""")

    for page in Page.objects.filter(is_published=True):
        urls.append(f"""
  <url>
    <loc>{BASE_URL}/{page.slug}</loc>
    <lastmod>{page.updated_at.date().isoformat()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>""")

    for post in BlogPost.objects.filter(status="published"):
        urls.append(f"""
  <url>
    <loc>{BASE_URL}/blog/{post.slug}</loc>
    <lastmod>{post.updated_at.date().isoformat()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>""")

    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{''.join(urls)}
</urlset>"""

    return HttpResponse(xml, content_type="application/xml")


def robots_txt(request):
    content = """User-agent: *
Allow: /

Sitemap: https://murjansplashpark.com/sitemap.xml
"""
    return HttpResponse(content, content_type="text/plain")
