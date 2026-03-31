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
      className="rounded-xl overflow-hidden flex flex-col group transition-transform hover:-translate-y-1"
      style={{ background: "#2A2F35", border: "1px solid #3a3f45" }}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <Badge
          className="absolute top-2 left-2 text-xs"
          style={{
            background: "#3B0A0A",
            color: "#F4C65A",
            border: "1px solid #D6A23A",
          }}
        >
          {movie.certificate}
        </Badge>
        <div className="absolute bottom-2 left-2 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-yellow-300">
            {movie.rating}
          </span>
        </div>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3
          className="font-bold text-sm leading-tight mb-1"
          style={{ color: "#F2E6D3", fontFamily: "Playfair Display, serif" }}
        >
          {movie.title}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <Clock className="w-3 h-3" style={{ color: "#B8B0A6" }} />
          <span className="text-xs" style={{ color: "#B8B0A6" }}>
            {movie.duration}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((g) => (
            <Badge
              key={g}
              variant="outline"
              className="text-xs px-1.5 py-0"
              style={{ borderColor: "#4a3020", color: "#D6A23A" }}
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
              style={{ background: "#F4C65A", color: "#120808" }}
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
