import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Monitor } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";
import { SEAT_TIER_LABELS, getSeatTier } from "../data/mockData";

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const SEATS_PER_ROW = 10;

export default function SeatSelection() {
  const navigate = useNavigate();
  const { cart, updateCartSeats } = useApp();

  if (!cart) {
    return (
      <div className="text-center py-20" style={{ color: "#F2E6D3" }}>
        <p>No booking in progress.</p>
        <Button
          onClick={() => navigate({ to: "/movies" })}
          className="mt-4"
          style={{ background: "#F4C65A", color: "#120808" }}
        >
          Browse Movies
        </Button>
      </div>
    );
  }

  const toggleSeat = (seatId: string) => {
    if (cart.seatMap[seatId] === "booked") return;
    const current = cart.selectedSeats;
    if (current.includes(seatId))
      updateCartSeats(current.filter((s) => s !== seatId));
    else if (current.length < 10) updateCartSeats([...current, seatId]);
  };

  const calcTotal = () =>
    cart.selectedSeats.reduce(
      (sum, seatId) => sum + cart.prices[getSeatTier(seatId[0])],
      0,
    );

  const seatColor = (seatId: string) => {
    if (cart.seatMap[seatId] === "booked")
      return { bg: "#3a3a3a", cursor: "not-allowed", opacity: 0.5 };
    if (cart.selectedSeats.includes(seatId))
      return { bg: "#F4C65A", cursor: "pointer", opacity: 1 };
    const tier = getSeatTier(seatId[0]);
    if (tier === "recliner")
      return { bg: "#7c3aed", cursor: "pointer", opacity: 1 };
    if (tier === "premium")
      return { bg: "#2563eb", cursor: "pointer", opacity: 1 };
    return { bg: "#15803d", cursor: "pointer", opacity: 1 };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" style={{ color: "#F2E6D3" }}>
      <button
        type="button"
        onClick={() => navigate({ to: "/movies" })}
        className="flex items-center gap-2 mb-6 text-sm hover:text-yellow-300 transition-colors"
        style={{ color: "#D6A23A" }}
        data-ocid="seats.button"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div
            className="p-6 rounded-2xl"
            style={{ background: "#2A2F35", border: "1px solid #3a3f45" }}
          >
            <h2
              className="text-xl font-bold mb-2"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#F4C65A",
              }}
            >
              {cart.movieTitle}
            </h2>
            <p className="text-sm mb-1" style={{ color: "#B8B0A6" }}>
              {cart.theatreName} · {cart.date} · {cart.time}
            </p>

            <div className="text-center my-6">
              <div
                className="mx-auto rounded-lg py-2 flex items-center justify-center gap-2"
                style={{
                  background: "#F4C65A22",
                  border: "2px solid #F4C65A44",
                  maxWidth: "480px",
                }}
              >
                <Monitor className="w-4 h-4" style={{ color: "#F4C65A" }} />
                <span
                  className="text-xs font-semibold tracking-widest"
                  style={{ color: "#F4C65A" }}
                >
                  SCREEN THIS SIDE
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {Object.entries(SEAT_TIER_LABELS).map(([key, val]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{
                      background:
                        key === "recliner"
                          ? "#7c3aed"
                          : key === "premium"
                            ? "#2563eb"
                            : "#15803d",
                    }}
                  />
                  <span className="text-xs" style={{ color: "#B8B0A6" }}>
                    {val.label} ₹{val.price}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ background: "#F4C65A" }}
                />
                <span className="text-xs" style={{ color: "#B8B0A6" }}>
                  Selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-sm opacity-40"
                  style={{ background: "#3a3a3a" }}
                />
                <span className="text-xs" style={{ color: "#B8B0A6" }}>
                  Booked
                </span>
              </div>
            </div>

            <div className="space-y-2 overflow-x-auto">
              {ROWS.map((row) => (
                <div key={row} className="flex items-center gap-1">
                  <span
                    className="w-5 text-xs font-bold text-center flex-shrink-0"
                    style={{ color: "#D6A23A" }}
                  >
                    {row}
                  </span>
                  <div className="flex gap-1 flex-wrap">
                    {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
                      const seatId = `${row}${i + 1}`;
                      const sc = seatColor(seatId);
                      return (
                        <motion.button
                          type="button"
                          key={seatId}
                          onClick={() => toggleSeat(seatId)}
                          whileHover={
                            cart.seatMap[seatId] !== "booked"
                              ? { scale: 1.15 }
                              : {}
                          }
                          whileTap={
                            cart.seatMap[seatId] !== "booked"
                              ? { scale: 0.9 }
                              : {}
                          }
                          className="w-7 h-7 rounded-sm text-xs font-bold transition-all"
                          style={{
                            background: sc.bg,
                            cursor: sc.cursor,
                            opacity: sc.opacity,
                            color: cart.selectedSeats.includes(seatId)
                              ? "#120808"
                              : "#fff",
                          }}
                          disabled={cart.seatMap[seatId] === "booked"}
                          data-ocid={`seats.item.${ROWS.indexOf(row) * 10 + i + 1}`}
                        >
                          {i + 1}
                        </motion.button>
                      );
                    })}
                  </div>
                  <span
                    className="w-5 text-xs font-bold text-center flex-shrink-0"
                    style={{ color: "#D6A23A" }}
                  >
                    {row}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-72">
          <div
            className="sticky top-24 p-5 rounded-2xl"
            style={{ background: "#2A2F35", border: "1px solid #3a3f45" }}
          >
            <h3
              className="font-bold mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#F4C65A",
              }}
            >
              Booking Summary
            </h3>
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-xs" style={{ color: "#B8B0A6" }}>
                  Movie
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#F2E6D3" }}
                >
                  {cart.movieTitle}
                </p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "#B8B0A6" }}>
                  Theatre
                </p>
                <p className="text-sm" style={{ color: "#F2E6D3" }}>
                  {cart.theatreName}
                </p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "#B8B0A6" }}>
                  Show
                </p>
                <p className="text-sm" style={{ color: "#F2E6D3" }}>
                  {cart.date} · {cart.time}
                </p>
              </div>
            </div>
            <div
              className="border-t pt-4 mb-4"
              style={{ borderColor: "#3a3f45" }}
            >
              <p className="text-xs mb-2" style={{ color: "#B8B0A6" }}>
                Selected Seats ({cart.selectedSeats.length})
              </p>
              {cart.selectedSeats.length === 0 ? (
                <p className="text-sm" style={{ color: "#B8B0A6" }}>
                  No seats selected
                </p>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {cart.selectedSeats.map((s) => (
                    <Badge
                      key={s}
                      style={{
                        background: "#F4C65A",
                        color: "#120808",
                        fontWeight: 700,
                      }}
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div
              className="border-t pt-4 mb-4"
              style={{ borderColor: "#3a3f45" }}
            >
              {cart.selectedSeats.map((seatId) => {
                const tier = getSeatTier(seatId[0]);
                return (
                  <div
                    key={seatId}
                    className="flex justify-between text-xs mb-1"
                  >
                    <span style={{ color: "#B8B0A6" }}>
                      Seat {seatId} ({tier})
                    </span>
                    <span style={{ color: "#F2E6D3" }}>
                      ₹{cart.prices[tier]}
                    </span>
                  </div>
                );
              })}
              {cart.selectedSeats.length > 0 && (
                <div className="flex justify-between font-bold mt-2">
                  <span style={{ color: "#D6A23A" }}>Total</span>
                  <span style={{ color: "#F4C65A" }}>₹{calcTotal()}</span>
                </div>
              )}
            </div>
            <Button
              className="w-full font-bold"
              disabled={cart.selectedSeats.length === 0}
              onClick={() => navigate({ to: "/booking/checkout" })}
              style={{
                background:
                  cart.selectedSeats.length > 0 ? "#F4C65A" : "#4a4040",
                color: cart.selectedSeats.length > 0 ? "#120808" : "#888",
              }}
              data-ocid="seats.primary_button"
            >
              Proceed to Payment →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
