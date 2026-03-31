import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { generateSeatMap } from "../data/mockData";

export interface BookingData {
  id: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  theatreId: string;
  theatreName: string;
  theatreCity: string;
  date: string;
  time: string;
  seats: string[];
  totalAmount: number;
  gst: number;
  convenienceFee: number;
  status: "confirmed" | "cancelled";
  bookedAt: string;
}

export interface CartState {
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  theatreId: string;
  theatreName: string;
  theatreCity: string;
  date: string;
  time: string;
  showtimeId: string;
  prices: { standard: number; premium: number; recliner: number };
  seatMap: Record<string, "available" | "booked">;
  selectedSeats: string[];
}

interface AppContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  userName: string;
  setUserName: (n: string) => void;
  cart: CartState | null;
  setCart: (cart: CartState | null) => void;
  updateCartSeats: (seats: string[]) => void;
  bookings: BookingData[];
  addBooking: (b: BookingData) => void;
  cancelBooking: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCityState] = useState<string>(
    () => localStorage.getItem("bollywood_city") || "Mumbai",
  );
  const [isLoggedIn, setIsLoggedInState] = useState<boolean>(
    () => localStorage.getItem("bollywood_loggedin") === "true",
  );
  const [userName, setUserNameState] = useState<string>(
    () => localStorage.getItem("bollywood_username") || "Guest",
  );
  const [cart, setCartState] = useState<CartState | null>(null);
  const [bookings, setBookings] = useState<BookingData[]>(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("bollywood_bookings") || "[]",
      );
      if (stored.length > 0) return stored;
      // Seed demo bookings for admin view
      const demo: BookingData[] = [
        {
          id: "BT001",
          movieId: "jawan",
          movieTitle: "Jawan",
          moviePoster: "",
          theatreId: "t1",
          theatreName: "PVR Juhu",
          theatreCity: "Mumbai",
          date: "2026-03-28",
          time: "7:00 PM",
          seats: ["E5", "E6", "E7"],
          totalAmount: 1062,
          gst: 162,
          convenienceFee: 30,
          status: "confirmed",
          bookedAt: "2026-03-28T13:00:00Z",
        },
        {
          id: "BT002",
          movieId: "animal",
          movieTitle: "Animal",
          moviePoster: "",
          theatreId: "t2",
          theatreName: "INOX Andheri",
          theatreCity: "Mumbai",
          date: "2026-03-29",
          time: "3:30 PM",
          seats: ["C3", "C4"],
          totalAmount: 708,
          gst: 108,
          convenienceFee: 20,
          status: "confirmed",
          bookedAt: "2026-03-29T10:00:00Z",
        },
        {
          id: "BT003",
          movieId: "dunki",
          movieTitle: "Dunki",
          moviePoster: "",
          theatreId: "t3",
          theatreName: "Cinepolis Pune",
          theatreCity: "Pune",
          date: "2026-03-30",
          time: "6:00 PM",
          seats: ["A1", "A2", "A3", "A4"],
          totalAmount: 1888,
          gst: 288,
          convenienceFee: 40,
          status: "confirmed",
          bookedAt: "2026-03-30T08:00:00Z",
        },
        {
          id: "BT004",
          movieId: "jawan",
          movieTitle: "Jawan",
          moviePoster: "",
          theatreId: "t4",
          theatreName: "PVR Select City",
          theatreCity: "Delhi",
          date: "2026-03-31",
          time: "9:30 PM",
          seats: ["F1", "F2"],
          totalAmount: 826,
          gst: 126,
          convenienceFee: 20,
          status: "cancelled",
          bookedAt: "2026-03-31T06:00:00Z",
        },
        {
          id: "BT005",
          movieId: "tiger3",
          movieTitle: "Tiger 3",
          moviePoster: "",
          theatreId: "t5",
          theatreName: "INOX Forum Mall",
          theatreCity: "Bangalore",
          date: "2026-03-31",
          time: "12:00 PM",
          seats: ["B8", "B9", "B10"],
          totalAmount: 1298,
          gst: 198,
          convenienceFee: 30,
          status: "confirmed",
          bookedAt: "2026-03-31T07:30:00Z",
        },
      ];
      localStorage.setItem("bollywood_bookings", JSON.stringify(demo));
      return demo;
    } catch {
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState("");

  const setSelectedCity = (city: string) => {
    setSelectedCityState(city);
    localStorage.setItem("bollywood_city", city);
  };

  const setIsLoggedIn = (v: boolean) => {
    setIsLoggedInState(v);
    localStorage.setItem("bollywood_loggedin", String(v));
  };

  const setUserName = (n: string) => {
    setUserNameState(n);
    localStorage.setItem("bollywood_username", n);
  };

  const setCart = (c: CartState | null) => {
    setCartState(c);
  };

  const updateCartSeats = (seats: string[]) => {
    setCartState((prev) => (prev ? { ...prev, selectedSeats: seats } : null));
  };

  const addBooking = (b: BookingData) => {
    setBookings((prev) => {
      const updated = [b, ...prev];
      localStorage.setItem("bollywood_bookings", JSON.stringify(updated));
      return updated;
    });
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) => {
      const updated = prev.map((b) =>
        b.id === id ? { ...b, status: "cancelled" as const } : b,
      );
      localStorage.setItem("bollywood_bookings", JSON.stringify(updated));
      return updated;
    });
  };

  // Initialize cart with seat map when cart is set
  useEffect(() => {
    if (cart && Object.keys(cart.seatMap).length === 0) {
      setCartState((prev) =>
        prev ? { ...prev, seatMap: generateSeatMap() } : null,
      );
    }
  }, [cart]);

  return (
    <AppContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        cart,
        setCart,
        updateCartSeats,
        bookings,
        addBooking,
        cancelBooking,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
