// app/admin/bookings/page.tsx
import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminBookings() {
  const supabase = await createServerClient();

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(`
      *,
      cars (name, category)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return <div style={{ color: "#ff6b6b" }}>Error loading bookings: {error.message}</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ margin: 0 }}>Manage Bookings</h1>
        <Link href="/admin/dashboard">
          <button className="btn btn-primary">
            Manage Cars
          </button>
        </Link>
      </div>

      {bookings?.length === 0 ? (
        <p style={{ color: "#aaa" }}>No bookings yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1a1f2b" }}>
                <th style={{ padding: "1rem", textAlign: "left" }}>Car</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Customer</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Dates</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Location</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Status</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "1rem" }}>
                    {booking.cars?.name || "—"} ({booking.cars?.category})
                  </td>
                  <td style={{ padding: "1rem" }}>
                    {booking.customer_name}<br />
                    <small>{booking.customer_email} / {booking.customer_phone}</small>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    {new Date(booking.pickup_date).toLocaleDateString()} –<br />
                    {new Date(booking.return_date).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "1rem" }}>
                    {booking.pickup_location}
                    {booking.delivery && (
                      <>
                        <br />
                        <small>Delivery: {booking.delivery_address || "—"}</small>
                      </>
                    )}
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span
                      style={{
                        padding: "0.4rem 0.8rem",
                        borderRadius: "20px",
                        background:
                          booking.status === "pending"
                            ? "#ffaa0033"
                            : booking.status === "confirmed"
                            ? "#00ff9d33"
                            : "#ff6b6b33",
                        color:
                          booking.status === "pending"
                            ? "#ffaa00"
                            : booking.status === "confirmed"
                            ? "#00ff9d"
                            : "#ff6b6b",
                      }}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    {new Date(booking.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}