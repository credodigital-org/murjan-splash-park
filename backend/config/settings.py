"""
Django settings for Murjan Splash Park backend.
"""

from pathlib import Path
from decouple import config, Csv

BASE_DIR = Path(__file__).resolve().parent.parent


# ============================================================================
# Core / Security
# ============================================================================

SECRET_KEY = config(
    "SECRET_KEY",
    default="django-insecure-CHANGE-ME-IN-PRODUCTION",
)

DEBUG = config(
    "DEBUG",
    default=True,
    cast=bool,
)

ALLOWED_HOSTS = config(
    "ALLOWED_HOSTS",
    default="localhost,127.0.0.1",
    cast=Csv(),
)

CSRF_TRUSTED_ORIGINS = config(
    "CSRF_TRUSTED_ORIGINS",
    default=(
        "https://murjan-splash-park.onrender.com,"
        "https://murjan-splash-park.vercel.app",
 "https://www.murjansplashpark.com",
    "https://murjansplashpark.com",
    ),
    cast=Csv(),
)


# ============================================================================
# Applications
# ============================================================================

INSTALLED_APPS = [
    # Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    "drf_spectacular",

    # Local apps
    "apps.core",
    "apps.accounts",
    "apps.site_settings",
    "apps.pages",
    "apps.gallery",
    "apps.blog",
    "apps.contact",
    "apps.tickets",
]


# ============================================================================
# Custom User
# ============================================================================

AUTH_USER_MODEL = "accounts.AdminUser"


# ============================================================================
# Middleware
# ============================================================================

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",

    # Serve static files efficiently in production
    "whitenoise.middleware.WhiteNoiseMiddleware",

    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


ROOT_URLCONF = "config.urls"


# ============================================================================
# Templates
# ============================================================================

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


WSGI_APPLICATION = "config.wsgi.application"


# ============================================================================
# Database
# ============================================================================
#
# Local development:
#     SQLite
#
# Render production:
#     Neon PostgreSQL through DATABASE_URL
#
# ============================================================================

DATABASE_URL = config("DATABASE_URL", default="")

if DATABASE_URL:
    import dj_database_url

    DATABASES = {
        "default": dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
        )
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }


# ============================================================================
# Password validation
# ============================================================================

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "UserAttributeSimilarityValidator"
        )
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "MinimumLengthValidator"
        )
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "CommonPasswordValidator"
        )
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "NumericPasswordValidator"
        )
    },
]


# ============================================================================
# Internationalization
# ============================================================================

LANGUAGE_CODE = "en-us"

TIME_ZONE = config(
    "TIME_ZONE",
    default="Asia/Dubai",
)

USE_I18N = True
USE_TZ = True


# ============================================================================
# Static Files
# ============================================================================

STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "staticfiles"


# ============================================================================
# Media Files
# ============================================================================
#
# Local:
#     MEDIA_ROOT is used.
#
# Production:
#     Set USE_S3=True and provide S3/Supabase credentials.
#
# ============================================================================

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"


# # ============================================================================
# # Object Storage / S3 / Supabase
# # ============================================================================

# USE_S3 = config(
#     "USE_S3",
#     default=False,
#     cast=bool,
# )

# if USE_S3:
#     INSTALLED_APPS += ["storages"]

#     AWS_ACCESS_KEY_ID = config(
#         "AWS_ACCESS_KEY_ID",
#         default="",
#     )

#     AWS_SECRET_ACCESS_KEY = config(
#         "AWS_SECRET_ACCESS_KEY",
#         default="",
#     )

#     AWS_STORAGE_BUCKET_NAME = config(
#         "AWS_STORAGE_BUCKET_NAME",
#         default="",
#     )

#     AWS_S3_ENDPOINT_URL = config(
#         "AWS_S3_ENDPOINT_URL",
#         default="",
#     )

#     AWS_S3_CUSTOM_DOMAIN = config(
#         "AWS_S3_CUSTOM_DOMAIN",
#         default="",
#     )

#     AWS_DEFAULT_ACL = None

#     AWS_QUERYSTRING_AUTH = False

#     AWS_S3_FILE_OVERWRITE = False


# # ============================================================================
# # Django 6 Storage Configuration
# # ============================================================================
# #
# # IMPORTANT:
# # Django 6 uses STORAGES.
# #
# # DEFAULT_FILE_STORAGE is intentionally NOT used.
# #
# # ============================================================================

# if USE_S3:
#     STORAGES = {
#         "default": {
#             "BACKEND": "storages.backends.s3.S3Storage",
#         },
#         "staticfiles": {
#             "BACKEND": (
#                 "whitenoise.storage."
#                 "CompressedManifestStaticFilesStorage"
#             ),
#         },
#     }
# else:
#     STORAGES = {
#         "default": {
#             "BACKEND": "django.core.files.storage.FileSystemStorage",
#         },
#         "staticfiles": {
#             "BACKEND": (
#                 "whitenoise.storage."
#                 "CompressedManifestStaticFilesStorage"
#             ),
#         },
#     }


# ============================================================================
# Object Storage / S3 / Supabase
# ============================================================================

USE_S3 = config(
    "USE_S3",
    default=False,
    cast=bool,
)

if USE_S3:
    INSTALLED_APPS += ["storages"]

    AWS_ACCESS_KEY_ID = config(
        "AWS_ACCESS_KEY_ID",
        default="",
    )

    AWS_SECRET_ACCESS_KEY = config(
        "AWS_SECRET_ACCESS_KEY",
        default="",
    )

    AWS_STORAGE_BUCKET_NAME = config(
        "AWS_STORAGE_BUCKET_NAME",
        default="",
    )

    # Supabase S3-compatible endpoint
    AWS_S3_ENDPOINT_URL = config(
        "AWS_S3_ENDPOINT_URL",
        default="",
    )

    # Supabase project URL used for public media URLs
    SUPABASE_PROJECT_URL = config(
        "SUPABASE_PROJECT_URL",
        default="",
    )

    AWS_DEFAULT_ACL = None

    # Bucket is public
    AWS_QUERYSTRING_AUTH = False

    # Don't overwrite files with the same name
    AWS_S3_FILE_OVERWRITE = False

    AWS_S3_SIGNATURE_VERSION = "s3v4"


# ============================================================================
# Django 6 Storage Configuration
# ============================================================================

if USE_S3:
    STORAGES = {
        "default": {
            "BACKEND": "apps.core.storage.SupabasePublicStorage",
        },
        "staticfiles": {
            "BACKEND": (
                "whitenoise.storage."
                "CompressedManifestStaticFilesStorage"
            ),
        },
    }

else:
    STORAGES = {
        "default": {
            "BACKEND": "django.core.files.storage.FileSystemStorage",
        },
        "staticfiles": {
            "BACKEND": (
                "whitenoise.storage."
                "CompressedManifestStaticFilesStorage"
            ),
        },
    }


# ============================================================================
# Default primary key field type
# ============================================================================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# ============================================================================
# Django REST Framework
# ============================================================================

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ],
    "DEFAULT_SCHEMA_CLASS": (
        "drf_spectacular.openapi.AutoSchema"
    ),
    "DEFAULT_PAGINATION_CLASS": (
        "rest_framework.pagination.PageNumberPagination"
    ),
    "PAGE_SIZE": 20,
}


# ============================================================================
# DRF Spectacular
# ============================================================================

SPECTACULAR_SETTINGS = {
    "TITLE": "Murjan Splash Park API",
    "DESCRIPTION": (
        "Content & settings API for the Murjan Splash Park website. "
        "Booking/tickets/payments remain on Wix and are NOT part of this API."
    ),
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}


# ============================================================================
# CORS
# ============================================================================

# CORS_ALLOWED_ORIGINS = config(
#     "CORS_ALLOWED_ORIGINS",
#     default=(
#         "http://localhost:5173,"
#         "http://127.0.0.1:5173,"
#         "https://murjan-splash-park.vercel.app"
#     ),
#     cast=Csv(),
# )
CORS_ALLOWED_ORIGINS = config(
    "CORS_ALLOWED_ORIGINS",
    default=(
        "http://localhost:5173,"
        "http://127.0.0.1:5173,"
        "https://murjan-splash-park.vercel.app,"
        "https://www.murjansplashpark.com,"
        "https://murjansplashpark.com"
    ),
    cast=Csv(),
)

CORS_ALLOW_CREDENTIALS = True

# CORS_ALLOW_CREDENTIALS = True


# ============================================================================
# Production Security
# ============================================================================

SECURE_PROXY_SSL_HEADER = (
    "HTTP_X_FORWARDED_PROTO",
    "https",
)

SECURE_SSL_REDIRECT = config(
    "SECURE_SSL_REDIRECT",
    default=False,
    cast=bool,
)

SESSION_COOKIE_SECURE = config(
    "SESSION_COOKIE_SECURE",
    default=False,
    cast=bool,
)

CSRF_COOKIE_SECURE = config(
    "CSRF_COOKIE_SECURE",
    default=False,
    cast=bool,
)