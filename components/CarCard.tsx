// components/CarCard.tsx
import Link from "next/link";
import Image from "next/image"; // optional – better performance than <img>

import { Car } from "@/types/supabase"; // or wherever you keep the Car type

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  // Use first image if available, fallback to placeholder
  const mainImage = car.images?.[0] || "/placeholder-car.jpg";

  return (
    <Link
      href={`/cars/${car.id}`}
      className="car-card"
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
        background: "#1a1f2b",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "all 0.25s ease",
        border: "1px solid #222",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "220px",
          background: "#0f121a",
        }}
      >
        <Image
          src={mainImage}
          alt={car.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
          priority={false}
          placeholder="blur"
          blurDataURL="/placeholder-car-blur.jpg" // optional small placeholder
        />
      </div>

      <div style={{ padding: "1.4rem" }}>
        <h3
          style={{
            fontSize: "1.35rem",
            margin: "0 0 0.4rem 0",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {car.name}
        </h3>

        <div
          style={{
            color: "#00d4ff",
            fontSize: "0.95rem",
            marginBottom: "0.6rem",
          }}
        >
          {car.category}
        </div>

        <div style={{ fontSize: "1.45rem", fontWeight: 700 }}>
          AED {car.price_day?.toLocaleString() || "—"}
          <span style={{ fontSize: "0.95rem", fontWeight: 400, color: "#aaa" }}>
            {" / day"}
          </span>
        </div>

        <div style={{ marginTop: "0.6rem", color: "#aaa", fontSize: "0.9rem" }}>
          Deposit: AED {car.deposit?.toLocaleString() || "—"}
        </div>
      </div>
    </Link>
  );
}