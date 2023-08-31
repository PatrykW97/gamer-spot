"use client";
import CreatePost from "../../components/AddPost";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../../types/Posts";
import ValorantPosts from "./ValorantPosts";
import ValorantEvents from "./ValorantEvents";
import ValorantGuides from "./ValorantGuides";
import ValorantPatchNotes from "./ValorantPatchNotes";

import { useState } from "react";

const allPosts = async () => {
  const response = await axios.get("/api/posts/getValorantPosts");
  return response.data;
};
export default function ValorantPage() {
  const [togglePatchNotes, setTogglePatchNotes] = useState(false);
  const [toggleGuides, setToggleGuides] = useState(false);
  const [toggleEvents, setToggleEvents] = useState(false);
  const [togglePosts, setTogglePosts] = useState(true);

  const togglePatchNotesView = ()=>{
    setTogglePatchNotes(true)
    setToggleGuides(false)
    setTogglePosts(false)
    setToggleEvents(false)
  }
  const toggleGuidesView = ()=>{
    setTogglePatchNotes(false)
    setToggleGuides(true)
    setTogglePosts(false)
    setToggleEvents(false)
  }
  const toggleEventsView = ()=>{
    setTogglePatchNotes(false)
    setToggleGuides(false)
    setTogglePosts(false)
    setToggleEvents(true)
  }
  const togglePostView = ()=>{
    setTogglePatchNotes(false)
    setToggleGuides(false)
    setTogglePosts(true)
    setToggleEvents(false)
  }
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["valorant-posts"],
  });
  if (error) return "Error";
  if (isLoading) return "Loading....";
  let belonging = "valorant";
  return (
    <div className="flex flex-col items-center justify-center">
    <div className="lg:grid grid-cols-4 items-center w-full lg:w-2/3 lg:gap-8 flex justify-evenly gap-2">
      <button className="bg-white text-[#FF4655] shadow-xl rounded-lg lg:font-bold py-2 px-2" onClick={togglePatchNotesView}>Patch notes</button>
      <button className="bg-white text-[#FF4655] shadow-xl rounded-lg lg:font-bold  py-2 px-4" onClick={toggleGuidesView}>Guides</button>
      <button className="bg-white text-[#FF4655] shadow-xl rounded-lg lg:font-bold py-2 px-4 " onClick={toggleEventsView}>Events</button>
      <button className="bg-white text-[#FF4655] shadow-xl rounded-lg lg:font-bold  py-2 px-4" onClick={togglePostView}>Posts</button>
    </div>
    {toggleEvents && <ValorantEvents/>}
    {togglePatchNotes && <ValorantPatchNotes/>}
    {toggleGuides && <ValorantGuides/>}
    {togglePosts && (
      <div className=" flex justify-center items-center flex-col w-full lg:w-1/2">
        <div className="w-full">
          <CreatePost belonging={belonging}/>
        </div>
        <div className="w-full flex flex-col items-center">
          {data?.map((post) => (
            <ValorantPosts
              comments={post.Comment}
              key={post.id}
              name={post.user.name}
              avatar={post.user.image}
              postTitle={post.title}
              id={post.id}
              userId={post.user.id}
              image={post.image}
              belonging={post.belonging}
            />
          ))}
        </div>
      </div>
    )}
  </div>
  );
}
