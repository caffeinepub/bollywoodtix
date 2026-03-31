import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Play,
  Star,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useApp } from "../context/AppContext";
import { MOVIES, THEATRES } from "../data/mockData";

const HERO_MOVIES = MOVIES.slice(0, 3);

export default function Home() {
  const { selectedCity } = useApp();
  const [heroIdx, setHeroIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nowShowing = MOVIES.filter((m) => m.status === "now_showing");
  const upcoming = MOVIES.filter((m) => m.status === "upcoming");

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % HERO_MOVIES.length);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const prevHero = () =>
    setHeroIdx((prev) => (prev - 1 + HERO_MOVIES.length) % HERO_MOVIES.length);
  const nextHero = () => setHeroIdx((prev) => (prev + 1) % HERO_MOVIES.length);

  const heroMovie = HERO_MOVIES[heroIdx];

  return (
    <div style={{ backgroundColor: "#F8F5F0" }}>
      {/* Hero Carousel */}
      <section className="relative overflow-hidden" style={{ height: "480px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={heroMovie.banner}
              alt={heroMovie.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(26,35,50,0.88) 0%, rgba(26,35,50,0.5) 50%, rgba(26,35,50,0.15) 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(26,35,50,0.9) 0%, transparent 40%)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full flex gap-8 items-center">
            <div className="hidden md:block flex-shrink-0">
              <img
                src={heroMovie.poster}
                alt={heroMovie.title}
                className="w-36 rounded-xl shadow-2xl"
                style={{ border: "2px solid #2A7B6F" }}
              />
            </div>
            <div className="flex-1">
              <Badge
                className="mb-3"
                style={{ background: "#2A7B6F", color: "#FFFFFF" }}
              >
                Now Showing
              </Badge>
              <h1
                className="text-4xl md:text-5xl font-bold mb-3"
                style={{
                  color: "#FFFFFF",
                  fontFamily: "Playfair Display, serif",
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {heroMovie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-teal-300 text-teal-300" />
                  <span className="font-bold" style={{ color: "#3dd5c8" }}>
                    {heroMovie.rating}/10
                  </span>
                </div>
                <span style={{ color: "#d1d5db" }}>{heroMovie.duration}</span>
                <div className="flex gap-1">
                  {heroMovie.genre.map((g) => (
                    <Badge
                      key={g}
                      variant="outline"
                      style={{ borderColor: "#3d9e90", color: "#3d9e90" }}
                    >
                      {g}
                    </Badge>
                  ))}
                </div>
              </div>
              <p
                className="text-sm mb-6 max-w-md leading-relaxed"
                style={{ color: "#d1d5db" }}
              >
                {heroMovie.synopsis.slice(0, 150)}...
              </p>
              <div className="flex gap-3">
                <Link to="/movies/$id" params={{ id: heroMovie.id }}>
                  <Button
                    size="lg"
                    className="font-bold tracking-wide"
                    style={{ background: "#2A7B6F", color: "#FFFFFF" }}
                    data-ocid="hero.primary_button"
                  >
                    <Zap className="w-4 h-4 mr-2" /> BOOK NOW
                  </Button>
                </Link>
                <Link to="/movies/$id" params={{ id: heroMovie.id }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-semibold"
                    style={{
                      borderColor: "#3d9e90",
                      color: "#3d9e90",
                      background: "transparent",
                    }}
                    data-ocid="hero.secondary_button"
                  >
                    <Play className="w-4 h-4 mr-2" /> Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={prevHero}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: "rgba(42,123,111,0.25)",
            border: "1px solid #2A7B6F",
            color: "#3d9e90",
          }}
          data-ocid="hero.button"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={nextHero}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: "rgba(42,123,111,0.25)",
            border: "1px solid #2A7B6F",
            color: "#3d9e90",
          }}
          data-ocid="hero.button"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_MOVIES.map((m, i) => (
            <button
              type="button"
              key={m.id}
              onClick={() => setHeroIdx(i)}
              className="rounded-full transition-all"
              style={{
                width: i === heroIdx ? "24px" : "8px",
                height: "8px",
                background: i === heroIdx ? "#2A7B6F" : "#2A7B6F55",
              }}
            />
          ))}
        </div>
      </section>

      {/* Now Showing */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="text-2xl font-bold"
              style={{
                color: "#1A2332",
                fontFamily: "Playfair Display, serif",
              }}
            >
              Now Showing in{" "}
              <span style={{ color: "#2A7B6F" }}>{selectedCity}</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
              Book your favourite films today
            </p>
          </div>
          <Link to="/movies">
            <Button
              variant="outline"
              size="sm"
              style={{
                borderColor: "#2A7B6F",
                color: "#2A7B6F",
                background: "transparent",
              }}
              data-ocid="home.link"
            >
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {nowShowing.map((movie, i) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section
        className="py-12"
        style={{
          background:
            "linear-gradient(180deg, #F2F0EC 0%, #EEF0F2 50%, #F2F0EC 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "#1A2332", fontFamily: "Playfair Display, serif" }}
          >
            Discover <span style={{ color: "#2A7B6F" }}>New Releases</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {upcoming.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Multiplexes */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-6">
          <h2
            className="text-2xl font-bold"
            style={{ color: "#1A2332", fontFamily: "Playfair Display, serif" }}
          >
            Popular <span style={{ color: "#2A7B6F" }}>Multiplexes</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {THEATRES.map((theatre, i) => (
            <motion.div
              key={theatre.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div
                className="rounded-xl p-5 flex flex-col gap-3"
                style={{ background: "#FFFFFF", border: "1px solid #E5E0D8" }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className="font-bold"
                      style={{
                        color: "#1A2332",
                        fontFamily: "Playfair Display, serif",
                      }}
                    >
                      {theatre.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin
                        className="w-3 h-3"
                        style={{ color: "#2A7B6F" }}
                      />
                      <span className="text-xs" style={{ color: "#6B7280" }}>
                        {theatre.city}
                      </span>
                    </div>
                  </div>
                  <Badge style={{ background: "#E8F5F3", color: "#2A7B6F" }}>
                    {theatre.city}
                  </Badge>
                </div>
                <p className="text-xs" style={{ color: "#6B7280" }}>
                  {theatre.address}
                </p>
                <div className="flex flex-wrap gap-2">
                  {theatre.facilities.map((f) => (
                    <Badge
                      key={f}
                      variant="outline"
                      className="text-xs"
                      style={{ borderColor: "#B8D8D4", color: "#2A7B6F" }}
                    >
                      {f}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {["09:00 AM", "01:30 PM", "06:00 PM", "09:30 PM"].map((t) => (
                    <button
                      type="button"
                      key={t}
                      className="text-xs px-2 py-1 rounded transition-colors hover:bg-teal-600 hover:text-white"
                      style={{
                        background: "#E8F5F3",
                        color: "#2A7B6F",
                        border: "1px solid #B8D8D4",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Offers Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div
          className="rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, #2A7B6F 0%, #4A6B7C 100%)",
            border: "1px solid #3d9e9044",
          }}
        >
          <div>
            <p
              className="text-xs font-semibold tracking-widest mb-1"
              style={{ color: "#a8e6df" }}
            >
              LIMITED TIME OFFER
            </p>
            <h3
              className="text-2xl font-bold"
              style={{
                color: "#FFFFFF",
                fontFamily: "Playfair Display, serif",
              }}
            >
              Get <span style={{ color: "#a8e6df" }}>20% OFF</span> on First
              Booking
            </h3>
            <p className="text-sm mt-1" style={{ color: "#d1faf6" }}>
              Use code{" "}
              <span style={{ color: "#FFFFFF", fontWeight: 700 }}>BOLLY20</span>{" "}
              at checkout
            </p>
          </div>
          <Link to="/movies">
            <Button
              size="lg"
              className="font-bold"
              style={{ background: "#FFFFFF", color: "#2A7B6F" }}
              data-ocid="home.primary_button"
            >
              Explore Movies
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
