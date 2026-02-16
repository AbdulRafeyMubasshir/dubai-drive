// app/login/page.tsx
import { createServerClient } from "@/lib/supabase/server"; // your async version
import { redirect } from "next/navigation";

export default function AdminLogin() {
  async function loginAction(formData: FormData) {
    "use server";

    // Await the async client creation
    const supabase = await createServerClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      // For error handling in Server Actions: redirect back with search params
      // (or use revalidatePath + state, but redirect is simplest for login)
      redirect(`/login?error=${encodeURIComponent(signInError.message)}`);
    }

    // Get user (session is now set)
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      await supabase.auth.signOut();
      redirect(`/login?error=${encodeURIComponent("Failed to retrieve user")}`);
    }

    // Check role – note: user_metadata.role is NOT standard; better to use a profiles table
    // For now assuming you added role to user_metadata or auth.users table
    const role = user.user_metadata?.role as string | undefined;

    if (role !== "admin") {
      await supabase.auth.signOut();
      redirect(`/login?error=${encodeURIComponent("Not authorized as admin")}`);
    }

    // Success → redirect to dashboard
    redirect("/admin/dashboard");
  }

  return (
    <div className="container section" style={{ maxWidth: "400px", margin: "4rem auto" }}>
      <h1>Admin Login</h1>

      {/* Optional: show error from URL */}
      {/* You can read search params in a client component if needed, or just use alert/redirect feedback */}

      <form action={loginAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #333", background: "#1a1f2b", color: "white" }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #333", background: "#1a1f2b", color: "white" }}
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