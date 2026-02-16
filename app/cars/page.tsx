// app/cars/page.tsx
import { createServerClient } from "@/lib/supabase/server";
import CarCard from "@/components/CarCard"; // assume you have this component

export default async function CarsPage() {
  const supabase = await createServerClient();

  const { data: cars, error } = await supabase
    .from("cars")
    .select("*")
    .eq("is_active", true)
    .order("price_day", { ascending: true });

  if (error) {
    console.error("Error fetching cars:", error);
    return <div>Error loading cars. Please try later.</div>;
  }

  return (
    <div className="container section">
      <div className="search-wrapper">
        {/* keep your search input – but now it's client-side filtering or add server search later */}
        <input type="text" placeholder="Search by brand, model or category..." className="search-input" />
      </div>

      <div className="cars-grid">
        {cars?.map((car: Car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {(!cars || cars.length === 0) && (
        <p style={{ textAlign: "center", color: "#aaa", margin: "4rem 0" }}>
          No cars available at the moment.
        </p>
      )}
    </div>
  );
}