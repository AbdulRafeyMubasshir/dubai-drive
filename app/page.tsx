import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import { cars } from "@/data/cars";

export default function Home() {
  const economy = cars.filter((c) => c.category === "Economy");
  const suv = cars.filter((c) => c.category === "SUV");
  const luxury = cars.filter((c) => c.category === "Luxury");
  const electric = cars.filter((c) => c.category === "Electric");

  return (
    <>
      <Hero />

      <section className="container section">
        <h2 className="section-title">Popular Categories</h2>
        <div className="categories-grid">
          <CategoryCard title="Economy" cars={economy} />
          <CategoryCard title="SUV" cars={suv} />
          <CategoryCard title="Luxury" cars={luxury} />
          <CategoryCard title="Electric" cars={electric} />
        </div>
      </section>

      <section className="container section" style={{ textAlign: "center" }}>
        <h2>Ready to drive in style?</h2>
        <a href="/cars" className="btn btn-primary btn-large" style={{ marginTop: "1.5rem" }}>
          View All Cars
        </a>
      </section>
    </>
  );
}