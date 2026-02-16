// lib/supabase/server.ts
import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { CookieOptions } from "@supabase/ssr"; // for better typing

export async function createServerClient() {
  const cookieStore = await cookies(); // ← Now async + await

  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // In Next.js 15+, cookieStore supports .getAll()
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            // The set method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
            console.warn("Cookie set ignored in Server Component:", error);
          }
        },
      },
    }
  );
}