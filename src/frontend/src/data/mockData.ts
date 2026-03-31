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
  // Mumbai
  {
    id: "pvr-andheri",
    name: "PVR Andheri",
    city: "Mumbai",
    address: "Versova Road, Andheri West, Mumbai u2013 400053",
    facilities: ["Dolby Atmos", "4DX", "IMAX", "Lounge"],
  },
  {
    id: "inox-rcity",
    name: "INOX R-City Mall",
    city: "Mumbai",
    address: "R City Mall, LBS Marg, Ghatkopar West, Mumbai u2013 400086",
    facilities: ["INOX INSIGNIA", "Dolby Atmos", "IMAX"],
  },
  {
    id: "cinepolis-bkc",
    name: "Cinepolis BKC",
    city: "Mumbai",
    address: "Maker Maxity, Bandra Kurla Complex, Mumbai u2013 400051",
    facilities: ["LUXE", "Dolby Atmos", "4K Laser"],
  },
  {
    id: "carnival-wadala",
    name: "Carnival Cinemas Wadala",
    city: "Mumbai",
    address: "R Mall, Dr. Ambedkar Road, Wadala, Mumbai u2013 400031",
    facilities: ["Dolby Digital", "3D", "Recliner Lounge"],
  },
  {
    id: "pvr-juhu",
    name: "PVR Juhu",
    city: "Mumbai",
    address:
      "Centrium Mall, Juhu Versova Link Road, Andheri West, Mumbai u2013 400049",
    facilities: ["Dolby Atmos", "LUXE", "Playhouse"],
  },
  // Delhi
  {
    id: "pvr-select",
    name: "PVR Select City Walk",
    city: "Delhi",
    address: "Select Citywalk Mall, Saket, New Delhi u2013 110017",
    facilities: ["Dolby Atmos", "Playhouse", "Director's Cut"],
  },
  {
    id: "inox-saket",
    name: "INOX Saket",
    city: "Delhi",
    address: "DLF Place Mall, Saket, New Delhi u2013 110017",
    facilities: ["INSIGNIA", "Dolby Atmos", "4K Laser"],
  },
  {
    id: "pvr-pacific",
    name: "PVR Pacific Mall",
    city: "Delhi",
    address: "Pacific Mall, Subhash Nagar, New Delhi u2013 110027",
    facilities: ["Dolby Atmos", "IMAX", "4DX"],
  },
  {
    id: "cinepolis-dlf",
    name: "Cinepolis DLF Avenue",
    city: "Delhi",
    address: "DLF Avenue Mall, Saket, New Delhi u2013 110017",
    facilities: ["VIP", "Dolby Atmos", "4DX"],
  },
  // Bangalore
  {
    id: "cinepolis-blr",
    name: "Cinepolis Orion Mall",
    city: "Bangalore",
    address: "Orion Mall, Rajajinagar, Bangalore u2013 560010",
    facilities: ["LUXE", "4DX", "Dolby Atmos", "IMAX"],
  },
  {
    id: "pvr-phoenix-blr",
    name: "PVR Phoenix Marketcity",
    city: "Bangalore",
    address: "Phoenix Marketcity, Whitefield, Bangalore u2013 560066",
    facilities: ["Dolby Atmos", "IMAX", "Lounge"],
  },
  {
    id: "inox-garuda",
    name: "INOX Garuda Mall",
    city: "Bangalore",
    address: "Garuda Mall, Magrath Road, Bangalore u2013 560025",
    facilities: ["INSIGNIA", "Dolby Atmos", "4K Laser"],
  },
  {
    id: "miraj-blr",
    name: "Miraj Cinemas Bangalore",
    city: "Bangalore",
    address: "Forum Shantiniketan Mall, Whitefield, Bangalore u2013 560048",
    facilities: ["Dolby Digital", "3D", "Recliner"],
  },
  // Chennai
  {
    id: "pvr-express-chennai",
    name: "PVR Express Avenue",
    city: "Chennai",
    address: "Express Avenue Mall, Royapettah, Chennai u2013 600002",
    facilities: ["Dolby Atmos", "IMAX", "Lounge"],
  },
  {
    id: "inox-escape-chennai",
    name: "INOX Escape Cinemas",
    city: "Chennai",
    address: "Valluvar Kottam High Road, Nungambakkam, Chennai u2013 600034",
    facilities: ["INSIGNIA", "Dolby Atmos", "4DX"],
  },
  {
    id: "spi-palazzo-chennai",
    name: "SPI Palazzo Cinemas",
    city: "Chennai",
    address: "Phoenix Marketcity, Velachery, Chennai u2013 600042",
    facilities: ["Luxe Gold Class", "Dolby Atmos", "4K Laser"],
  },
  {
    id: "cinepolis-vr-chennai",
    name: "Cinepolis VR Chennai",
    city: "Chennai",
    address: "VR Chennai Mall, Anna Salai, Chennai u2013 600032",
    facilities: ["LUXE", "4DX", "Dolby Atmos"],
  },
  // Hyderabad
  {
    id: "pvr-forum-hyd",
    name: "PVR Forum Sujana Mall",
    city: "Hyderabad",
    address: "Forum Sujana Mall, Kukatpally, Hyderabad u2013 500072",
    facilities: ["Dolby Atmos", "IMAX", "4DX"],
  },
  {
    id: "inox-gnr-hyd",
    name: "INOX GVK One Mall",
    city: "Hyderabad",
    address: "GVK One Mall, Banjara Hills, Hyderabad u2013 500034",
    facilities: ["INSIGNIA", "Dolby Atmos", "Gold Class"],
  },
  {
    id: "cinepolis-inorbit-hyd",
    name: "Cinepolis Inorbit Mall",
    city: "Hyderabad",
    address: "Inorbit Mall, Madhapur, Hyderabad u2013 500081",
    facilities: ["LUXE", "4DX", "Dolby Atmos"],
  },
  {
    id: "miraj-hyderabad",
    name: "Miraj Cinemas Hyderabad",
    city: "Hyderabad",
    address: "Sarath City Capital Mall, Gachibowli, Hyderabad u2013 500032",
    facilities: ["Dolby Digital", "3D", "Recliner Lounge"],
  },
  // Kolkata
  {
    id: "pvr-acropolis-kol",
    name: "PVR Acropolis Mall",
    city: "Kolkata",
    address: "Acropolis Mall, Rashbehari Avenue, Kolkata u2013 700019",
    facilities: ["Dolby Atmos", "4DX", "IMAX"],
  },
  {
    id: "inox-quest-kol",
    name: "INOX Quest Mall",
    city: "Kolkata",
    address: "Quest Mall, Park Street, Kolkata u2013 700017",
    facilities: ["INSIGNIA", "Dolby Atmos", "4K Laser"],
  },
  {
    id: "cinepolis-south-city-kol",
    name: "Cinepolis South City Mall",
    city: "Kolkata",
    address: "South City Mall, Prince Anwar Shah Road, Kolkata u2013 700068",
    facilities: ["LUXE", "Dolby Atmos", "4DX"],
  },
  {
    id: "carnival-kol",
    name: "Carnival Cinemas Kolkata",
    city: "Kolkata",
    address: "City Centre II, New Town, Kolkata u2013 700156",
    facilities: ["Dolby Digital", "3D", "Recliner"],
  },
  // Pune
  {
    id: "cinepolis-pune",
    name: "Cinepolis Phoenix Pune",
    city: "Pune",
    address: "Phoenix Marketcity, Viman Nagar, Pune u2013 411014",
    facilities: ["VIP", "4DX", "Dolby Atmos"],
  },
  {
    id: "pvr-mall-pune",
    name: "PVR Pavilion Mall",
    city: "Pune",
    address: "Pavilion Mall, Nagar Road, Viman Nagar, Pune u2013 411014",
    facilities: ["Dolby Atmos", "IMAX", "Lounge"],
  },
  {
    id: "inox-bund-pune",
    name: "INOX Bund Garden",
    city: "Pune",
    address: "Bund Garden Road, Pune u2013 411001",
    facilities: ["INSIGNIA", "Dolby Atmos", "4K Laser"],
  },
  {
    id: "miraj-pune",
    name: "Miraj Cinemas Pune",
    city: "Pune",
    address: "Seasons Mall, Magarpatta, Pune u2013 411013",
    facilities: ["Dolby Digital", "3D", "Recliner Lounge"],
  },
  // Ahmedabad
  {
    id: "pvr-alphaone-ahm",
    name: "PVR AlphaOne Mall",
    city: "Ahmedabad",
    address: "AlphaOne Mall, Vastrapur, Ahmedabad u2013 380015",
    facilities: ["Dolby Atmos", "IMAX", "4DX"],
  },
  {
    id: "inox-sg-ahm",
    name: "INOX SG Highway",
    city: "Ahmedabad",
    address: "Himalaya Mall, Drive-in Road, Ahmedabad u2013 380052",
    facilities: ["INSIGNIA", "Dolby Atmos", "4K Laser"],
  },
  {
    id: "cinepolis-iscon-ahm",
    name: "Cinepolis ISCON Mega Mall",
    city: "Ahmedabad",
    address:
      "ISCON Mega Mall, Sarkhej-Gandhinagar Highway, Ahmedabad u2013 380015",
    facilities: ["LUXE", "4DX", "Dolby Atmos"],
  },
  {
    id: "carnival-ahm",
    name: "Carnival Cinemas Ahmedabad",
    city: "Ahmedabad",
    address: "Acropolis Mall, Mansi Circle, Vastrapur, Ahmedabad u2013 380015",
    facilities: ["Dolby Digital", "3D", "Recliner Lounge"],
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
