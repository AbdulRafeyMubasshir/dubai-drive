// types/supabase.ts  (or keep in data/cars.ts for now)
export type Car = {
    id: string;                    // uuid from supabase
    name: string;
    category: string;
    price_day: number;
    price_week: number;
    price_month: number;
    deposit: number;
    mileage_limit: string;
    engine: string | null;
    transmission: string | null;
    seats: number | null;
    fuel_type: string | null;
    insurance: string | null;
    images: string[];              // array of public URLs
    video_url: string | null;
    created_at: string;
    updated_at: string;
    is_active: boolean;
  };