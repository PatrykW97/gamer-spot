

//import components
import AddPost from "./components/AddPost";
import Post from "./components/Post";
import WelcomePage from "./components/WelcomePage";

import { getServerSession } from 'next-auth/next'
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <main className="flex flex-col items-center">
      {/* Rendering components */}
      {session?.user && <AddPost />}
      {session?.user && <Post />}
      {!session && <WelcomePage />}
    </main>
  );
}
