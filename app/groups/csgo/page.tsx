import CsgoPage from "./CsgoPage";
import { getCurrentUser } from "../../session";
import { redirect } from "next/navigation";

export default async function CSGO() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <CsgoPage />
    </div>
  );
}
