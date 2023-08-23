

//import components
import AddPost from "./components/AddPost";
import Post from "./components/Post";
import { getServerSession } from 'next-auth/next'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import WelcomePage from "./components/WelcomePage";
export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main className="flex flex-col items-center">
      {/* Rendering components */}
      {session?.user && <AddPost />}
      {session?.user && <Post />}
      {!session && <WelcomePage />}
    </main>
  );
}
