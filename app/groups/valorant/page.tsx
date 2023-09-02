import ValorantPage from "./ValorantPage";
import { getCurrentUser } from "../../session"
import { redirect } from "next/navigation"

export default async function valorant() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/api/auth/signin')
  }
  return (
    <div>
      <ValorantPage />
    </div>
  );
}
