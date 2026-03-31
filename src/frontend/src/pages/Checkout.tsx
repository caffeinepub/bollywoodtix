import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  CreditCard,
  Lock,
  Smartphone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import { getSeatTier } from "../data/mockData";

function generateBookingId(): string {
  return `BT${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, addBooking } = useApp();
  const [processing, setProcessing] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  if (!cart || cart.selectedSeats.length === 0) {
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

  const subtotal = cart.selectedSeats.reduce(
    (sum, seatId) => sum + cart.prices[getSeatTier(seatId[0])],
    0,
  );
  const gst = Math.round(subtotal * 0.18);
  const convenience = 30;
  const total = subtotal + gst + convenience;

  const handleConfirm = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    const booking = {
      id: generateBookingId(),
      movieId: cart.movieId,
      movieTitle: cart.movieTitle,
      moviePoster: cart.moviePoster,
      theatreId: cart.theatreId,
      theatreName: cart.theatreName,
      theatreCity: cart.theatreCity,
      date: cart.date,
      time: cart.time,
      seats: cart.selectedSeats,
      totalAmount: total,
      gst,
      convenienceFee: convenience,
      status: "confirmed" as const,
      bookedAt: new Date().toISOString(),
    };
    addBooking(booking);
    toast.success("Booking confirmed! 🎉");
    navigate({ to: "/booking/confirmation" });
    setProcessing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8" style={{ color: "#F2E6D3" }}>
      <button
        type="button"
        onClick={() => navigate({ to: "/booking/seats" })}
        className="flex items-center gap-2 mb-6 text-sm hover:text-yellow-300 transition-colors"
        style={{ color: "#D6A23A" }}
        data-ocid="checkout.button"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Seats
      </button>
      <h1
        className="text-3xl font-bold mb-8"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div
            className="p-6 rounded-2xl mb-6"
            style={{ background: "#2A2F35", border: "1px solid #3a3f45" }}
          >
            <h2
              className="text-lg font-bold mb-4"
              style={{
                color: "#F4C65A",
                fontFamily: "Playfair Display, serif",
              }}
            >
              Payment Method
            </h2>
            <Tabs defaultValue="card">
              <TabsList style={{ background: "#1F2328" }}>
                <TabsTrigger
                  value="card"
                  style={{ color: "#F2E6D3" }}
                  data-ocid="checkout.tab"
                >
                  <CreditCard className="w-4 h-4 mr-1" /> Card
                </TabsTrigger>
                <TabsTrigger
                  value="upi"
                  style={{ color: "#F2E6D3" }}
                  data-ocid="checkout.tab"
                >
                  <Smartphone className="w-4 h-4 mr-1" /> UPI
                </TabsTrigger>
                <TabsTrigger
                  value="netbanking"
                  style={{ color: "#F2E6D3" }}
                  data-ocid="checkout.tab"
                >
                  <Building2 className="w-4 h-4 mr-1" /> Net Banking
                </TabsTrigger>
              </TabsList>
              <TabsContent value="card" className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="card-num" style={{ color: "#B8B0A6" }}>
                    Card Number
                  </Label>
                  <Input
                    id="card-num"
                    value={cardNum}
                    onChange={(e) =>
                      setCardNum(e.target.value.replace(/\D/g, "").slice(0, 16))
                    }
                    placeholder="1234 5678 9012 3456"
                    className="mt-1"
                    style={{
                      background: "#1F2328",
                      border: "1px solid #4a3020",
                      color: "#F2E6D3",
                    }}
                    data-ocid="checkout.input"
                  />
                </div>
                <div>
                  <Label htmlFor="card-name" style={{ color: "#B8B0A6" }}>
                    Name on Card
                  </Label>
                  <Input
                    id="card-name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="RAHUL SHARMA"
                    className="mt-1"
                    style={{
                      background: "#1F2328",
                      border: "1px solid #4a3020",
                      color: "#F2E6D3",
                    }}
                    data-ocid="checkout.input"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="expiry" style={{ color: "#B8B0A6" }}>
                      Expiry
                    </Label>
                    <Input
                      id="expiry"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="mt-1"
                      style={{
                        background: "#1F2328",
                        border: "1px solid #4a3020",
                        color: "#F2E6D3",
                      }}
                      data-ocid="checkout.input"
                    />
                  </div>
                  <div className="w-28">
                    <Label htmlFor="cvv" style={{ color: "#B8B0A6" }}>
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                      }
                      placeholder="***"
                      type="password"
                      className="mt-1"
                      style={{
                        background: "#1F2328",
                        border: "1px solid #4a3020",
                        color: "#F2E6D3",
                      }}
                      data-ocid="checkout.input"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="upi" className="mt-4">
                <div>
                  <Label htmlFor="upi-id" style={{ color: "#B8B0A6" }}>
                    UPI ID
                  </Label>
                  <Input
                    id="upi-id"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="mt-1"
                    style={{
                      background: "#1F2328",
                      border: "1px solid #4a3020",
                      color: "#F2E6D3",
                    }}
                    data-ocid="checkout.input"
                  />
                </div>
                <div className="flex gap-3 mt-4 flex-wrap">
                  {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                    <button
                      type="button"
                      key={app}
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-yellow-400 hover:text-black"
                      style={{
                        background: "#3B0A0A",
                        color: "#F2E6D3",
                        border: "1px solid #5a2a10",
                      }}
                    >
                      {app}
                    </button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="netbanking" className="mt-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "SBI",
                    "HDFC Bank",
                    "ICICI Bank",
                    "Axis Bank",
                    "Kotak",
                    "Yes Bank",
                  ].map((bank) => (
                    <button
                      type="button"
                      key={bank}
                      className="px-4 py-3 rounded-lg text-sm font-semibold text-left transition-all hover:border-yellow-400"
                      style={{
                        background: "#1F2328",
                        color: "#F2E6D3",
                        border: "1px solid #4a3020",
                      }}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "#B8B0A6" }}
          >
            <Lock className="w-3 h-3" /> Secured by 256-bit SSL encryption.
          </div>
        </div>

        <div className="lg:w-80">
          <div
            className="p-5 rounded-2xl"
            style={{ background: "#2A2F35", border: "1px solid #3a3f45" }}
          >
            <h3
              className="font-bold mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#F4C65A",
              }}
            >
              Order Summary
            </h3>
            <div
              className="flex gap-3 mb-4 pb-4"
              style={{ borderBottom: "1px solid #3a3f45" }}
            >
              <img
                src={cart.moviePoster}
                alt={cart.movieTitle}
                className="w-16 rounded-lg"
              />
              <div>
                <p
                  className="font-semibold text-sm"
                  style={{ color: "#F2E6D3" }}
                >
                  {cart.movieTitle}
                </p>
                <p className="text-xs mt-1" style={{ color: "#B8B0A6" }}>
                  {cart.theatreName}
                </p>
                <p className="text-xs" style={{ color: "#B8B0A6" }}>
                  {cart.date} · {cart.time}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cart.selectedSeats.map((s) => (
                    <Badge
                      key={s}
                      className="text-xs"
                      style={{
                        background: "#F4C65A22",
                        color: "#F4C65A",
                        border: "1px solid #F4C65A44",
                      }}
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="space-y-2 pb-4"
              style={{ borderBottom: "1px solid #3a3f45" }}
            >
              <div className="flex justify-between text-sm">
                <span style={{ color: "#B8B0A6" }}>
                  Ticket Price ({cart.selectedSeats.length} seats)
                </span>
                <span style={{ color: "#F2E6D3" }}>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#B8B0A6" }}>GST (18%)</span>
                <span style={{ color: "#F2E6D3" }}>₹{gst}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#B8B0A6" }}>Convenience Fee</span>
                <span style={{ color: "#F2E6D3" }}>₹{convenience}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg pt-4 mb-5">
              <span style={{ color: "#D6A23A" }}>Total Amount</span>
              <span style={{ color: "#F4C65A" }}>₹{total}</span>
            </div>
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button
                className="w-full font-bold text-base py-6"
                onClick={handleConfirm}
                disabled={processing}
                style={{ background: "#F4C65A", color: "#120808" }}
                data-ocid="checkout.submit_button"
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" />{" "}
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Confirm Booking · ₹
                    {total}
                  </span>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
