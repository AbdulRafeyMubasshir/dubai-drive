// app/admin/layout.tsx
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If not logged in → redirect to login
  if (!user) {
    redirect("/login");
  }

  // Optional: stricter role check
  // Note: user_metadata.role is not standard — better use profiles table in production
  const role = user.user_metadata?.role as string | undefined;

  if (role !== "admin") {
    // Logout and redirect
    await supabase.auth.signOut();
    redirect("/login?error=not-admin");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f121a" }}>
      <header
        style={{
          background: "#1a1f2b",
          padding: "1rem 0",
          borderBottom: "1px solid #222",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Link href="/admin/dashboard" style={{ textDecoration: "none" }}>
              <h2 style={{ margin: 0, color: "#00d4ff" }}>Dubai Drive Admin</h2>
            </Link>
            <small style={{ color: "#aaa" }}>Manage cars & bookings</small>
          </div>

          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <span style={{ color: "#ccc" }}>
              {user.email} {role === "admin" && "(Admin)"}
            </span>

            <form
              action={async () => {
                "use server";
                const supabase = await createServerClient();
                await supabase.auth.signOut();
                redirect("/login");
              }}
            >
              <button type="submit" className="btn btn-outline">
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container section" style={{ paddingTop: "2rem" }}>
        {children}
      </main>
    </div>
  );
}