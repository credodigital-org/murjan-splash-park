import React, { useEffect, useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { sendContactMessage } from '../services/contactService';
import { getSiteSettings } from '../services/settingsService';
import SEO from '../components/SEO';

export default function Contact() {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => {});
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendContactMessage(form);
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="w-full font-sans pb-0 overflow-x-hidden bg-white">
      <SEO pageSlug="contact" defaultTitle="Contact Us | Murjan Splash Park" defaultDescription="Get in touch with Murjan Splash Park, Abu Dhabi." />

      {/* SECTION 1: HERO AREA — matches Tickets page pattern */}
      <section className="relative w-full flex justify-center items-center min-h-[220px] sm:min-h-[280px] bg-[#E8F8FA]">
        <div className="relative z-10 w-full max-w-2xl mx-4 my-8">
          <ScrollReveal animation="zoom-in" delay={100}>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-8 sm:py-10 text-center border border-white/60">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#00BCDE] tracking-tight mb-2">
                Get in Touch
              </h1>
              <p className="text-[11px] sm:text-xs text-gray-500 max-w-md mx-auto font-normal leading-relaxed">
                Questions about tickets, group bookings, or anything else? We'd love to hear from you.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: CONTACT INFO + FORM */}
      <section className="relative w-full px-4 sm:px-8 py-12 sm:py-16 bg-[#F4FCFE] flex justify-center">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">

          {/* Contact Info Card */}
          <ScrollReveal animation="fade-up" delay={150} className="h-full">
            <div className="bg-gradient-to-b from-[#D8F3F8] via-[#E8F8FB] to-[#DDF5F9] rounded-3xl p-6 sm:p-8 shadow-sm border border-cyan-100 h-full">
              <h2 className="text-lg sm:text-xl font-bold text-[#0A3242] mb-6">Contact Information</h2>

              <div className="space-y-5 text-sm text-gray-700">
                {settings?.phone && (
                  <div>
                    <p className="text-[10px] font-bold tracking-wider uppercase text-gray-500 mb-1">Phone</p>
                    <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="font-semibold text-[#00BCDE] hover:underline">{settings.phone}</a>
                  </div>
                )}
                {settings?.whatsapp_number && (
                  <div>
                    <p className="text-[10px] font-bold tracking-wider uppercase text-gray-500 mb-1">WhatsApp</p>
                    <a href={`tel:${settings.whatsapp_number.replace(/[^0-9+]/g, '')}`} className="font-semibold text-[#00BCDE] hover:underline">{settings.whatsapp_number}</a>
                  </div>
                )}
                {settings?.email && (
                  <div>
                    <p className="text-[10px] font-bold tracking-wider uppercase text-gray-500 mb-1">Email</p>
                    <a href={`mailto:${settings.email}`} className="font-semibold text-[#00BCDE] hover:underline">{settings.email}</a>
                  </div>
                )}
                {settings?.address && (
                  <div>
                    <p className="text-[10px] font-bold tracking-wider uppercase text-gray-500 mb-1">Address</p>
                    <p className="font-semibold text-[#0A3242]">{settings.address}</p>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal animation="fade-up" delay={200} className="h-full">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-cyan-100 h-full">
              {status === 'sent' && (
                <div className="mb-4 bg-[#E6F4EA] text-[#1E7B34] text-xs sm:text-sm font-semibold rounded-xl px-4 py-3">
                  Thanks — your message has been sent. We'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="mb-4 bg-[#FCE8E6] text-red-600 text-xs sm:text-sm font-semibold rounded-xl px-4 py-3">
                  Something went wrong. Please try again.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  name="name" value={form.name} onChange={handleChange} required
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-cyan-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCDE]"
                />
                <input
                  name="email" type="email" value={form.email} onChange={handleChange} required
                  placeholder="Email Address"
                  className="w-full px-4 py-2.5 rounded-xl border border-cyan-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCDE]"
                />
                <input
                  name="phone" value={form.phone} onChange={handleChange}
                  placeholder="Phone (optional)"
                  className="w-full px-4 py-2.5 rounded-xl border border-cyan-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCDE]"
                />
                <input
                  name="subject" value={form.subject} onChange={handleChange}
                  placeholder="Subject"
                  className="w-full px-4 py-2.5 rounded-xl border border-cyan-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCDE]"
                />
                <textarea
                  name="message" value={form.message} onChange={handleChange} required rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-2.5 rounded-xl border border-cyan-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCDE] resize-none"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-[#FFD600] hover:bg-[#f2cb00] text-gray-900 font-bold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-sm active:scale-[0.98] disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
}
