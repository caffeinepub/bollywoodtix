import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit2,
  IndianRupee,
  Plus,
  Save,
  Shield,
  Ticket,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import { MOVIES, THEATRES } from "../data/mockData";
import type { Movie, Theatre } from "../data/mockData";

const ADMIN_PASSWORD = "admin123";

const EMPTY_FORM = {
  title: "",
  genre: "",
  language: "",
  duration: "",
  rating: "",
  director: "",
  cast: "",
  synopsis: "",
  certificate: "",
  status: "now_showing" as "now_showing" | "upcoming",
};

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);
  const { bookings } = useApp();

  const [movies, setMovies] = useState<Movie[]>(MOVIES);
  const [theatres, setTheatres] = useState<Theatre[]>(THEATRES);

  const [editMovieId, setEditMovieId] = useState<string | null>(null);
  const [editMovieTitle, setEditMovieTitle] = useState("");

  const [editTheatreId, setEditTheatreId] = useState<string | null>(null);
  const [editTheatreName, setEditTheatreName] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErr, setFormErr] = useState("");

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwErr(false);
    } else {
      setPwErr(true);
    }
  };

  const deleteMovie = (id: string) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
    toast.success("Movie removed");
  };

  const saveMovieEdit = (id: string) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, title: editMovieTitle } : m)),
    );
    setEditMovieId(null);
    toast.success("Movie updated");
  };

  const deleteTheatre = (id: string) => {
    setTheatres((prev) => prev.filter((t) => t.id !== id));
    toast.success("Theatre removed");
  };

  const saveTheatreEdit = (id: string) => {
    setTheatres((prev) =>
      prev.map((t) => (t.id === id ? { ...t, name: editTheatreName } : t)),
    );
    setEditTheatreId(null);
    toast.success("Theatre updated");
  };

  const handleAddMovie = () => {
    if (!form.title.trim()) {
      setFormErr("Title is required.");
      return;
    }
    const newMovie: Movie = {
      id: Date.now().toString(),
      title: form.title.trim(),
      genre: form.genre
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
      language: form.language
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean),
      duration: form.duration.trim() || "TBA",
      rating: Number.parseFloat(form.rating) || 0,
      director: form.director.trim(),
      cast: form.cast
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      synopsis: form.synopsis.trim(),
      certificate: form.certificate.trim() || "UA",
      status: form.status,
      poster: "/assets/generated/poster-jawan.dim_300x450.jpg",
      banner: "/assets/generated/hero-banner.dim_1200x450.jpg",
    };
    setMovies((prev) => [newMovie, ...prev]);
    toast.success("Movie added successfully");
    setShowAddForm(false);
    setForm(EMPTY_FORM);
    setFormErr("");
  };

  const cancelAddForm = () => {
    setShowAddForm(false);
    setForm(EMPTY_FORM);
    setFormErr("");
  };

  // Payment stats
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalBookings = bookings.length;
  const avgBookingValue =
    totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;
  const totalSeatsSold = bookings.reduce((sum, b) => sum + b.seats.length, 0);

  const statCards = [
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "#F4C65A",
    },
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: Ticket,
      color: "#7DD3FC",
    },
    {
      label: "Avg. Booking Value",
      value: `₹${avgBookingValue.toLocaleString("en-IN")}`,
      icon: TrendingUp,
      color: "#86EFAC",
    },
    {
      label: "Total Seats Sold",
      value: totalSeatsSold,
      icon: Users,
      color: "#F9A8D4",
    },
  ];

  const inputStyle = {
    background: "#1F2328",
    border: "1px solid #3a3f45",
    color: "#F2E6D3",
  };

  if (!authed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm p-8 rounded-2xl"
          style={{ background: "#2A2F35", border: "1px solid #D6A23A44" }}
          data-ocid="admin.card"
        >
          <div className="text-center mb-6">
            <Shield
              className="w-12 h-12 mx-auto mb-3"
              style={{ color: "#F4C65A" }}
            />
            <h2
              className="text-2xl font-bold"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#F4C65A",
              }}
            >
              Admin Panel
            </h2>
            <p className="text-sm mt-1" style={{ color: "#B8B0A6" }}>
              Enter password to continue
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <Label style={{ color: "#B8B0A6" }}>Password</Label>
              <Input
                type="password"
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                  setPwErr(false);
                }}
                placeholder="••••••••"
                className="mt-1"
                style={{
                  background: "#1F2328",
                  border: `1px solid ${pwErr ? "#7A0E0E" : "#4a3020"}`,
                  color: "#F2E6D3",
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                data-ocid="admin.input"
              />
              {pwErr && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "#ff6b6b" }}
                  data-ocid="admin.error_state"
                >
                  Incorrect password
                </p>
              )}
            </div>
            <Button
              className="w-full font-bold"
              onClick={handleLogin}
              style={{ background: "#F4C65A", color: "#120808" }}
              data-ocid="admin.submit_button"
            >
              Login
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" style={{ color: "#F2E6D3" }}>
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-7 h-7" style={{ color: "#F4C65A" }} />
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Admin Panel
        </h1>
        <Badge style={{ background: "#15803d", color: "#fff" }}>
          Authenticated
        </Badge>
      </div>

      {/* Payment Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl p-5 flex flex-col gap-3"
            style={{ background: "#2A2F35", border: "1px solid #D6A23A44" }}
            data-ocid="admin.card"
          >
            <div className="flex items-center justify-between">
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "#B8B0A6" }}
              >
                {card.label}
              </p>
              <card.icon className="w-4 h-4" style={{ color: card.color }} />
            </div>
            <p className="text-2xl font-bold" style={{ color: card.color }}>
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="movies">
        <TabsList style={{ background: "#2A2F35" }}>
          <TabsTrigger
            value="movies"
            style={{ color: "#F2E6D3" }}
            data-ocid="admin.tab"
          >
            Movies ({movies.length})
          </TabsTrigger>
          <TabsTrigger
            value="theatres"
            style={{ color: "#F2E6D3" }}
            data-ocid="admin.tab"
          >
            Theatres ({theatres.length})
          </TabsTrigger>
          <TabsTrigger
            value="bookings"
            style={{ color: "#F2E6D3" }}
            data-ocid="admin.tab"
          >
            Bookings ({bookings.length})
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            style={{ color: "#F2E6D3" }}
            data-ocid="admin.tab"
          >
            Payments
          </TabsTrigger>
        </TabsList>

        {/* Movies Tab */}
        <TabsContent value="movies" className="mt-6">
          {/* Header row with Add button */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm" style={{ color: "#B8B0A6" }}>
              {movies.length} movie{movies.length !== 1 ? "s" : ""} in the
              system
            </p>
            <Button
              onClick={() => setShowAddForm((v) => !v)}
              style={{
                background: showAddForm ? "#3a3f45" : "#F4C65A",
                color: showAddForm ? "#F2E6D3" : "#120808",
              }}
              className="flex items-center gap-2 font-semibold"
              data-ocid="admin.open_modal_button"
            >
              <Plus className="w-4 h-4" />
              Add New Movie
            </Button>
          </div>

          {/* Inline Add Movie Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                key="add-movie-form"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl p-6 mb-6"
                style={{ background: "#2A2F35", border: "1px solid #3a3f45" }}
                data-ocid="admin.panel"
              >
                <h3
                  className="text-lg font-bold mb-5"
                  style={{
                    color: "#F4C65A",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  🎬 New Movie Release
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <Label
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "#B8B0A6" }}
                    >
                      Title <span style={{ color: "#ff6b6b" }}>*</span>
                    </Label>
                    <Input
                      value={form.title}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, title: e.target.value }));
                        setFormErr("");
                      }}
                      placeholder="e.g. Pushpa 2: The Rule"
                      className="mt-1"
                      style={inputStyle}
                      data-ocid="admin.input"
                    />
                    {formErr && (
                      <p
                        className="text-xs mt-1"
                        style={{ color: "#ff6b6b" }}
                        data-ocid="admin.error_state"
                      >
                        {formErr}
                      </p>
                    )}
                  </div>

                  {/* Genre */}
                  <div>
                    <Label
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "#B8B0A6" }}
                    >
                      Genre
                    </Label>
                    <Input
                      value={form.genre}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, genre: e.target.value }))
                      }
                      placeholder="Action, Thriller"
                      className="mt-1"
                      style={inputStyle}
                      data-ocid="admin.input"
                    />
                  </div>

                  {/* Language */}
                  <div>
                    <Label
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "#B8B0A6" }}
                    >
                      Language
                    </Label>
                    <Input
                      value={form.language}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, language: e.target.value }))
                      }
                      placeholder="Hindi, Tamil"
                      className="mt-1"
                      style={inputStyle}
                      data-ocid="admin.input"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <Label
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "#B8B0A6" }}
                    >
                      Duration
                    </Label>
                    <Input
                      value={form.duration}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, duration: e.target.value }))
                      }
                      placeholder="2h 30m"
                      className="mt-1"
                      style={inputStyle}
                      data-ocid="admin.input"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <Label
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "#B8B0A6" }}
                    >
                      Rating (0–10)
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      max={10}
                      step={0.1}
                      value={form.rating}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, rating: e.target.value }))
                      }
                      placeholder="8.5"
                      className="mt-1"
                      style={inputStyle}
                      data-ocid="admin.input"
                    />
                  </div>

                  {/* Director */}
                  <div>
                    <Label
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "#B8B0A6" }}
                    >
                      Director
                    </Label>
                    <Input
                      value={form.director}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, director: e.target.value }))
                      }
                      placeholder="Rajkumar Hirani"
                      className="mt-1"
                      style={inputStyle}
                      data-ocid="admin.input"
                    />
                  </div>

                  {/* Certificate */}
                  <div>
                    <Label
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "#B8B0A6" }}
                    >
                      Certificate
                    </Label>
                    <Input
                      value={form.certificate}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, certificate: e.target.value }))
                      }
                      placeholder="UA, A, U"
                      className="mt-1"
                      style={inputStyle}
                      data-ocid="admin.input"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <Label
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "#B8B0A6" }}
                    >
                      Status
                    </Label>
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          status: e.target.value as "now_showing" | "upcoming",
                        }))
                      }
                      className="mt-1 w-full rounded-md px-3 py-2 text-sm"
                      style={inputStyle}
                      data-ocid="admin.select"
                    >
                      <option value="now_showing">Now Showing</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>

                  {/* Cast */}
                  <div className="md:col-span-2">
                    <Label
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "#B8B0A6" }}
                    >
                      Cast
                    </Label>
                    <Input
                      value={form.cast}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, cast: e.target.value }))
                      }
                      placeholder="Shah Rukh Khan, Deepika Padukone"
                      className="mt-1"
                      style={inputStyle}
                      data-ocid="admin.input"
                    />
                  </div>

                  {/* Synopsis */}
                  <div className="md:col-span-2">
                    <Label
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "#B8B0A6" }}
                    >
                      Synopsis
                    </Label>
                    <textarea
                      value={form.synopsis}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, synopsis: e.target.value }))
                      }
                      placeholder="Brief description of the movie..."
                      rows={3}
                      className="mt-1 w-full rounded-md px-3 py-2 text-sm resize-none"
                      style={{ ...inputStyle, outline: "none" }}
                      data-ocid="admin.textarea"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <Button
                    onClick={handleAddMovie}
                    className="font-bold"
                    style={{ background: "#F4C65A", color: "#120808" }}
                    data-ocid="admin.submit_button"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Movie
                  </Button>
                  <Button
                    variant="outline"
                    onClick={cancelAddForm}
                    style={{ borderColor: "#3a3f45", color: "#B8B0A6" }}
                    data-ocid="admin.cancel_button"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #3a3f45" }}
          >
            <Table>
              <TableHeader>
                <TableRow
                  style={{ background: "#3B0A0A", borderColor: "#4a3020" }}
                >
                  <TableHead style={{ color: "#D6A23A" }}>Title</TableHead>
                  <TableHead style={{ color: "#D6A23A" }}>Genre</TableHead>
                  <TableHead style={{ color: "#D6A23A" }}>Rating</TableHead>
                  <TableHead style={{ color: "#D6A23A" }}>Status</TableHead>
                  <TableHead style={{ color: "#D6A23A" }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movies.map((movie, i) => (
                  <TableRow
                    key={movie.id}
                    style={{
                      borderColor: "#3a3f45",
                      background: i % 2 === 0 ? "#2A2F35" : "#1F2328",
                    }}
                    data-ocid={`admin.row.${i + 1}`}
                  >
                    <TableCell style={{ color: "#F2E6D3" }}>
                      {editMovieId === movie.id ? (
                        <Input
                          value={editMovieTitle}
                          onChange={(e) => setEditMovieTitle(e.target.value)}
                          className="h-7 text-sm"
                          style={{
                            background: "#120808",
                            border: "1px solid #D6A23A",
                            color: "#F2E6D3",
                          }}
                          data-ocid="admin.input"
                        />
                      ) : (
                        <span className="font-semibold">{movie.title}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {movie.genre.map((g) => (
                          <Badge
                            key={g}
                            variant="outline"
                            className="text-xs"
                            style={{ borderColor: "#4a3020", color: "#D6A23A" }}
                          >
                            {g}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell style={{ color: "#F4C65A" }}>
                      ⭐ {movie.rating}
                    </TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          background:
                            movie.status === "now_showing"
                              ? "#15803d"
                              : "#3B0A0A",
                          color: "#fff",
                        }}
                      >
                        {movie.status === "now_showing"
                          ? "Now Showing"
                          : "Upcoming"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {editMovieId === movie.id ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => saveMovieEdit(movie.id)}
                              style={{ background: "#15803d", color: "#fff" }}
                              data-ocid={`admin.save_button.${i + 1}`}
                            >
                              <Save className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditMovieId(null)}
                              style={{
                                borderColor: "#3a3f45",
                                color: "#B8B0A6",
                              }}
                              data-ocid={`admin.cancel_button.${i + 1}`}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditMovieId(movie.id);
                                setEditMovieTitle(movie.title);
                              }}
                              style={{
                                borderColor: "#D6A23A44",
                                color: "#D6A23A",
                              }}
                              data-ocid={`admin.edit_button.${i + 1}`}
                            >
                              <Edit2 className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteMovie(movie.id)}
                              style={{
                                borderColor: "#7A0E0E44",
                                color: "#ff6b6b",
                              }}
                              data-ocid={`admin.delete_button.${i + 1}`}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Theatres Tab */}
        <TabsContent value="theatres" className="mt-6">
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #3a3f45" }}
          >
            <Table>
              <TableHeader>
                <TableRow
                  style={{ background: "#3B0A0A", borderColor: "#4a3020" }}
                >
                  <TableHead style={{ color: "#D6A23A" }}>Name</TableHead>
                  <TableHead style={{ color: "#D6A23A" }}>City</TableHead>
                  <TableHead style={{ color: "#D6A23A" }}>Facilities</TableHead>
                  <TableHead style={{ color: "#D6A23A" }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {theatres.map((theatre, i) => (
                  <TableRow
                    key={theatre.id}
                    style={{
                      borderColor: "#3a3f45",
                      background: i % 2 === 0 ? "#2A2F35" : "#1F2328",
                    }}
                    data-ocid={`admin.row.${i + 1}`}
                  >
                    <TableCell style={{ color: "#F2E6D3" }}>
                      {editTheatreId === theatre.id ? (
                        <Input
                          value={editTheatreName}
                          onChange={(e) => setEditTheatreName(e.target.value)}
                          className="h-7 text-sm"
                          style={{
                            background: "#120808",
                            border: "1px solid #D6A23A",
                            color: "#F2E6D3",
                          }}
                          data-ocid="admin.input"
                        />
                      ) : (
                        <span className="font-semibold">{theatre.name}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        style={{ background: "#3B0A0A", color: "#F4C65A" }}
                      >
                        {theatre.city}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {theatre.facilities.slice(0, 3).map((f) => (
                          <Badge
                            key={f}
                            variant="outline"
                            className="text-xs"
                            style={{ borderColor: "#4a3020", color: "#D6A23A" }}
                          >
                            {f}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {editTheatreId === theatre.id ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => saveTheatreEdit(theatre.id)}
                              style={{ background: "#15803d", color: "#fff" }}
                              data-ocid={`admin.save_button.${i + 1}`}
                            >
                              <Save className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditTheatreId(null)}
                              style={{
                                borderColor: "#3a3f45",
                                color: "#B8B0A6",
                              }}
                              data-ocid={`admin.cancel_button.${i + 1}`}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditTheatreId(theatre.id);
                                setEditTheatreName(theatre.name);
                              }}
                              style={{
                                borderColor: "#D6A23A44",
                                color: "#D6A23A",
                              }}
                              data-ocid={`admin.edit_button.${i + 1}`}
                            >
                              <Edit2 className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteTheatre(theatre.id)}
                              style={{
                                borderColor: "#7A0E0E44",
                                color: "#ff6b6b",
                              }}
                              data-ocid={`admin.delete_button.${i + 1}`}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="mt-6">
          {bookings.length === 0 ? (
            <div
              className="text-center py-10"
              style={{ color: "#B8B0A6" }}
              data-ocid="admin.empty_state"
            >
              No bookings yet.
            </div>
          ) : (
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid #3a3f45" }}
            >
              <Table>
                <TableHeader>
                  <TableRow
                    style={{ background: "#3B0A0A", borderColor: "#4a3020" }}
                  >
                    <TableHead style={{ color: "#D6A23A" }}>
                      Booking ID
                    </TableHead>
                    <TableHead style={{ color: "#D6A23A" }}>Movie</TableHead>
                    <TableHead style={{ color: "#D6A23A" }}>Theatre</TableHead>
                    <TableHead style={{ color: "#D6A23A" }}>Date</TableHead>
                    <TableHead style={{ color: "#D6A23A" }}>Seats</TableHead>
                    <TableHead style={{ color: "#D6A23A" }}>Amount</TableHead>
                    <TableHead style={{ color: "#D6A23A" }}>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((b, i) => (
                    <TableRow
                      key={b.id}
                      style={{
                        borderColor: "#3a3f45",
                        background: i % 2 === 0 ? "#2A2F35" : "#1F2328",
                      }}
                      data-ocid={`admin.row.${i + 1}`}
                    >
                      <TableCell
                        className="font-mono text-xs"
                        style={{ color: "#F4C65A" }}
                      >
                        {b.id}
                      </TableCell>
                      <TableCell style={{ color: "#F2E6D3" }}>
                        {b.movieTitle}
                      </TableCell>
                      <TableCell style={{ color: "#B8B0A6" }}>
                        {b.theatreName}
                      </TableCell>
                      <TableCell style={{ color: "#B8B0A6" }}>
                        {b.date}
                      </TableCell>
                      <TableCell style={{ color: "#B8B0A6" }}>
                        {b.seats.join(", ")}
                      </TableCell>
                      <TableCell style={{ color: "#F4C65A", fontWeight: 700 }}>
                        ₹{b.totalAmount}
                      </TableCell>
                      <TableCell>
                        <Badge
                          style={{
                            background:
                              b.status === "confirmed" ? "#15803d" : "#7A0E0E",
                            color: "#fff",
                          }}
                        >
                          {b.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="mt-6">
          {bookings.length === 0 ? (
            <div
              className="text-center py-10"
              style={{ color: "#B8B0A6" }}
              data-ocid="admin.empty_state"
            >
              No payment records yet.
            </div>
          ) : (
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid #3a3f45" }}
            >
              <Table>
                <TableHeader>
                  <TableRow
                    style={{ background: "#3B0A0A", borderColor: "#4a3020" }}
                  >
                    <TableHead style={{ color: "#D6A23A" }}>
                      Booking ID
                    </TableHead>
                    <TableHead style={{ color: "#D6A23A" }}>Movie</TableHead>
                    <TableHead style={{ color: "#D6A23A" }}>
                      Base Amount
                    </TableHead>
                    <TableHead style={{ color: "#D6A23A" }}>
                      GST (18%)
                    </TableHead>
                    <TableHead style={{ color: "#D6A23A" }}>
                      Total Paid
                    </TableHead>
                    <TableHead style={{ color: "#D6A23A" }}>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((b, i) => {
                    const gst = Math.round(
                      b.totalAmount - b.totalAmount / 1.18,
                    );
                    const base = b.totalAmount - gst;
                    return (
                      <TableRow
                        key={b.id}
                        style={{
                          borderColor: "#3a3f45",
                          background: i % 2 === 0 ? "#2A2F35" : "#1F2328",
                        }}
                        data-ocid={`admin.row.${i + 1}`}
                      >
                        <TableCell
                          className="font-mono text-xs"
                          style={{ color: "#F4C65A" }}
                        >
                          {b.id}
                        </TableCell>
                        <TableCell style={{ color: "#F2E6D3" }}>
                          {b.movieTitle}
                        </TableCell>
                        <TableCell style={{ color: "#B8B0A6" }}>
                          ₹{base.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell style={{ color: "#86EFAC" }}>
                          ₹{gst.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell
                          style={{ color: "#F4C65A", fontWeight: 700 }}
                        >
                          ₹{b.totalAmount.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell>
                          <Badge
                            style={{
                              background:
                                b.status === "confirmed"
                                  ? "#15803d"
                                  : "#7A0E0E",
                              color: "#fff",
                            }}
                          >
                            {b.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
