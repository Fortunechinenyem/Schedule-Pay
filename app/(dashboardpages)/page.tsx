import { auth } from "@/lib/firebase";
import { redirect } from "next/navigation";

export default function Dashboard() {
  if (!auth.currentUser) redirect("/auth/login");

  return (
    <div className="p-6">
      <h1>Welcome, {auth.currentUser.displayName}!</h1>
      {/* Payment scheduler UI */}
    </div>
  );
}
