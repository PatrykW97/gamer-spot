import LeaguePage from "./LeaguePage";
import { getCurrentUser } from "../../session"
import { redirect } from "next/navigation"

export default async function leagueoflegends() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/api/auth/signin')
  }
  return (
    <div>
      <LeaguePage />
    </div>
  );
}
