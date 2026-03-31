import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Calendar, Film, MapPin, Ticket, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";

export default function MyBookings() {
  const { bookings, cancelBooking } = useApp();
  const [cancelId, setCancelId] = useState<string | null>(null);

  const handleCancel = () => {
    if (!cancelId) return;
    cancelBooking(cancelId);
    toast.success("Booking cancelled successfully");
    setCancelId(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" style={{ color: "#F2E6D3" }}>
      <div className="flex items-center gap-3 mb-8">
        <Ticket className="w-7 h-7" style={{ color: "#F4C65A" }} />
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          My Bookings
        </h1>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20" data-ocid="bookings.empty_state">
          <Film
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: "#3a3f45" }}
          />
          <p className="text-lg" style={{ color: "#B8B0A6" }}>
            No bookings yet
          </p>
          <p className="text-sm mt-1 mb-6" style={{ color: "#B8B0A6" }}>
            Book your first movie ticket now!
          </p>
          <Link to="/movies">
            <Button
              style={{ background: "#F4C65A", color: "#120808" }}
              data-ocid="bookings.primary_button"
            >
              Browse Movies
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {bookings.map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-2xl flex gap-4"
                style={{
                  background: "#2A2F35",
                  border: `1px solid ${booking.status === "cancelled" ? "#4a3020" : "#3a3f45"}`,
                  opacity: booking.status === "cancelled" ? 0.7 : 1,
                }}
                data-ocid={`bookings.item.${i + 1}`}
              >
                <img
                  src={booking.moviePoster}
                  alt={booking.movieTitle}
                  className="w-16 h-24 rounded-lg object-cover flex-shrink-0"
                  style={{ border: "1px solid #D6A23A44" }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className="font-bold text-lg"
                      style={{
                        fontFamily: "Playfair Display, serif",
                        color: "#F2E6D3",
                      }}
                    >
                      {booking.movieTitle}
                    </h3>
                    <Badge
                      style={{
                        background:
                          booking.status === "confirmed"
                            ? "#15803d"
                            : "#7A0E0E",
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      {booking.status === "confirmed"
                        ? "Confirmed"
                        : "Cancelled"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs">
                    <div className="flex items-center gap-1">
                      <MapPin
                        className="w-3 h-3"
                        style={{ color: "#D6A23A" }}
                      />
                      <span style={{ color: "#B8B0A6" }}>
                        {booking.theatreName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar
                        className="w-3 h-3"
                        style={{ color: "#D6A23A" }}
                      />
                      <span style={{ color: "#B8B0A6" }}>
                        {booking.date} · {booking.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Ticket
                        className="w-3 h-3"
                        style={{ color: "#D6A23A" }}
                      />
                      <span style={{ color: "#B8B0A6" }}>
                        Seats: {booking.seats.join(", ")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="text-xs" style={{ color: "#B8B0A6" }}>
                        Booking ID:{" "}
                        <span style={{ color: "#F4C65A" }}>{booking.id}</span>
                      </p>
                      <p
                        className="text-sm font-bold mt-1"
                        style={{ color: "#F4C65A" }}
                      >
                        Total: ₹{booking.totalAmount}
                      </p>
                    </div>
                    {booking.status === "confirmed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCancelId(booking.id)}
                        className="gap-1"
                        style={{
                          borderColor: "#7A0E0E",
                          color: "#ff6b6b",
                          background: "transparent",
                        }}
                        data-ocid={`bookings.delete_button.${i + 1}`}
                      >
                        <X className="w-3 h-3" /> Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AlertDialog
        open={!!cancelId}
        onOpenChange={(open) => !open && setCancelId(null)}
      >
        <AlertDialogContent
          style={{
            background: "#2A2F35",
            border: "1px solid #D6A23A44",
            color: "#F2E6D3",
          }}
          data-ocid="bookings.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              style={{
                color: "#F4C65A",
                fontFamily: "Playfair Display, serif",
              }}
            >
              Cancel Booking?
            </AlertDialogTitle>
            <AlertDialogDescription style={{ color: "#B8B0A6" }}>
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              style={{
                background: "#1F2328",
                border: "1px solid #3a3f45",
                color: "#F2E6D3",
              }}
              data-ocid="bookings.cancel_button"
            >
              Keep Booking
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              style={{ background: "#7A0E0E", color: "#fff" }}
              data-ocid="bookings.confirm_button"
            >
              Yes, Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
