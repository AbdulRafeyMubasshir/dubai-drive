// app/login/page.tsx
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default function AdminLogin() {
  async function loginAction(formData: FormData) {
    "use server";

    const supabase = await createServerClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      redirect(`/login?error=${encodeURIComponent(signInError.message)}`);
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      await supabase.auth.signOut();
      redirect(`/login?error=${encodeURIComponent("Failed to retrieve user")}`);
    }

    // ✅ Production-grade role check from profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || profile?.role !== "admin") {
      await supabase.auth.signOut();
      redirect(
        `/login?error=${encodeURIComponent("Not authorized as admin")}`
      );
    }

    redirect("/admin/dashboard");
  }

  return (
    <div
      className="container section"
      style={{ maxWidth: "400px", margin: "4rem auto" }}
    >
      <h1>Admin Login</h1>

      <form
        action={loginAction}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #333",
            background: "#1a1f2b",
            color: "white",
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #333",
            background: "#1a1f2b",
            color: "white",
          }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: "1rem", fontSize: "1.1rem" }}
        >
          Login
        </button>
      </form>
    </div>
  );
}