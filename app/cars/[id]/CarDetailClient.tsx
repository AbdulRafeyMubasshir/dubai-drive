// app/cars/[id]/CarDetailClient.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Car } from "@/types/supabase";

interface CarDetailClientProps {
  initialCar: Car;
}

export default function CarDetailClient({ initialCar }: CarDetailClientProps) {
  const car = initialCar;

  // Gallery
  const [currentImage, setCurrentImage] = useState(0);

  // Favorites (localStorage)
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]") as string[];
    setIsFavorite(favorites.includes(car.id));
  }, [car.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]") as string[];
    const newFavorites = isFavorite
      ? favorites.filter((id) => id !== car.id)
      : [...favorites, car.id];
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  // Booking flow
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [location, setLocation] = useState("Dubai International Airport");
  const [delivery, setDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupDate || !returnDate) {
      alert("Please select both pickup and return dates.");
      return;
    }
    setStep("payment");
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    setStep("success");
  };

  const bookingRef = useRef<HTMLDivElement>(null);
  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container section">
      <button className="back" onClick={() => window.history.back()}>
        ← Back to cars
      </button>

      <div className="detail-grid">
        {/* Gallery */}
        <div className="gallery">
          <div className="main-image-wrapper">
            {car.images?.length > 0 ? (
              <img
                src={car.images[currentImage]}
                alt={`${car.name} - view ${currentImage + 1}`}
                className="main-image-img"
              />
            ) : (
              <div
                style={{
                  height: "520px",
                  background: "#0f121a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#555",
                  borderRadius: "16px",
                }}
              >
                No images available
              </div>
            )}
          </div>

          {car.images && car.images.length > 1 && (
            <div className="thumbnails">
              {car.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`thumbnail ${idx === currentImage ? "active" : ""}`}
                  onClick={() => setCurrentImage(idx)}
                />
              ))}
            </div>
          )}

          {car.video_url && (
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="100%"
                src={car.video_url}
                title={`${car.name} video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Info panel */}
        <div>
          <h1 style={{ fontSize: "3.2rem", marginBottom: "0.6rem" }}>{car.name}</h1>
          <div style={{ color: "#00d4ff", fontSize: "1.3rem", marginBottom: "2rem" }}>
            {car.category}
          </div>

          <div className="detail-price">
            <div className="price-block">
              <span className="price-label">Daily</span>
              <span className="price-value">AED {car.price_day?.toLocaleString()}</span>
            </div>
            <div className="price-block">
              <span className="price-label">Weekly</span>
              <span className="price-value">AED {car.price_week?.toLocaleString() || "—"}</span>
            </div>
            <div className="price-block">
              <span className="price-label">Monthly</span>
              <span className="price-value">AED {car.price_month?.toLocaleString() || "—"}</span>
            </div>
          </div>

          <div className="info-box">
            <h3 style={{ color: "#00d4ff", marginBottom: "1.2rem" }}>Important Information</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><strong>Deposit:</strong> AED {car.deposit?.toLocaleString() || "—"}</li>
              <li><strong>Mileage limit:</strong> {car.mileage_limit || "Unlimited"}</li>
              <li><strong>Insurance:</strong> {car.insurance || "Full coverage included"}</li>
            </ul>
          </div>

          <div className="info-box">
            <h3 style={{ color: "#00d4ff", marginBottom: "1.2rem" }}>Specifications</h3>
            <div className="specs">
              <div><strong>Engine:</strong> {car.engine || "—"}</div>
              <div><strong>Transmission:</strong> {car.transmission || "—"}</div>
              <div><strong>Seats:</strong> {car.seats || "—"}</div>
              <div><strong>Fuel type:</strong> {car.fuel_type || "—"}</div>
            </div>
          </div>

          <div className="actions">
            <button onClick={scrollToBooking} className="btn btn-primary btn-large">
              Rent Now
            </button>
            <a href="tel:+971501234567" className="btn btn-outline">Call</a>
            <a
              href={`https://wa.me/971501234567?text=Interested%20in%20${encodeURIComponent(car.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ background: "#25D366", color: "white" }}
            >
              WhatsApp
            </a>
            <button
              onClick={toggleFavorite}
              className={`btn fav-btn ${isFavorite ? "active" : ""}`}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div ref={bookingRef} className="booking-card">
        <h2>Book this car</h2>

        {step === "form" && (
          <form onSubmit={handleBookingSubmit} className="booking-form">
            <div className="form-grid">
              <div>
                <label>Pickup date & time</label>
                <input
                  type="datetime-local"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Return date & time</label>
                <input
                  type="datetime-local"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Pickup location</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option>Dubai International Airport</option>
                  <option>Dubai Mall</option>
                  <option>Hotel Delivery</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="delivery-option">
              <input
                type="checkbox"
                id="delivery"
                checked={delivery}
                onChange={(e) => setDelivery(e.target.checked)}
              />
              <label htmlFor="delivery">Deliver to my location (extra fee may apply)</label>
            </div>

            <button type="submit" className="btn btn-primary btn-large" style={{ marginTop: "1.5rem" }}>
              Proceed to Payment
            </button>
          </form>
        )}

        {step === "payment" && (
          <div className="payment-section">
            <h3>Select Payment Method</h3>
            {["Credit / Debit Card", "Apple Pay / Google Pay", "Cash on Delivery"].map((method) => (
              <label key={method} className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method}
              </label>
            ))}
            <button
              onClick={handlePayment}
              className="btn btn-primary btn-large"
              style={{ marginTop: "1.5rem", width: "100%" }}
            >
              Confirm & Pay
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="success-message">
            <strong>Booking Confirmed!</strong><br /><br />
            Vehicle: {car.name}<br />
            Pickup: {pickupDate ? new Date(pickupDate).toLocaleString() : "—"}<br />
            Return: {returnDate ? new Date(returnDate).toLocaleString() : "—"}<br />
            Location: {location}
            {delivery && " (with delivery)"}
            <br /><br />
            Payment method: {paymentMethod}
            <br />
            <small>(Simulation – real system would process payment & send confirmation)</small>
          </div>
        )}
      </div>
    </div>
  );
}