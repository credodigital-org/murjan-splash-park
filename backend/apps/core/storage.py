from urllib.parse import quote

from django.conf import settings
from storages.backends.s3 import S3Storage


class SupabasePublicStorage(S3Storage):
    """
    S3-compatible storage for Supabase.

    Uploads and deletes use Supabase's S3 API.
    Public URLs use Supabase's public Storage API.
    """

    def url(self, name):
        if not name:
            return ""

        project_url = settings.SUPABASE_PROJECT_URL.rstrip("/")
        bucket_name = self.bucket_name

        encoded_name = quote(
            str(name).lstrip("/"),
            safe="/~",
        )

        return (
            f"{project_url}/storage/v1/object/public/"
            f"{bucket_name}/{encoded_name}"
        )