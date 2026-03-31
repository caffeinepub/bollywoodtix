import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Film,
  LogOut,
  MapPin,
  Menu,
  Search,
  Ticket,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { CITIES } from "../data/mockData";

export default function Header() {
  const {
    selectedCity,
    setSelectedCity,
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    setSearchQuery,
  } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginName, setLoginName] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.elements.namedItem("q") as HTMLInputElement).value;
    setSearchQuery(q);
    navigate({ to: "/movies" });
  };

  const handleLogin = () => {
    if (loginName.trim()) {
      setUserName(loginName.trim());
      setIsLoggedIn(true);
      setLoginOpen(false);
      setLoginName("");
    }
  };

  return (
    <header
      className="sticky top-0 z-50 shadow-lg"
      style={{
        background: "linear-gradient(135deg, #3B0A0A 0%, #6A2A10 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 flex-shrink-0"
          data-ocid="header.link"
        >
          <Film className="w-7 h-7" style={{ color: "#F4C65A" }} />
          <span
            className="text-xl font-bold tracking-widest hidden sm:block"
            style={{ color: "#F4C65A", fontFamily: "Playfair Display, serif" }}
          >
            BOLLYTIX
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-6 flex-1 ml-6">
          {[
            { label: "Movies", to: "/movies" },
            { label: "Cinemas", to: "/movies" },
            { label: "Offers", to: "/movies" },
            { label: "My Bookings", to: "/bookings" },
            { label: "Admin", to: "/admin" },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium transition-colors hover:text-yellow-300"
              style={{ color: "#F2E6D3" }}
              data-ocid="header.link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center flex-1 max-w-xs"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              name="q"
              placeholder="Search movies..."
              className="pl-9 py-1.5 h-9 text-sm"
              style={{
                background: "#2A2F35",
                border: "1px solid #4a3020",
                color: "#F2E6D3",
              }}
              data-ocid="header.search_input"
            />
          </div>
        </form>

        {/* City Selector */}
        <div className="hidden sm:flex items-center gap-1">
          <MapPin className="w-4 h-4" style={{ color: "#D6A23A" }} />
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger
              className="h-9 w-32 text-sm border-0"
              style={{ background: "rgba(255,255,255,0.1)", color: "#F2E6D3" }}
              data-ocid="header.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              style={{ background: "#2A2F35", border: "1px solid #4a3020" }}
            >
              {CITIES.map((city) => (
                <SelectItem
                  key={city}
                  value={city}
                  style={{ color: "#F2E6D3" }}
                >
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cart + Login */}
        <div className="flex items-center gap-2">
          <Link to="/bookings" data-ocid="header.link">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex gap-1"
              style={{ color: "#F2E6D3" }}
            >
              <Ticket className="w-4 h-4" />
            </Button>
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span
                className="hidden sm:block text-sm"
                style={{ color: "#D6A23A" }}
              >
                Hi, {userName.split(" ")[0]}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLoggedIn(false)}
                style={{ color: "#F2E6D3" }}
                data-ocid="header.button"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => setLoginOpen(true)}
              className="font-semibold text-sm"
              style={{ background: "#F4C65A", color: "#120808" }}
              data-ocid="header.button"
            >
              <User className="w-4 h-4 mr-1" />
              Login
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            style={{ color: "#F2E6D3" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="header.button"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden px-4 pb-4 flex flex-col gap-3"
          style={{ background: "#3B0A0A" }}
        >
          {[
            { label: "Movies", to: "/movies" },
            { label: "My Bookings", to: "/bookings" },
            { label: "Admin", to: "/admin" },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="text-sm py-1"
              style={{ color: "#F2E6D3" }}
            >
              {link.label}
            </Link>
          ))}
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              name="q"
              placeholder="Search movies..."
              className="flex-1 h-8 text-sm"
              style={{
                background: "#2A2F35",
                border: "1px solid #4a3020",
                color: "#F2E6D3",
              }}
            />
            <Button
              type="submit"
              size="sm"
              style={{ background: "#F4C65A", color: "#120808" }}
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}

      {/* Login Dialog */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent
          style={{
            background: "#1F2328",
            border: "1px solid #D6A23A",
            color: "#F2E6D3",
          }}
          data-ocid="login.dialog"
        >
          <DialogHeader>
            <DialogTitle
              style={{
                color: "#F4C65A",
                fontFamily: "Playfair Display, serif",
              }}
            >
              Welcome Back!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label htmlFor="login-name" style={{ color: "#B8B0A6" }}>
                Your Name
              </Label>
              <Input
                id="login-name"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1"
                style={{
                  background: "#2A2F35",
                  border: "1px solid #4a3020",
                  color: "#F2E6D3",
                }}
                data-ocid="login.input"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <Button
              className="w-full font-semibold"
              style={{ background: "#F4C65A", color: "#120808" }}
              onClick={handleLogin}
              data-ocid="login.submit_button"
            >
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
