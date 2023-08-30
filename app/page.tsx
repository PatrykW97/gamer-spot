

//import components
import CreatePost from "./components/AddPost";
import Post from "./components/Post";
import WelcomePage from "./components/WelcomePage";
import GroupsContainer from "./components/GroupsContainer";
import { getCurrentUser } from "./session"
import { useState } from "react";
export default async function Home() {

  const user = await getCurrentUser()
  return (
    <main className="flex flex-start">
      {user&& <GroupsContainer />} 
      {user &&  
      <div className="w-full md:w-1/2 ">
        <div className="flex justify-center items-center w-full">
          <CreatePost />
        </div>
       <Post />
      </div>
      }
      {!user &&<div className="flex justify-center items-center w-full"> <WelcomePage /></div>}
      
      
    </main>
  );
}
