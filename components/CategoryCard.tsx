import Link from "next/link";
import { Car } from "@/data/cars";

type Props = {
  title: string;
  cars: Car[];
};

export default function CategoryCard({ title, cars }: Props) {
  const first = cars[0];
  if (!first) return null;

  return (
    <Link href={`/cars?category=${title.toLowerCase()}`} className="card">
      <div
        className="card-image"
        style={{ backgroundImage: `url(${first.image})` }}
      />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{cars.length} cars available</p>
      </div>
    </Link>
  );
}