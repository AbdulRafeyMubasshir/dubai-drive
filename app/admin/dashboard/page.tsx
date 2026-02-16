// app/admin/dashboard/page.tsx
import { createServerClient } from "@/lib/supabase/server";
import { addCarAction } from "../actions";
import Link from "next/link";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // Await searchParams (required in Next.js 15+ / 16)
  const resolvedSearchParams = await searchParams;
  const errorMessage = resolvedSearchParams.error
    ? decodeURIComponent(resolvedSearchParams.error)
    : null;

  const supabase = await createServerClient();

  const { data: cars, error: fetchError } = await supabase
    .from("cars")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (fetchError) {
    console.error("Fetch cars error:", fetchError);
    return (
      <div style={{ color: "#ff6b6b", padding: "2rem", textAlign: "center" }}>
        Error loading cars: {fetchError.message}
      </div>
    );
  }

  return (
    <div style={{ padding: "1.5rem 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "2.5rem" }}>Admin Dashboard</h1>
        <Link href="/admin/bookings">
          <button className="btn btn-primary">
            Manage Bookings
          </button>
        </Link>
      </div>

      {/* Error message from redirect */}
      {errorMessage && (
        <div
          style={{
            background: "rgba(255, 107, 107, 0.15)",
            color: "#ff6b6b",
            padding: "1rem 1.5rem",
            borderRadius: "10px",
            marginBottom: "2.5rem",
            border: "1px solid #ff6b6b80",
            fontWeight: 500,
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Add Car Form */}
      <section
        style={{
          background: "#1a1f2b",
          padding: "2rem",
          borderRadius: "12px",
          marginBottom: "3.5rem",
          border: "1px solid #222",
        }}
      >
        <h2 style={{ marginBottom: "1.8rem", color: "#00d4ff" }}>Add New Car</h2>

        <form
          action={addCarAction}
          style={{
            display: "grid",
            gap: "1.4rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {/* Name & Category */}
          <div>
            <label htmlFor="name" style={{ display: "block", marginBottom: "0.6rem" }}>
              Car Name *
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="e.g. Lamborghini Huracán"
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label htmlFor="category" style={{ display: "block", marginBottom: "0.6rem" }}>
              Category *
            </label>
            <select id="category" name="category" required style={{ width: "100%" }}>
              <option value="">Select category</option>
              <option value="Economy">Economy</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Pricing */}
          <div>
            <label htmlFor="price_day" style={{ display: "block", marginBottom: "0.6rem" }}>
              Price per Day (AED) *
            </label>
            <input
              id="price_day"
              name="price_day"
              type="number"
              min="0"
              step="1"
              required
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label htmlFor="price_week" style={{ display: "block", marginBottom: "0.6rem" }}>
              Price per Week (AED)
            </label>
            <input
              id="price_week"
              name="price_week"
              type="number"
              min="0"
              step="1"
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label htmlFor="price_month" style={{ display: "block", marginBottom: "0.6rem" }}>
              Price per Month (AED)
            </label>
            <input
              id="price_month"
              name="price_month"
              type="number"
              min="0"
              step="1"
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label htmlFor="deposit" style={{ display: "block", marginBottom: "0.6rem" }}>
              Deposit (AED)
            </label>
            <input
              id="deposit"
              name="deposit"
              type="number"
              min="0"
              step="100"
              style={{ width: "100%" }}
            />
          </div>

          {/* Specs */}
          <div>
            <label htmlFor="mileage_limit" style={{ display: "block", marginBottom: "0.6rem" }}>
              Mileage Limit
            </label>
            <input
              id="mileage_limit"
              name="mileage_limit"
              placeholder="Unlimited / 250 km/day"
              defaultValue="Unlimited"
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label htmlFor="engine" style={{ display: "block", marginBottom: "0.6rem" }}>
              Engine
            </label>
            <input
              id="engine"
              name="engine"
              placeholder="e.g. 5.2L V10"
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label htmlFor="transmission" style={{ display: "block", marginBottom: "0.6rem" }}>
              Transmission
            </label>
            <input
              id="transmission"
              name="transmission"
              placeholder="e.g. Automatic / Dual-clutch"
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label htmlFor="seats" style={{ display: "block", marginBottom: "0.6rem" }}>
              Seats
            </label>
            <input
              id="seats"
              name="seats"
              type="number"
              min="2"
              max="9"
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label htmlFor="fuel_type" style={{ display: "block", marginBottom: "0.6rem" }}>
              Fuel Type
            </label>
            <input
              id="fuel_type"
              name="fuel_type"
              placeholder="Petrol / Electric / Hybrid"
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="insurance" style={{ display: "block", marginBottom: "0.6rem" }}>
              Insurance Details
            </label>
            <input
              id="insurance"
              name="insurance"
              placeholder="e.g. Full coverage included, AED 500 deductible"
              style={{ width: "100%" }}
            />
          </div>

          {/* Images */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="images" style={{ display: "block", marginBottom: "0.6rem" }}>
              Upload Images (multiple allowed)
            </label>
            <input
              id="images"
              name="images"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              style={{ width: "100%", padding: "0.5rem 0" }}
            />
          </div>

          {/* Submit */}
          <div style={{ gridColumn: "1 / -1", marginTop: "1.5rem" }}>
            <button
              type="submit"
              className="btn btn-primary btn-large"
              style={{ width: "100%", fontSize: "1.15rem", padding: "1.1rem" }}
            >
              Add Car + Upload Images
            </button>
          </div>
        </form>
      </section>

      {/* Cars List */}
      <section>
        <h2 style={{ marginBottom: "1.8rem", color: "#00d4ff" }}>
          Current Cars ({cars?.length || 0})
        </h2>

        {cars && cars.length > 0 ? (
          <div style={{ display: "grid", gap: "1.6rem" }}>
            {cars.map((car: any) => (
              <div
                key={car.id}
                style={{
                  background: "#1a1f2b",
                  padding: "1.6rem",
                  borderRadius: "12px",
                  border: "1px solid #222",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ margin: "0 0 0.6rem 0", fontSize: "1.4rem" }}>{car.name}</h3>
                    <div style={{ color: "#00d4ff", marginBottom: "0.6rem" }}>{car.category}</div>
                    <div style={{ color: "#aaa", fontSize: "0.95rem", lineHeight: "1.5" }}>
                      <strong>Daily:</strong> AED {car.price_day} •{" "}
                      <strong>Deposit:</strong> AED {car.deposit}
                      {car.images?.length > 0 && ` • ${car.images.length} image(s)`}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button className="btn btn-outline" disabled title="Edit coming soon">
                      Edit
                    </button>
                    <button
                      className="btn btn-outline"
                      style={{ color: "#ff6b6b", borderColor: "#ff6b6b" }}
                      disabled
                      title="Delete coming soon"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: "#888", fontStyle: "italic", padding: "2rem 0", textAlign: "center" }}>
            No cars added yet. Use the form above to create your first listing.
          </div>
        )}
      </section>
    </div>
  );
}