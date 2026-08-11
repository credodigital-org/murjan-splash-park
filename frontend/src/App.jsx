import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Attractions from './pages/Attractions';
import Dining from './pages/Dining';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Tickets from './pages/Tickets';
import BirthdayParties from './pages/BirthdayParties';
import ParkRules from './pages/ParkRules';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { AuthProvider } from './admin/context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/layouts/AdminLayout';
import AdminLogin from './admin/pages/Login';
import AdminDashboard from './admin/pages/Dashboard';
import AdminGallery from './admin/pages/GalleryPage';
import AdminBlog from './admin/pages/BlogPage';
import AdminTickets from './admin/pages/TicketsPage';
import AdminPages from './admin/pages/PagesContentPage';
import AdminTestimonials from './admin/pages/TestimonialsPage';
import AdminFeatures from './admin/pages/FeaturesPage';
import AdminWorkingHours from './admin/pages/WorkingHoursPage';
import AdminAnnouncements from './admin/pages/AnnouncementsPage';
import AdminHero from './admin/pages/HeroPage';
import AdminSettings from './admin/pages/SettingsPage';
import AdminContact from './admin/pages/ContactPage';

// Public site layout — Navbar + Footer wrap every public page.
// Admin routes are intentionally separate below and never render inside this.
function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public website */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/attractions" element={<PublicLayout><Attractions /></PublicLayout>} />
          <Route path="/dining" element={<PublicLayout><Dining /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/tickets" element={<PublicLayout><Tickets /></PublicLayout>} />
          <Route path="/birthdayparties" element={<PublicLayout><BirthdayParties /></PublicLayout>} />
          <Route path="/parkrules" element={<PublicLayout><ParkRules /></PublicLayout>} />

          {/* Admin panel — separate layout, own auth, no public Navbar/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="tickets" element={<AdminTickets />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="features" element={<AdminFeatures />} />
            <Route path="working-hours" element={<AdminWorkingHours />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="hero" element={<AdminHero />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="contact" element={<AdminContact />} />
          </Route>

          {/* Catch-all — must be last */}
          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
