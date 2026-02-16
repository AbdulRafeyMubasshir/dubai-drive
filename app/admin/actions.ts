// app/admin/actions.ts
"use server";

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addCarAction(formData: FormData) {
  const supabase = await createServerClient();

  // Parse form fields
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const price_day = Number(formData.get("price_day"));
  const price_week = Number(formData.get("price_week")) || null;
  const price_month = Number(formData.get("price_month")) || null;
  const deposit = Number(formData.get("deposit")) || 0;
  const mileage_limit = (formData.get("mileage_limit") as string) || "Unlimited";
  const engine = (formData.get("engine") as string) || null;
  const transmission = (formData.get("transmission") as string) || null;
  const seats = Number(formData.get("seats")) || null;
  const fuel_type = (formData.get("fuel_type") as string) || null;
  const insurance = (formData.get("insurance") as string) || null;

  // Basic validation
  if (!name || !category || isNaN(price_day) || price_day <= 0) {
    redirect("/admin/dashboard?error=" + encodeURIComponent("Missing or invalid required fields"));
  }

  // Handle image uploads
  const files = formData.getAll("images") as File[];
  const uploadedUrls: string[] = [];

  for (const file of files) {
    if (file.size === 0) continue;

    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `cars/${fileName}`; // folder inside bucket

    const { error: uploadError } = await supabase.storage
      .from("cars-images") // ← your bucket name
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload failed:", uploadError);
      continue;
    }

    const { data: urlData } = supabase.storage.from("cars-images").getPublicUrl(filePath);
    if (urlData.publicUrl) {
      uploadedUrls.push(urlData.publicUrl);
    }
  }

  // Insert into database
  const { error: insertError } = await supabase.from("cars").insert({
    name,
    category,
    price_day,
    price_week,
    price_month,
    deposit,
    mileage_limit,
    engine,
    transmission,
    seats,
    fuel_type,
    insurance,
    images: uploadedUrls.length > 0 ? uploadedUrls : [],
    is_active: true,
  });

  if (insertError) {
    console.error("Insert failed:", insertError);
    redirect("/admin/dashboard?error=" + encodeURIComponent(insertError.message));
  }

  // Success: refresh data
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}