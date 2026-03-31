import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, MapPin, Search, Star } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { CITIES, THEATRES } from "../data/mockData";

export default function Theatres() {
  const { selectedCity, setSelectedCity } = useApp();
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState(selectedCity || "All");

  const filtered = THEATRES.filter((t) => {
    const matchCity = cityFilter === "All" || t.city === cityFilter;
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.address.toLowerCase().includes(search.toLowerCase());
    return matchCity && matchSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-1"
          style={{
            color: "#2A7B6F",
            fontFamily: "Playfair Display, serif",
          }}
        >
          Cinemas & Theatres
        </h1>
        <p className="text-sm" style={{ color: "#6B7280" }}>
          Find the best screens near you
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search theatres or addresses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            style={{
              background: "#F8F5F0",
              border: "1px solid #E5E0D8",
              color: "#1A2332",
            }}
          />
        </div>
        <Select
          value={cityFilter}
          onValueChange={(v) => {
            setCityFilter(v);
            if (v !== "All") setSelectedCity(v);
          }}
        >
          <SelectTrigger
            className="w-full sm:w-44"
            style={{
              background: "#F8F5F0",
              border: "1px solid #E5E0D8",
              color: "#1A2332",
            }}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            style={{ background: "#FFFFFF", border: "1px solid #E5E0D8" }}
          >
            <SelectItem value="All" style={{ color: "#1A2332" }}>
              All Cities
            </SelectItem>
            {CITIES.map((city) => (
              <SelectItem key={city} value={city} style={{ color: "#1A2332" }}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Theatre Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16" style={{ color: "#9CA3AF" }}>
          <Building2 className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">No theatres found</p>
          <p className="text-sm mt-1">Try a different city or search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((theatre) => (
            <div
              key={theatre.id}
              className="rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E0D8",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#E8F5F3" }}
                >
                  <Building2 className="w-5 h-5" style={{ color: "#2A7B6F" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-bold text-base leading-tight"
                    style={{ color: "#1A2332" }}
                  >
                    {theatre.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" style={{ color: "#2A7B6F" }} />
                    <span className="text-xs" style={{ color: "#6B7280" }}>
                      {theatre.city}
                    </span>
                  </div>
                </div>
              </div>

              <p
                className="text-xs leading-relaxed"
                style={{ color: "#6B7280" }}
              >
                {theatre.address}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {theatre.facilities.map((f) => (
                  <Badge
                    key={f}
                    variant="outline"
                    className="text-xs"
                    style={{ borderColor: "#2A7B6F44", color: "#2A7B6F" }}
                  >
                    <Star className="w-2.5 h-2.5 mr-1" />
                    {f}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
