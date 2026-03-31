import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Calendar, Clock, Film, Globe, Star, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import {
  MOVIES,
  SHOWTIMES,
  THEATRES,
  generateSeatMap,
  getShowtimesForMovieTheatreDate,
  getTheatresByCity,
} from "../data/mockData";

function getNext7Days(): string[] {
  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function MovieDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const { selectedCity, setCart } = useApp();
  const movie = MOVIES.find((m) => m.id === id);

  const [selectedTheatre, setSelectedTheatre] = useState("");
  const [selectedDate, setSelectedDate] = useState(getNext7Days()[0]);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);

  const theatres = getTheatresByCity(selectedCity);
  const days = getNext7Days();

  const showtimes = useMemo(() => {
    if (!selectedTheatre || !selectedDate || !movie) return [];
    return getShowtimesForMovieTheatreDate(
      movie.id,
      selectedTheatre,
      selectedDate,
    );
  }, [selectedTheatre, selectedDate, movie]);

  if (!movie)
    return (
      <div className="text-center py-20" style={{ color: "#F2E6D3" }}>
        Movie not found.
      </div>
    );

  const handleBooking = () => {
    if (!selectedTheatre || !selectedShowtime) return;
    const theatre = THEATRES.find((t) => t.id === selectedTheatre);
    const showtime = SHOWTIMES.find((s) => s.id === selectedShowtime);
    if (!theatre || !showtime) return;
    setCart({
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.poster,
      theatreId: theatre.id,
      theatreName: theatre.name,
      theatreCity: theatre.city,
      date: showtime.date,
      time: showtime.time,
      showtimeId: showtime.id,
      prices: showtime.prices,
      seatMap: generateSeatMap(),
      selectedSeats: [],
    });
    navigate({ to: "/booking/seats" });
  };

  return (
    <div style={{ backgroundColor: "#120808", color: "#F2E6D3" }}>
      <div className="relative" style={{ height: "320px" }}>
        <img
          src={movie.banner}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #120808 0%, rgba(18,8,8,0.5) 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(18,8,8,0.8) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-48 rounded-xl shadow-2xl"
              style={{ border: "3px solid #D6A23A" }}
            />
          </div>
          <div className="flex-1 pt-20 md:pt-0">
            <Badge
              className="mb-3"
              style={{
                background:
                  movie.status === "now_showing" ? "#7A0E0E" : "#3B0A0A",
                color: "#F4C65A",
              }}
            >
              {movie.status === "now_showing" ? "Now Showing" : "Upcoming"}
            </Badge>
            <h1
              className="text-4xl font-bold mb-3"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span
                  className="font-bold text-lg"
                  style={{ color: "#F4C65A" }}
                >
                  {movie.rating}
                </span>
                <span style={{ color: "#B8B0A6" }}>/10</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" style={{ color: "#B8B0A6" }} />
                <span style={{ color: "#B8B0A6" }}>{movie.duration}</span>
              </div>
              <Badge style={{ background: "#3B0A0A", color: "#F4C65A" }}>
                {movie.certificate}
              </Badge>
              {movie.genre.map((g) => (
                <Badge
                  key={g}
                  variant="outline"
                  style={{ borderColor: "#D6A23A", color: "#D6A23A" }}
                >
                  {g}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-1 mb-4">
              <Globe className="w-4 h-4" style={{ color: "#B8B0A6" }} />
              <span style={{ color: "#B8B0A6" }}>
                {movie.language.join(" / ")}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-4 max-w-2xl"
              style={{ color: "#B8B0A6" }}
            >
              {movie.synopsis}
            </p>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Film className="w-4 h-4" style={{ color: "#D6A23A" }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#D6A23A" }}
                >
                  Director:
                </span>
                <span className="text-sm" style={{ color: "#F2E6D3" }}>
                  {movie.director}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: "#D6A23A" }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#D6A23A" }}
                >
                  Cast:
                </span>
                <span className="text-sm" style={{ color: "#F2E6D3" }}>
                  {movie.cast.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-10 p-6 rounded-2xl mb-12"
          style={{ background: "#2A2F35", border: "1px solid #3a3f45" }}
        >
          <h2
            className="text-xl font-bold mb-6"
            style={{ fontFamily: "Playfair Display, serif", color: "#F4C65A" }}
          >
            Book Tickets
          </h2>

          <div className="mb-5">
            <p
              className="text-sm font-semibold mb-2"
              style={{ color: "#D6A23A" }}
            >
              Select Theatre in {selectedCity}
            </p>
            {theatres.length === 0 ? (
              <p className="text-sm" style={{ color: "#B8B0A6" }}>
                No theatres available in {selectedCity}. Try Mumbai, Delhi,
                Pune, or Bangalore.
              </p>
            ) : (
              <Select
                value={selectedTheatre}
                onValueChange={setSelectedTheatre}
              >
                <SelectTrigger
                  className="w-full max-w-sm"
                  style={{
                    background: "#1F2328",
                    border: "1px solid #4a3020",
                    color: "#F2E6D3",
                  }}
                  data-ocid="booking.select"
                >
                  <SelectValue placeholder="Choose a theatre" />
                </SelectTrigger>
                <SelectContent
                  style={{ background: "#2A2F35", border: "1px solid #4a3020" }}
                >
                  {theatres.map((t) => (
                    <SelectItem
                      key={t.id}
                      value={t.id}
                      style={{ color: "#F2E6D3" }}
                    >
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="mb-5">
            <p
              className="text-sm font-semibold mb-2"
              style={{ color: "#D6A23A" }}
            >
              <Calendar className="w-4 h-4 inline mr-1" /> Select Date
            </p>
            <div className="flex flex-wrap gap-2">
              {days.map((day) => (
                <button
                  type="button"
                  key={day}
                  onClick={() => {
                    setSelectedDate(day);
                    setSelectedShowtime(null);
                  }}
                  className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: selectedDate === day ? "#F4C65A" : "#1F2328",
                    color: selectedDate === day ? "#120808" : "#B8B0A6",
                    border: `1px solid ${selectedDate === day ? "#F4C65A" : "#4a3020"}`,
                  }}
                  data-ocid="booking.button"
                >
                  {formatDate(day)}
                </button>
              ))}
            </div>
          </div>

          {selectedTheatre && (
            <div className="mb-6">
              <p
                className="text-sm font-semibold mb-2"
                style={{ color: "#D6A23A" }}
              >
                Select Showtime
              </p>
              {showtimes.length === 0 ? (
                <p className="text-sm" style={{ color: "#B8B0A6" }}>
                  No showtimes available.
                </p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {showtimes.map((show) => (
                    <button
                      type="button"
                      key={show.id}
                      onClick={() => setSelectedShowtime(show.id)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                      style={{
                        background:
                          selectedShowtime === show.id ? "#F4C65A" : "#3B0A0A",
                        color:
                          selectedShowtime === show.id ? "#120808" : "#F2E6D3",
                        border: `1px solid ${selectedShowtime === show.id ? "#F4C65A" : "#5a2a10"}`,
                      }}
                      data-ocid="booking.button"
                    >
                      {show.time}
                      <span className="block text-xs opacity-70">
                        ₹{show.prices.standard}+
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { tier: "Standard (G-J)", price: "₹200–250" },
              { tier: "Premium (C-F)", price: "₹350–400" },
              { tier: "Recliner (A-B)", price: "₹600–700" },
            ].map((item) => (
              <div
                key={item.tier}
                className="px-3 py-2 rounded-lg"
                style={{ background: "#1F2328", border: "1px solid #3a3f45" }}
              >
                <p className="text-xs" style={{ color: "#B8B0A6" }}>
                  {item.tier}
                </p>
                <p className="text-sm font-bold" style={{ color: "#F4C65A" }}>
                  {item.price}
                </p>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            onClick={handleBooking}
            disabled={!selectedTheatre || !selectedShowtime}
            className="font-bold tracking-wide px-10"
            style={{
              background:
                selectedTheatre && selectedShowtime ? "#F4C65A" : "#4a4040",
              color: selectedTheatre && selectedShowtime ? "#120808" : "#888",
            }}
            data-ocid="booking.primary_button"
          >
            Book Tickets →
          </Button>
        </div>
      </div>
    </div>
  );
}
