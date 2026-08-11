/**
 * Formats a 24h "HH:MM:SS" time string (as returned by the Working Hours
 * API) into a 12h display string like "1.00PM". Shared between Tickets.jsx
 * and Hero.jsx so both places that show park hours use the same logic.
 */
export function formatTime12h(timeStr) {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}.${m}${period}`;
}
