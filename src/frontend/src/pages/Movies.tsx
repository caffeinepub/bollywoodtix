import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useApp } from "../context/AppContext";
import { MOVIES } from "../data/mockData";

const GENRES = [
  "All",
  "Action",
  "Drama",
  "Romance",
  "Thriller",
  "Comedy",
  "Horror",
  "Biography",
  "Spy",
];
const LANGUAGES = ["All", "Hindi", "English", "Tamil", "Telugu"];

export default function Movies() {
  const { searchQuery, setSearchQuery } = useApp();
  const [genre, setGenre] = useState("All");
  const [lang, setLang] = useState("All");
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const filtered = useMemo(() => {
    return MOVIES.filter((m) => {
      const matchSearch = localSearch
        ? m.title.toLowerCase().includes(localSearch.toLowerCase())
        : true;
      const matchGenre = genre === "All" || m.genre.includes(genre);
      const matchLang = lang === "All" || m.language.includes(lang);
      return matchSearch && matchGenre && matchLang;
    });
  }, [localSearch, genre, lang]);

  const nowShowing = filtered.filter((m) => m.status === "now_showing");
  const upcoming = filtered.filter((m) => m.status === "upcoming");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" style={{ color: "#1A2332" }}>
      <h1
        className="text-3xl font-bold mb-6"
        style={{ fontFamily: "Playfair Display, serif", color: "#1A2332" }}
      >
        Movies
      </h1>

      {/* Filters */}
      <div
        className="flex flex-col gap-4 mb-8 p-4 rounded-xl"
        style={{ background: "#FFFFFF", border: "1px solid #E5E0D8" }}
      >
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-4 h-4" style={{ color: "#2A7B6F" }} />
          <span className="text-sm font-semibold" style={{ color: "#2A7B6F" }}>
            Filters
          </span>
        </div>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search movies, cast, genre..."
            className="pl-9"
            style={{
              background: "#F8F5F0",
              border: "1px solid #E5E0D8",
              color: "#1A2332",
            }}
            data-ocid="movies.search_input"
          />
        </div>
        <div>
          <p className="text-xs mb-2" style={{ color: "#6B7280" }}>
            Genre
          </p>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => setGenre(g)}
                className="text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: genre === g ? "#2A7B6F" : "#F2F0EC",
                  color: genre === g ? "#FFFFFF" : "#4A6B7C",
                  border: `1px solid ${genre === g ? "#2A7B6F" : "#E5E0D8"}`,
                  fontWeight: genre === g ? 600 : 400,
                }}
                data-ocid="movies.tab"
              >
                {g}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs mb-2" style={{ color: "#6B7280" }}>
            Language
          </p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <button
                type="button"
                key={l}
                onClick={() => setLang(l)}
                className="text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: lang === l ? "#4A6B7C" : "#F2F0EC",
                  color: lang === l ? "#FFFFFF" : "#4A6B7C",
                  border: `1px solid ${lang === l ? "#4A6B7C" : "#E5E0D8"}`,
                  fontWeight: lang === l ? 600 : 400,
                }}
                data-ocid="movies.tab"
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue="now_showing">
        <TabsList style={{ background: "#F2F0EC" }}>
          <TabsTrigger
            value="now_showing"
            style={{ color: "#1A2332" }}
            data-ocid="movies.tab"
          >
            Now Showing ({nowShowing.length})
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            style={{ color: "#1A2332" }}
            data-ocid="movies.tab"
          >
            Upcoming ({upcoming.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="now_showing" className="mt-6">
          {nowShowing.length === 0 ? (
            <div className="text-center py-16" data-ocid="movies.empty_state">
              <p style={{ color: "#6B7280" }}>No movies match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {nowShowing.map((movie, i) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          {upcoming.length === 0 ? (
            <div className="text-center py-16" data-ocid="movies.empty_state">
              <p style={{ color: "#6B7280" }}>No movies match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {upcoming.map((movie, i) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
