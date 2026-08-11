import shutil
from pathlib import Path
from datetime import time, date
from django.core.files import File
from django.core.management.base import BaseCommand
from django.conf import settings
from django.utils import timezone

from apps.site_settings.models import (
    SiteSettings, WorkingHours, AnnouncementBanner, PageSEO,
    HeroSection, FeatureHighlight, Testimonial,
)
from apps.pages.models import Page
from apps.gallery.models import GalleryImage
from apps.blog.models import BlogPost
from apps.tickets.models import TicketType

# Real asset files from the live frontend (frontend/src/assets/...), copied
# into media so the seeded content is pixel-identical to the actual design
# instead of generic placeholders — makes admin-editable content a true
# drop-in replacement for what was previously hardcoded.
FRONTEND_ASSETS = settings.BASE_DIR.parent / "frontend" / "src" / "assets"


def attach_image(instance, field_name, relative_asset_path):
    """Copy a real frontend asset into the model's image field, if it exists."""
    src = FRONTEND_ASSETS / relative_asset_path
    if not src.exists():
        return
    with open(src, "rb") as f:
        getattr(instance, field_name).save(src.name, File(f), save=True)


class Command(BaseCommand):
    help = "Seed the database with the site's real content (matching the live frontend design) so admin-managed data is a true drop-in replacement for what was hardcoded."

    def handle(self, *args, **options):
        self.stdout.write("Seeding Murjan Splash Park real content...")

        # --- Site Settings (singleton) ---
        settings_obj, _ = SiteSettings.objects.get_or_create(pk=1)
        settings_obj.site_name = "Murjan Splash Park"
        settings_obj.phone = "+97126756409"
        settings_obj.whatsapp_number = "+971527186938"
        settings_obj.email = "info@murjansplashpark.com"
        settings_obj.address = "Inside Khalifa Park, Opp. FAB, Abu Dhabi"
        settings_obj.instagram_url = "https://www.instagram.com/murjansplashpark?igsh=cmdwNW5ubGp6emVv"
        settings_obj.facebook_url = "https://www.facebook.com/MurjanSplashParkOfficial/"
        settings_obj.footer_text = "The region's premier family water park experience — open daily, creating memories since 2013."
        settings_obj.copyright_text = "© 2026 Murjan Splash Park. All rights reserved."
        settings_obj.booking_redirect_url = "https://book.murjansplashpark.com"
        settings_obj.default_meta_title = "Murjan Splash Park | Water Park in Abu Dhabi, Khalifa Park"
        settings_obj.default_meta_description = "Murjan Splash Park - Abu Dhabi's premier water park inside Khalifa Park. Slides, lazy river, kiddie zone, and dining for the whole family."
        settings_obj.save()
        self.stdout.write(self.style.SUCCESS("  Site settings created (real contact info/socials)"))

        # --- Hero Section ---
        hero, _ = HeroSection.objects.get_or_create(pk=1)
        hero.headline = "Dive in to endless fun"
        hero.subheadline = "Welcome Fantasea"
        hero.cta_text = "Book Tickets"
        attach_image(hero, "background_image", "HomeImages/herobg.png")
        hero.save()
        self.stdout.write(self.style.SUCCESS("  Hero section created (real background image)"))

        # --- Working Hours — real hours: 1PM-9PM daily (per live ticker bar) ---
        for day, _ in WorkingHours.DAY_CHOICES:
            wh, _ = WorkingHours.objects.get_or_create(
                day=day, defaults={"opening_time": time(13, 0), "closing_time": time(21, 0)}
            )
            wh.opening_time = time(13, 0)
            wh.closing_time = time(21, 0)
            wh.save()
        self.stdout.write(self.style.SUCCESS("  Working hours created (1pm-9pm daily, matches live ticker)"))

        # --- Feature Highlights ("Why Murjan") — real copy + real illustration images ---
        features_data = [
            ("safe-families.png", "Safe for Families", "Certified lifeguards on duty at every attraction, every hour of operation."),
            ("exciting-attractions.png", "Exciting Attractions", "10+ rides and pools crafted for maximum joy, variety, and wonder."),
            ("delicious-dining.png", "Delicious Dining", "Seven venues serving fresh, locally sourced cuisine and refreshments."),
            ("pristine-facilities.png", "Pristine Facilities", "Maintained to international standards — spotless, safe, and welcoming."),
        ]
        for i, (img_file, title, desc) in enumerate(features_data):
            feat, _ = FeatureHighlight.objects.get_or_create(title=title, defaults={"description": desc, "display_order": i})
            feat.description = desc
            feat.display_order = i
            attach_image(feat, "image", f"HomeImages/{img_file}")
            feat.save()
        self.stdout.write(self.style.SUCCESS(f"  {len(features_data)} feature highlights created (real illustrations)"))

        # --- Testimonials — real guest reviews from the live site ---
        testimonials_data = [
            ("Ashak J", "Abu Dhabi, UAE", "Had a wonderful time at the murjan splash water park! The rides were fun, the pools were clean, and the staff were friendly and helpful.", 5),
            ("Muhamad G", "Abu Dhabi, UAE", "It was a good experience... thank you for Birendra teza. Very good organization and the kids spent a really nice time.", 5),
            ("RV R", "Abu Dhabi, UAE", "I was entered in Murjan Park. I met a guy. His name is Tamil. His guidance was very helpful, and he is one of the best people in the park.", 5),
        ]
        for i, (name, loc, quote, rating) in enumerate(testimonials_data):
            Testimonial.objects.update_or_create(
                guest_name=name,
                defaults={"location": loc, "quote": quote, "rating": rating, "display_order": i},
            )
        self.stdout.write(self.style.SUCCESS(f"  {len(testimonials_data)} testimonials created (real reviews)"))

        # --- Announcement ---
        AnnouncementBanner.objects.get_or_create(
            text="Book now and receive 20% off on all weekday visits.",
            defaults={"cta_text": "Book Tickets", "cta_url": "", "is_active": True},
        )
        self.stdout.write(self.style.SUCCESS("  Announcement banner created"))

        # --- Pages ---
        pages_data = [
            ("About", "about", "Murjan Splash Park has been creating family memories since 2013..."),
            ("Attractions", "attractions", "From adrenaline-pumping water slides to our peaceful lazy river..."),
            ("Dining", "dining", "Fresh flavours from our poolside kitchen and bar..."),
            ("FAQ", "faq", "Frequently asked questions about tickets, hours, and park rules..."),
            ("Park Rules", "park-rules", "Please review our park rules before your visit..."),
            ("Birthday Parties", "birthday-parties", "Celebrate your birthday at Murjan Splash Park..."),
        ]
        for title, slug, content in pages_data:
            Page.objects.get_or_create(slug=slug, defaults={"title": title, "content": content})
        self.stdout.write(self.style.SUCCESS(f"  {len(pages_data)} content pages created"))

        # --- Page SEO (keyword-informed, from Search Console findings) ---
        for slug, mtitle, mdesc in [
            ("home", "Murjan Splash Park | Water Park in Abu Dhabi, Khalifa Park",
             "Murjan Splash Park - Abu Dhabi's premier water park inside Khalifa Park. Slides, lazy river, kiddie zone, and dining for the whole family."),
            ("attractions", "Attractions | Murjan Splash Park Abu Dhabi",
             "Explore water slides, lazy river, and kiddie splash zone at Murjan Splash Park, Khalifa Park, Abu Dhabi."),
            ("tickets", "Murjan Splash Park Tickets | Book Online - Abu Dhabi",
             "Murjan Splash Park ticket prices and booking. Kids and adult pricing for Abu Dhabi's premier water park."),
            ("gallery", "Gallery | Murjan Splash Park", "Photos from Murjan Splash Park, Abu Dhabi's premier water park."),
            ("blog", "Blog | Murjan Splash Park", "News and updates from Murjan Splash Park, Abu Dhabi."),
            ("contact", "Contact Us | Murjan Splash Park", "Get in touch with Murjan Splash Park, Abu Dhabi."),
            ("birthday-parties", "Birthday Parties | Murjan Splash Park", "Celebrate your birthday at Murjan Splash Park, Abu Dhabi."),
            ("park-rules", "Park Rules | Murjan Splash Park", "Please review our park rules before your visit."),
        ]:
            PageSEO.objects.update_or_create(page_slug=slug, defaults={"meta_title": mtitle, "meta_description": mdesc})
        self.stdout.write(self.style.SUCCESS("  Page SEO entries created"))

        # --- Gallery / Homepage Attraction Preview Cards — real images + real links ---
        gallery_data = [
            ("HomeImages/slide.png", "Water Slides", "water_slides", "Adrenaline-pumping slides for thrill seekers of every age.", True, "/attractions"),
            ("HomeImages/river.png", "Lazy River", "lazy_river", "Drift through scenic waterways at your own peaceful pace.", True, "/attractions"),
            ("HomeImages/splash.png", "Kiddie Splash Zone", "kiddie_zone", "Safe, joyful water play designed for little ones.", True, "/attractions"),
            ("AttractionImages/img8.png", "Family Slides", "general", "More family fun awaits with three new slides.", True, "/dining"),
        ]
        for i, (img, title, category, caption, featured, link) in enumerate(gallery_data):
            gi, _ = GalleryImage.objects.get_or_create(title=title, defaults={"category": category, "caption": caption, "featured": featured, "link_url": link, "display_order": i})
            gi.caption = caption
            gi.category = category
            gi.featured = featured
            gi.link_url = link
            gi.display_order = i
            attach_image(gi, "image", img)
            gi.save()
        self.stdout.write(self.style.SUCCESS(f"  {len(gallery_data)} gallery/attraction preview cards created (real images)"))

        # --- Additional gallery entries matching Gallery.jsx's specific card
        # titles (separate from the homepage attraction-preview cards above,
        # since Gallery.jsx uses its own title set for its masonry layout).
        # No schema change — reuses the same GalleryImage fields.
        extra_gallery = [
            ("AttractionImages/img5.png", "Rainbow Arches", "general", "Guest favorite among our thrill attractions."),
            ("BirthdayPartyImages/package-girl.png", "Birthday Party", "events", "Celebrate your birthday at Murjan Splash Park."),
            ("AttractionImages/img6.png", "Kids Pool", "kiddie_zone", "A safe splash zone designed for little ones."),
        ]
        for img, title, category, caption in extra_gallery:
            gi, _ = GalleryImage.objects.get_or_create(title=title, defaults={"category": category, "caption": caption})
            attach_image(gi, "image", img)
            gi.save()
        self.stdout.write(self.style.SUCCESS(f"  {len(extra_gallery)} additional gallery-page cards created"))

        # --- Blog — matches the 3 real posts already designed on the live site ---
        blog_data = [
            ("Birthday Parties", "Celebrate your special day with a splash! Our customizable party packages offer dedicated spaces, catering, and non-stop water fun for unforgettable birthdays.", "HomeImages/dining.png"),
            ("Interactive Water Play", "Engage the senses with our dynamic splash zones and interactive fountains. Perfect for toddlers and kids wanting to cool off in a safe, engaging environment.", "BlogImages/img2.png"),
            ("Playground Adventures", "Beyond the water, explore our extensive dry play areas. Shaded structures and safe equipment ensure the adventure continues even out of the pool.", "AttractionImages/img9.png"),
        ]
        for title, excerpt, img in blog_data:
            post, _ = BlogPost.objects.get_or_create(
                title=title,
                defaults={"excerpt": excerpt, "content": excerpt, "status": "published", "published_at": timezone.now()},
            )
            post.excerpt = excerpt
            post.content = excerpt
            attach_image(post, "featured_image", img)
            post.save()
        self.stdout.write(self.style.SUCCESS(f"  {len(blog_data)} blog posts created"))

        # --- Ticket Pricing — real prices from the live Tickets page ---
        TicketType.objects.all().delete()
        ticket_data = [
            ("Kids", "2-18 years", "Unlimited all-day access to Murjan Splash Park", 85, 0),
            ("Adults", "18+ years", "Unlimited all-day access to Murjan Splash Park", 40, 1),
        ]
        for name, age_group, desc, price, order in ticket_data:
            TicketType.objects.create(name=name, age_group=age_group, description=desc, price=price, display_order=order)
        self.stdout.write(self.style.SUCCESS(f"  {len(ticket_data)} ticket types created (real prices: Kids AED 85, Adults AED 40)"))

        self.stdout.write(self.style.SUCCESS("\nSeed complete — content matches the live site design. Check /api/v1/home/"))
