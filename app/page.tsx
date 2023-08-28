

//import components
import AddPost from "./components/AddPost";
import Post from "./components/Post";
import WelcomePage from "./components/WelcomePage";

import { getCurrentUser } from "./session"

export default async function Home() {
  const user = await getCurrentUser()
  console.log(user)
  return (
    <main className="flex flex-col items-center">
      {/* Rendering components */}
      {user && <AddPost />}
      {user && <Post />}
      {!user && <WelcomePage />}
    </main>
  );
}
