import { cars } from "@/data/cars";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function CarDetail({ params }: { params: { id: string } }) {
  const car = cars.find((c) => c.id === Number(params.id));
  if (!car) notFound();

  return (
    <div className="container section">
      <button className="back" onClick={() => window.history.back()}>
        ← Back to cars
      </button>

      <div className="detail-grid">
        <div className="main-image" style={{ backgroundImage: `url(${car.image})` }} />

        <div>
          <h1 style={{ fontSize: "3.2rem", marginBottom: "0.6rem" }}>{car.name}</h1>
          <div style={{ color: "#00d4ff", fontSize: "1.3rem", marginBottom: "2rem" }}>
            {car.category}
          </div>

          <div className="detail-price">
            <div className="price-block">
              <span className="price-label">Daily</span>
              <span className="price-value">AED {car.priceDay}</span>
            </div>
            <div className="price-block">
              <span className="price-label">Weekly</span>
              <span className="price-value">AED {car.priceWeek}</span>
            </div>
          </div>

          <div style={{ background: "#1a1f2b", padding: "1.8rem", borderRadius: "12px", margin: "2.5rem 0" }}>
            <h3 style={{ color: "#00d4ff", marginBottom: "1.2rem" }}>Important Information</h3>
            <ul style={{ listStyle: "none" }}>
              <li><strong>Deposit:</strong> AED {car.deposit}</li>
              <li><strong>Mileage:</strong> {car.mileage}</li>
              <li><strong>Insurance:</strong> Full coverage included</li>
            </ul>
          </div>

          <div style={{ background: "#1a1f2b", padding: "1.8rem", borderRadius: "12px" }}>
            <h3 style={{ color: "#00d4ff", marginBottom: "1.2rem" }}>Specifications</h3>
            <div className="specs">
              <div><strong>Engine:</strong> {car.engine}</div>
              <div><strong>Transmission:</strong> {car.transmission}</div>
              <div><strong>Seats:</strong> {car.seats}</div>
              <div><strong>Fuel:</strong> {car.fuel}</div>
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-primary btn-large">Rent Now</button>
            <button className="btn btn-outline">Add to Favorites</button>
            <a href="https://wa.me/971501234567" target="_blank" className="btn btn-primary" style={{ background: "#25D366", color: "white" }}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Booking placeholder */}
      <div className="booking-card">
        <h2>Book this car</h2>
        <div className="form-grid">
          <div>
            <label>Pickup date & time</label>
            <input type="datetime-local" />
          </div>
          <div>
            <label>Return date & time</label>
            <input type="datetime-local" />
          </div>
          <div>
            <label>Pickup location</label>
            <select>
              <option>Dubai International Airport</option>
              <option>Dubai Mall</option>
              <option>Hotel Delivery</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary btn-large" style={{ marginTop: "1.5rem", width: "100%" }}>
          Check Availability & Book
        </button>
      </div>
    </div>
  );
}