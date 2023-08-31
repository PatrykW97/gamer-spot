import { redirect } from "next/navigation";
import MyDashboard from "./MyDashboard";
import { getCurrentUser } from "../session";
export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/api/auth/signin");
  }
  return (
    <main>
      <MyDashboard user={user} />
    </main>
  );
}
