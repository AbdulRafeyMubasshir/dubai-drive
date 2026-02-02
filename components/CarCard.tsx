import Link from "next/link";
import { Car } from "@/data/cars";

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/cars/${car.id}`} className="card">
      <div className="card-image" style={{ backgroundImage: `url(${car.image})` }} />
      <div className="card-content">
        <h3>{car.name}</h3>
        <div style={{ color: "#00d4ff", margin: "0.4rem 0" }}>{car.category}</div>
        <div className="price">
          AED {car.priceDay} <small>/ day</small>
        </div>
      </div>
    </Link>
  );
}