// app/cars/[id]/page.tsx  (server component)
import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CarDetailClient from "./CarDetailClient"; // move your current client logic here

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createServerClient();

  const { data: car, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !car) {
    notFound();
  }

  return <CarDetailClient initialCar={car} />;
}