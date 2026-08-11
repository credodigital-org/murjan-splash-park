from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from rest_framework.authtoken.views import obtain_auth_token

from apps.core.views import HomeAggregateView
from apps.core.sitemap_views import sitemap_xml, robots_txt

urlpatterns = [
    path("admin/", admin.site.urls),

    # SEO — dynamically generated, no manual maintenance needed
    path("sitemap.xml", sitemap_xml, name="sitemap"),
    path("robots.txt", robots_txt, name="robots"),

    # API schema / docs
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/schema/swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/schema/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),

    # Auth (admin panel logs in here, gets a token to send as "Authorization: Token <key>")
    path("api/v1/auth/token/", obtain_auth_token, name="api-token-auth"),

    # Aggregate homepage endpoint
    path("api/v1/home/", HomeAggregateView.as_view(), name="home"),

    # App endpoints
    path("api/v1/settings/", include("apps.site_settings.urls")),
    path("api/v1/pages/", include("apps.pages.urls")),
    path("api/v1/gallery/", include("apps.gallery.urls")),
    path("api/v1/blog/", include("apps.blog.urls")),
    path("api/v1/contact/", include("apps.contact.urls")),
    path("api/v1/tickets/", include("apps.tickets.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
