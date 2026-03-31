export interface Movie {
  id: string;
  title: string;
  genre: string[];
  language: string[];
  duration: string;
  rating: number;
  cast: string[];
  director: string;
  synopsis: string;
  status: "now_showing" | "upcoming";
  poster: string;
  banner: string;
  certificate: string;
}

export interface Theatre {
  id: string;
  name: string;
  city: string;
  address: string;
  facilities: string[];
}

export interface Showtime {
  id: string;
  movieId: string;
  theatreId: string;
  date: string;
  time: string;
  prices: { standard: number; premium: number; recliner: number };
  availableSeats: number;
}

export const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Ahmedabad",
];

export const MOVIES: Movie[] = [
  {
    id: "jawan",
    title: "Jawan",
    genre: ["Action", "Thriller"],
    language: ["Hindi"],
    duration: "2h 49m",
    rating: 8.2,
    cast: [
      "Shah Rukh Khan",
      "Nayanthara",
      "Vijay Sethupathi",
      "Deepika Padukone",
    ],
    director: "Atlee",
    synopsis:
      "A man is driven by a personal vendetta to rectify the wrongs in society, while keeping a promise made years ago. He comes across a woman who has made the same vow — bringing them together to fight a relentless, unabashed battle.",
    status: "now_showing",
    poster: "/assets/generated/poster-jawan.dim_300x450.jpg",
    banner: "/assets/generated/hero-banner.dim_1200x450.jpg",
    certificate: "UA",
  },
  {
    id: "dunki",
    title: "Dunki",
    genre: ["Drama", "Comedy"],
    language: ["Hindi"],
    duration: "2h 35m",
    rating: 7.8,
    cast: ["Shah Rukh Khan", "Taapsee Pannu", "Vicky Kaushal", "Boman Irani"],
    director: "Rajkumar Hirani",
    synopsis:
      "Donkey flight — an illegal immigration route — becomes the only way for four friends from a small Punjab town to reach London. Based on the love story of Hardy who would do anything for Manu.",
    status: "now_showing",
    poster: "/assets/generated/poster-dunki.dim_300x450.jpg",
    banner: "/assets/generated/hero-banner.dim_1200x450.jpg",
    certificate: "UA",
  },
  {
    id: "animal",
    title: "Animal",
    genre: ["Action", "Thriller"],
    language: ["Hindi"],
    duration: "3h 21m",
    rating: 7.5,
    cast: ["Ranbir Kapoor", "Rashmika Mandanna", "Anil Kapoor", "Bobby Deol"],
    director: "Sandeep Reddy Vanga",
    synopsis:
      "The rebellious son of a business tycoon embarks on a quest to protect his father from enemies and settles unfinished scores in the most brutal way possible.",
    status: "now_showing",
    poster: "/assets/generated/poster-animal.dim_300x450.jpg",
    banner: "/assets/generated/hero-banner.dim_1200x450.jpg",
    certificate: "A",
  },
  {
    id: "sambahadur",
    title: "Sam Bahadur",
    genre: ["Biography", "Drama"],
    language: ["Hindi"],
    duration: "2h 26m",
    rating: 8.0,
    cast: ["Vicky Kaushal", "Sanya Malhotra", "Fatima Sana Shaikh"],
    director: "Meghna Gulzar",
    synopsis:
      "The extraordinary story of Field Marshal Sam Manekshaw and his pivotal role in the 1971 Indo-Pakistan War.",
    status: "now_showing",
    poster: "/assets/generated/poster-sambahadur.dim_300x450.jpg",
    banner: "/assets/generated/hero-banner.dim_1200x450.jpg",
    certificate: "UA",
  },
  {
    id: "salaar",
    title: "Salaar",
    genre: ["Action", "Thriller"],
    language: ["Telugu", "Hindi"],
    duration: "2h 55m",
    rating: 7.2,
    cast: ["Prabhas", "Prithviraj Sukumaran", "Shruti Haasan"],
    director: "Prashanth Neel",
    synopsis:
      "A ferocious warrior becomes ruthless to protect his friend, confronting an even deadlier adversary in a fictional kingdom.",
    status: "now_showing",
    poster: "/assets/generated/poster-salaar.dim_300x450.jpg",
    banner: "/assets/generated/hero-banner.dim_1200x450.jpg",
    certificate: "A",
  },
  {
    id: "fighter",
    title: "Fighter",
    genre: ["Action", "Drama"],
    language: ["Hindi"],
    duration: "2h 46m",
    rating: 7.4,
    cast: ["Hrithik Roshan", "Deepika Padukone", "Anil Kapoor"],
    director: "Siddharth Anand",
    synopsis:
      "India's first aerial action franchise. A team of Indian Air Force officers must fight the deadliest terror operation ever launched against India.",
    status: "upcoming",
    poster: "/assets/generated/poster-fighter.dim_300x450.jpg",
    banner: "/assets/generated/hero-banner.dim_1200x450.jpg",
    certificate: "UA",
  },
  {
    id: "stree2",
    title: "Stree 2",
    genre: ["Horror", "Comedy"],
    language: ["Hindi"],
    duration: "2h 20m",
    rating: 8.5,
    cast: [
      "Rajkummar Rao",
      "Shraddha Kapoor",
      "Aparshakti Khurana",
      "Pankaj Tripathi",
    ],
    director: "Amar Kaushik",
    synopsis:
      "The terror of Chanderi is back, but this time the evil is more powerful than ever. The fearless team must band together to face a supernatural force.",
    status: "upcoming",
    poster: "/assets/generated/poster-stree2.dim_300x450.jpg",
    banner: "/assets/generated/hero-banner.dim_1200x450.jpg",
    certificate: "UA",
  },
  {
    id: "pathaan2",
    title: "Pathaan 2",
    genre: ["Action", "Spy"],
    language: ["Hindi"],
    duration: "2h 50m",
    rating: 8.0,
    cast: ["Shah Rukh Khan", "Deepika Padukone", "John Abraham"],
    director: "Siddharth Anand",
    synopsis:
      "RAW agent Pathaan returns for another high-octane mission. When a sinister global conspiracy threatens national security, only India's most lethal spy can stop the ticking clock.",
    status: "upcoming",
    poster: "/assets/generated/poster-pathaan2.dim_300x450.jpg",
    banner: "/assets/generated/hero-banner.dim_1200x450.jpg",
    certificate: "UA",
  },
];

export const THEATRES: Theatre[] = [
  {
    id: "pvr-andheri",
    name: "PVR Andheri",
    city: "Mumbai",
    address: "Versova Road, Andheri West, Mumbai – 400053",
    facilities: ["Dolby Atmos", "4DX", "IMAX", "Lounge"],
  },
  {
    id: "pvr-select",
    name: "PVR Select City Walk",
    city: "Delhi",
    address: "Select Citywalk Mall, Saket, New Delhi – 110017",
    facilities: ["Dolby Atmos", "Playhouse", "Director's Cut"],
  },
  {
    id: "inox-rcity",
    name: "INOX R-City Mall",
    city: "Mumbai",
    address: "R City Mall, LBS Marg, Ghatkopar West, Mumbai – 400086",
    facilities: ["INOX INSIGNIA", "Dolby", "IMAX"],
  },
  {
    id: "inox-saket",
    name: "INOX Saket",
    city: "Delhi",
    address: "DLF Place Mall, Saket, New Delhi – 110017",
    facilities: ["INSIGNIA", "Dolby", "4K Laser"],
  },
  {
    id: "cinepolis-pune",
    name: "Cinepolis Pune",
    city: "Pune",
    address: "Phoenix Marketcity, Viman Nagar, Pune – 411014",
    facilities: ["VIP", "4DX", "Dolby Atmos"],
  },
  {
    id: "cinepolis-blr",
    name: "Cinepolis Bangalore",
    city: "Bangalore",
    address: "Orion Mall, Rajajinagar, Bangalore – 560010",
    facilities: ["LUXE", "4DX", "Dolby Atmos", "IMAX"],
  },
];

function getNextDays(n: number): string[] {
  const days: string[] = [];
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

const TIMES = ["09:00 AM", "01:30 PM", "06:00 PM", "09:30 PM"];

function generateShowtimes(): Showtime[] {
  const shows: Showtime[] = [];
  const days = getNextDays(7);
  for (const movie of MOVIES) {
    for (const theatre of THEATRES) {
      for (const date of days) {
        for (let ti = 0; ti < TIMES.length; ti++) {
          shows.push({
            id: `${movie.id}-${theatre.id}-${date}-${ti}`,
            movieId: movie.id,
            theatreId: theatre.id,
            date,
            time: TIMES[ti],
            prices: {
              standard: 200 + ti * 20,
              premium: 350 + ti * 25,
              recliner: 600 + ti * 30,
            },
            availableSeats: Math.floor(Math.random() * 40 + 20),
          });
        }
      }
    }
  }
  return shows;
}

export const SHOWTIMES: Showtime[] = generateShowtimes();

export function getShowtimesForMovieTheatreDate(
  movieId: string,
  theatreId: string,
  date: string,
): Showtime[] {
  return SHOWTIMES.filter(
    (s) =>
      s.movieId === movieId && s.theatreId === theatreId && s.date === date,
  );
}

export function getTheatresByCity(city: string): Theatre[] {
  return THEATRES.filter((t) => t.city === city);
}

export function generateSeatMap(): Record<string, "available" | "booked"> {
  const seats: Record<string, "available" | "booked"> = {};
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  for (const row of rows) {
    for (let i = 1; i <= 10; i++) {
      seats[`${row}${i}`] = Math.random() < 0.3 ? "booked" : "available";
    }
  }
  return seats;
}

export function getSeatTier(row: string): "recliner" | "premium" | "standard" {
  if (["A", "B"].includes(row)) return "recliner";
  if (["C", "D", "E", "F"].includes(row)) return "premium";
  return "standard";
}

export const SEAT_TIER_LABELS = {
  recliner: { label: "Recliner", color: "bg-purple-500", price: 600 },
  premium: { label: "Premium", color: "bg-blue-500", price: 350 },
  standard: { label: "Standard", color: "bg-green-600", price: 200 },
};
