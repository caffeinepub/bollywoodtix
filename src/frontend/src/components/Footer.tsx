import { Link } from "@tanstack/react-router";
import { Film } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

const SOCIAL_ICONS = [
  { Icon: SiFacebook, name: "facebook" },
  { Icon: SiX, name: "x" },
  { Icon: SiInstagram, name: "instagram" },
  { Icon: SiYoutube, name: "youtube" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#F2F0EC",
        borderTop: "1px solid #E5E0D8",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Film className="w-7 h-7" style={{ color: "#2A7B6F" }} />
              <span
                className="text-xl font-bold tracking-widest"
                style={{
                  color: "#2A7B6F",
                  fontFamily: "Playfair Display, serif",
                }}
              >
                BOLLYTIX
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
              India's premier movie ticketing platform. Book seats for your
              favourite Bollywood & regional films.
            </p>
            <div className="flex gap-3 mt-4">
              {SOCIAL_ICONS.map(({ Icon, name }) => (
                <span
                  key={name}
                  className="transition-colors hover:text-teal-600 cursor-pointer"
                  style={{ color: "#4A6B7C" }}
                >
                  <Icon size={20} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="font-semibold mb-4"
              style={{
                color: "#1A2332",
                fontFamily: "Playfair Display, serif",
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Movies", to: "/movies" },
                { label: "My Bookings", to: "/bookings" },
                { label: "Offers & Deals", to: "/movies" },
                { label: "Admin Panel", to: "/admin" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors hover:text-teal-600"
                    style={{ color: "#6B7280" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-semibold mb-4"
              style={{
                color: "#1A2332",
                fontFamily: "Playfair Display, serif",
              }}
            >
              Popular Cities
            </h4>
            <ul className="space-y-2">
              {[
                "Mumbai",
                "Delhi",
                "Bangalore",
                "Chennai",
                "Hyderabad",
                "Pune",
              ].map((city) => (
                <li key={city}>
                  <span
                    className="text-sm cursor-pointer transition-colors hover:text-teal-600"
                    style={{ color: "#6B7280" }}
                  >
                    {city}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-semibold mb-4"
              style={{
                color: "#1A2332",
                fontFamily: "Playfair Display, serif",
              }}
            >
              Support
            </h4>
            <ul className="space-y-2">
              {[
                "Help Center",
                "Privacy Policy",
                "Terms of Use",
                "Cookie Policy",
                "Grievance Officer",
              ].map((item) => (
                <li key={item}>
                  <span
                    className="text-sm cursor-pointer transition-colors hover:text-teal-600"
                    style={{ color: "#6B7280" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid #E5E0D8" }}
        >
          <p className="text-xs" style={{ color: "#6B7280" }}>
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-teal-600"
              style={{ color: "#2A7B6F" }}
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            All movie posters & titles belong to their respective studios
          </p>
        </div>
      </div>
    </footer>
  );
}
