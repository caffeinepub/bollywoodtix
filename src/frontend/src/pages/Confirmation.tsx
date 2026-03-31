import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Download, Home, Share2, Ticket } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

export default function Confirmation() {
  const navigate = useNavigate();
  const { bookings } = useApp();
  // Show the most recently added booking
  const booking = bookings[0];

  if (!booking) {
    return (
      <div className="text-center py-20" style={{ color: "#F2E6D3" }}>
        <p>No booking found.</p>
        <Button
          onClick={() => navigate({ to: "/" })}
          className="mt-4"
          style={{ background: "#F4C65A", color: "#120808" }}
        >
          Go Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12" style={{ color: "#F2E6D3" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2
            className="w-20 h-20 mx-auto mb-4"
            style={{ color: "#F4C65A" }}
          />
        </motion.div>
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: "Playfair Display, serif", color: "#F4C65A" }}
        >
          Booking Confirmed!
        </h1>
        <p className="text-sm mt-2" style={{ color: "#B8B0A6" }}>
          Your tickets have been booked successfully
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl mb-6"
        style={{ background: "#2A2F35", border: "2px solid #D6A23A44" }}
        data-ocid="confirmation.card"
      >
        <div
          className="flex items-center justify-between mb-6 pb-4"
          style={{ borderBottom: "1px solid #3a3f45" }}
        >
          <div>
            <p className="text-xs" style={{ color: "#B8B0A6" }}>
              Booking ID
            </p>
            <p
              className="text-lg font-bold tracking-widest"
              style={{ color: "#F4C65A" }}
            >
              {booking.id}
            </p>
          </div>
          <Badge style={{ background: "#15803d", color: "#fff" }}>
            Confirmed
          </Badge>
        </div>
        <div className="flex justify-center mb-6">
          <div
            className="w-36 h-36 rounded-xl flex items-center justify-center flex-col gap-2"
            style={{ background: "#1F2328", border: "2px dashed #D6A23A44" }}
          >
            <Ticket className="w-10 h-10" style={{ color: "#D6A23A" }} />
            <p className="text-xs" style={{ color: "#B8B0A6" }}>
              QR Code
            </p>
            <p className="text-xs font-mono" style={{ color: "#F4C65A" }}>
              {booking.id.slice(-6)}
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: "Movie", value: booking.movieTitle },
            {
              label: "Theatre",
              value: `${booking.theatreName}, ${booking.theatreCity}`,
            },
            {
              label: "Date & Time",
              value: `${booking.date} · ${booking.time}`,
            },
            { label: "Seats", value: booking.seats.join(", ") },
            { label: "Amount Paid", value: `₹${booking.totalAmount}` },
          ].map((item) => (
            <div key={item.label} className="flex justify-between">
              <span className="text-sm" style={{ color: "#B8B0A6" }}>
                {item.label}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "#F2E6D3" }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex gap-3 flex-wrap">
        <Button
          variant="outline"
          className="flex-1 gap-2"
          style={{
            borderColor: "#D6A23A",
            color: "#D6A23A",
            background: "transparent",
          }}
          data-ocid="confirmation.button"
        >
          <Download className="w-4 h-4" /> Download Ticket
        </Button>
        <Button
          variant="outline"
          className="flex-1 gap-2"
          style={{
            borderColor: "#D6A23A",
            color: "#D6A23A",
            background: "transparent",
          }}
          data-ocid="confirmation.button"
        >
          <Share2 className="w-4 h-4" /> Share
        </Button>
        <Link to="/bookings" className="flex-1">
          <Button
            className="w-full gap-2"
            style={{ background: "#F4C65A", color: "#120808" }}
            data-ocid="confirmation.primary_button"
          >
            <Ticket className="w-4 h-4" /> My Bookings
          </Button>
        </Link>
        <Link to="/" className="flex-1">
          <Button
            variant="outline"
            className="w-full gap-2"
            style={{
              borderColor: "#3a3f45",
              color: "#B8B0A6",
              background: "transparent",
            }}
            data-ocid="confirmation.button"
          >
            <Home className="w-4 h-4" /> Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
