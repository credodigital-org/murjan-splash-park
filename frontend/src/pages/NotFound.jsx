import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="w-full font-sans bg-white min-h-[60vh] flex items-center justify-center px-4">
      <SEO pageSlug="404" defaultTitle="Page Not Found | Murjan Splash Park" defaultDescription="The page you're looking for doesn't exist." />
      <div className="text-center max-w-md">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-[#00BCDE] mb-3">404</h1>
        <p className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Page Not Found</p>
        <p className="text-sm text-gray-500 mb-6">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#FFD600] hover:bg-[#f2cb00] text-gray-900 font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-sm"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
