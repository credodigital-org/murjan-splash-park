# Database Schema — Murjan Splash Park

Postgres (Neon) in production, SQLite locally. All models inherit
`TimeStampedModel` (adds `created_at`, `updated_at`) unless noted.

## apps.accounts

**AdminUser** (extends Django's `AbstractUser`)
| Field | Type | Notes |
|---|---|---|
| username, email, password, is_staff, is_superuser, etc. | — | standard Django auth fields |
| role | CharField (choices) | owner / manager / content_editor |
| phone | CharField | optional |

## apps.site_settings

**SiteSettings** (singleton — always `pk=1`)
| Field | Type | Notes |
|---|---|---|
| site_name, phone, email, address | CharField/TextField | |
| google_maps_embed_url | URLField | |
| instagram_url, facebook_url, twitter_url, whatsapp_number | URLField/CharField | |
| footer_text, copyright_text | TextField/CharField | |
| booking_redirect_url | URLField | drives the "Book Tickets" button — see API.md |
| default_meta_title, default_meta_description, default_og_image | — | fallback SEO |

**HeroSection** (singleton — always `pk=1`)
| headline, subheadline | CharField |
| background_image | ImageField |
| cta_text | CharField |

**WorkingHours** — one row per day (`day` unique: mon–sun)
| opening_time, closing_time | TimeField |
| is_closed | BooleanField |

**SpecialHours** — holiday/event overrides
| date | DateField (unique) |
| label | CharField |
| opening_time, closing_time | TimeField (nullable) |
| is_closed | BooleanField |

**AnnouncementBanner**
| text, cta_text, cta_url | CharField/URLField |
| is_active | BooleanField |
| expires_at | DateField (nullable) |

**PageSEO** — per-page meta overrides
| page_slug | SlugField (unique) — e.g. 'home', 'attractions' |
| meta_title, meta_description | CharField |
| og_image | ImageField |

**FeatureHighlight** — "Why Murjan" cards
| icon, title, description | CharField/CharField |
| display_order | PositiveIntegerField |
| is_active | BooleanField |

**Testimonial**
| guest_name, location, quote | CharField/TextField |
| rating | PositiveSmallIntegerField (default 5) |
| display_order, is_active | — |

## apps.pages

**Page** — About, Attractions, Dining, FAQ, Terms, Privacy, etc.
| title, slug (auto from title) | CharField/SlugField (unique) |
| content | TextField |
| featured_image | ImageField |
| meta_title, meta_description | CharField |
| is_published | BooleanField |

## apps.gallery

**GalleryImage**
| title, alt_text, caption | CharField |
| image | ImageField |
| category | CharField (choices: water_slides, lazy_river, kiddie_zone, dining, events, general) |
| display_order | PositiveIntegerField |
| featured | BooleanField — shown in homepage preview |
| is_active | BooleanField |

## apps.blog

**BlogPost**
| title, slug (auto from title) | CharField/SlugField (unique) |
| excerpt, content | CharField/TextField |
| featured_image | ImageField |
| status | CharField (choices: draft, published) |
| featured | BooleanField — homepage featured section |
| meta_title, meta_description | CharField |
| published_at | DateTimeField (nullable) |

## apps.contact

**ContactMessage**
| name, email, phone, subject | CharField/EmailField |
| message | TextField |
| is_read | BooleanField |
| replied_at | DateTimeField (nullable) |

## apps.tickets

**TicketType** — DISPLAY-ONLY pricing, not connected to Wix checkout
| name, age_group, description | CharField |
| price | DecimalField(8,2) |
| currency | CharField (default 'AED') |
| display_order | PositiveIntegerField |
| is_active | BooleanField |

## Relationships

There are intentionally **no foreign keys between apps** at this stage — every
model above is independent (no `ForeignKey`/`ManyToMany` linking, e.g.,
blog posts to gallery images). This keeps each app decoupled and easy to
reason about for a content-site-sized project. If a future requirement needs
relationships (e.g., tagging a gallery image to a specific blog post), add
the FK at that point rather than pre-building unused relations now.

## Singletons

`SiteSettings` and `HeroSection` both enforce a single row via `pk=1` in
their `save()` override, and their Django Admin blocks adding a second row
(`has_add_permission` returns `False` once one exists). This is simpler than
a dedicated settings-management package for a project this size.
