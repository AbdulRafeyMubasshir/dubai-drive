import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="container hero-content">
        <h1>
          Luxury & Comfort
          <br />
          Anywhere in Dubai
        </h1>
        <p>Premium cars • Fast booking • Airport delivery</p>
        <Link href="/cars" className="btn btn-primary btn-large">
          Browse Cars Now
        </Link>
      </div>
    </section>
  );
}