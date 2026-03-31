import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Clock, Star } from "lucide-react";
import type { Movie } from "../data/mockData";

interface Props {
  movie: Movie;
  compact?: boolean;
}

export default function MovieCard({ movie, compact }: Props) {
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col group transition-transform hover:-translate-y-1 shadow-sm"
      style={{ background: "#FFFFFF", border: "1px solid #E5E0D8" }}
    >
      <div
        className="relative overflow-hidden"
        style={{ paddingBottom: compact ? "130%" : "150%" }}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge
          className="absolute top-2 left-2 text-xs"
          style={{
            background: "#2A7B6F",
            color: "#FFFFFF",
            border: "none",
          }}
        >
          {movie.certificate}
        </Badge>
        <div className="absolute bottom-2 left-2 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-teal-300 text-teal-300" />
          <span className="text-xs font-bold text-white">{movie.rating}</span>
        </div>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3
          className="font-bold text-sm leading-tight mb-1"
          style={{ color: "#1A2332", fontFamily: "Playfair Display, serif" }}
        >
          {movie.title}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <Clock className="w-3 h-3" style={{ color: "#6B7280" }} />
          <span className="text-xs" style={{ color: "#6B7280" }}>
            {movie.duration}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((g) => (
            <Badge
              key={g}
              variant="outline"
              className="text-xs px-1.5 py-0"
              style={{ borderColor: "#B8D8D4", color: "#2A7B6F" }}
            >
              {g}
            </Badge>
          ))}
        </div>
        <div className="mt-auto">
          <Link to="/movies/$id" params={{ id: movie.id }}>
            <Button
              size="sm"
              className="w-full font-semibold text-xs"
              style={{ background: "#2A7B6F", color: "#FFFFFF" }}
              data-ocid="movie.primary_button"
            >
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
