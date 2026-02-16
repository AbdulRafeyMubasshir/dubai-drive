// app/actions/createBooking.ts
"use server";

import { createServerClient } from "@/lib/supabase/server";

export async function createBookingAction(formData: FormData) {
  const supabase = await createServerClient();

  const customerName   = formData.get("customer_name")   as string;
  const customerEmail  = formData.get("customer_email")  as string;
  const customerPhone  = formData.get("customer_phone")  as string;
  const pickupDate     = formData.get("pickup_date")     as string;
  const returnDate     = formData.get("return_date")     as string;
  const location       = formData.get("location")        as string;
  const delivery       = formData.get("delivery") === "true";
  const paymentMethod  = formData.get("payment_method")  as string;
  const carId          = formData.get("car_id")          as string;

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      car_id: carId,
      customer_name: customerName?.trim() || null,
      customer_email: customerEmail?.trim() || null,
      customer_phone: customerPhone?.trim() || null,
      pickup_date: pickupDate,
      return_date: returnDate,
      pickup_location: location,
      delivery,
      payment_method: paymentMethod || "Cash on Delivery",
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    console.error("Booking insert failed:", error);
    return { error: error.message };
  }

  return { success: true, bookingId: data.id };
}