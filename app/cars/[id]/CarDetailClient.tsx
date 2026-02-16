// app/cars/[id]/CarDetailClient.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { createBookingAction } from "@/app/actions/createBooking";
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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null); // stays after success

  // Form fields
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [location, setLocation] = useState("Dubai International Airport");
  const [delivery, setDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const bookingRef = useRef<HTMLDivElement>(null);
  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic validation
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      setErrorMsg("Please enter your name, email and phone number.");
      return;
    }

    if (!pickupDate || !returnDate) {
      setErrorMsg("Please select both pickup and return dates.");
      return;
    }

    // Show confirmation alert with summary
    const confirmText = `
Are you sure you want to confirm booking for ${car.name}?

Customer: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}

Pickup: ${new Date(pickupDate).toLocaleString()}
Return: ${new Date(returnDate).toLocaleString()}
Location: ${location}${delivery ? " (with delivery)" : ""}

Payment method: ${paymentMethod}

Click OK to confirm booking.
    `.trim();

    if (!window.confirm(confirmText)) {
      return; // user cancelled
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("car_id", car.id);
    formData.append("customer_name", customerName.trim());
    formData.append("customer_email", customerEmail.trim());
    formData.append("customer_phone", customerPhone.trim());
    formData.append("pickup_date", pickupDate);
    formData.append("return_date", returnDate);
    formData.append("location", location);
    formData.append("delivery", delivery.toString());
    formData.append("payment_method", paymentMethod);

    const result = await createBookingAction(formData);

    if (result.error) {
      setErrorMsg(result.error);
    } else {
      setBookingId(result.bookingId);
      // Success message now stays forever (no timeout)
    }

    setLoading(false);
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

        {bookingId ? (
          // Success stays forever
          <div className="success-message">
            <strong>Booking Confirmed!</strong><br /><br />
            Reference: <strong>{bookingId.slice(0, 8).toUpperCase()}</strong><br />
            Vehicle: {car.name}<br />
            Pickup: {new Date(pickupDate).toLocaleString()}<br />
            Return: {new Date(returnDate).toLocaleString()}<br />
            Location: {location}
            {delivery && " (with delivery)"}
            <br /><br />
            Payment method: {paymentMethod}<br />
            <small>We will contact you soon to confirm.</small>
          </div>
        ) : (
          <form onSubmit={handleConfirmBooking} className="booking-form">
            {/* Customer details */}
            <div className="form-grid">
              <div>
                <label>Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Email *</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Phone *</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Rental details */}
            <div className="form-grid">
              <div>
                <label>Pickup date & time *</label>
                <input
                  type="datetime-local"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Return date & time *</label>
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

            {errorMsg && (
              <div style={{ color: "#ff6b6b", margin: "1rem 0" }}>
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-large"
              style={{ marginTop: "1.5rem" }}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}