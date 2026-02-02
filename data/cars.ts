export type Car = {
  id: number;
  name: string;
  category: string;
  priceDay: number;
  priceWeek: number;
  deposit: number;
  mileage: string;
  engine: string;
  transmission: string;
  seats: number;
  fuel: string;
  image: string;
};

export const cars: Car[] = [
  { id: 1, name: "Nissan Sunny", category: "Economy", priceDay: 120, priceWeek: 700, deposit: 1000, mileage: "Unlimited", engine: "1.6L", transmission: "Automatic", seats: 5, fuel: "Petrol", image: "https://images.unsplash.com/photo-1502877338535-766e3a6052c0?w=800" },
  { id: 2, name: "Toyota Yaris", category: "Economy", priceDay: 135, priceWeek: 780, deposit: 1200, mileage: "Unlimited", engine: "1.5L", transmission: "CVT", seats: 5, fuel: "Petrol", image: "https://images.unsplash.com/photo-1621007947385-a29bf4fde345?w=800" },
  { id: 3, name: "Toyota Land Cruiser", category: "SUV", priceDay: 380, priceWeek: 2200, deposit: 3000, mileage: "250 km/day", engine: "4.0L V6", transmission: "Automatic", seats: 7, fuel: "Petrol", image: "https://images.unsplash.com/photo-1502489597346-d8389a6b1f5d?w=800" },
  { id: 4, name: "Lamborghini Huracán", category: "Luxury", priceDay: 3200, priceWeek: 18500, deposit: 15000, mileage: "100 km/day", engine: "5.2L V10", transmission: "Dual-clutch", seats: 2, fuel: "Petrol", image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800" },
  { id: 5, name: "Rolls-Royce Cullinan", category: "Luxury", priceDay: 4800, priceWeek: 28000, deposit: 25000, mileage: "100 km/day", engine: "6.75L V12", transmission: "Automatic", seats: 5, fuel: "Petrol", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800" },
  { id: 6, name: "Tesla Model Y", category: "Electric", priceDay: 520, priceWeek: 3100, deposit: 2000, mileage: "Unlimited", engine: "Dual Motor", transmission: "Automatic", seats: 5, fuel: "Electric", image: "https://images.unsplash.com/photo-1617788138017-80b7431e2d7c?w=800" },
  // ... add more later
];