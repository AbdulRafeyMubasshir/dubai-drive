"use client";

import { useState } from "react";
import CarCard from "@/components/CarCard";
import { cars } from "@/data/cars";

export default function CarsPage() {
  const [search, setSearch] = useState("");

  const filtered = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(search.toLowerCase()) ||
      car.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container section">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search by brand, model or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="cars-grid">
        {filtered.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "#aaa", margin: "4rem 0" }}>
          No cars found.
        </p>
      )}
    </div>
  );
}