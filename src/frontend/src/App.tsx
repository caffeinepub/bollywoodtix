import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AppProvider } from "./context/AppContext";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Movies from "./pages/Movies";
import MyBookings from "./pages/MyBookings";
import SeatSelection from "./pages/SeatSelection";

const hashHistory = createHashHistory();

function Layout() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster richColors position="top-right" />
    </AppProvider>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const moviesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movies",
  component: Movies,
});
const movieDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movies/$id",
  component: MovieDetail,
});
const seatsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking/seats",
  component: SeatSelection,
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking/checkout",
  component: Checkout,
});
const confirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking/confirmation",
  component: Confirmation,
});
const bookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bookings",
  component: MyBookings,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  moviesRoute,
  movieDetailRoute,
  seatsRoute,
  checkoutRoute,
  confirmationRoute,
  bookingsRoute,
  adminRoute,
]);

const router = createRouter({ routeTree, history: hashHistory });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
