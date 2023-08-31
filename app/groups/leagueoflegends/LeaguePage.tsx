"use client";
import CreatePost from "../../components/AddPost";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../../types/Posts";
import LeaguePosts from "./LeaguePosts";
import LeagueGuides from "./LeagueGuides";
import LeaguePatchNotes from "./LeaguePatchNotes";
import LeagueEvents from "./LeagueEvents";
import { useState } from "react";

const allPosts = async () => {
  const response = await axios.get("/api/posts/getLeaguePosts");
  return response.data;
};

export default function LeaguePage() {
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
    queryKey: ["league-posts"],
  });
  if (error) return "Error";
  if (isLoading) return "Loading....";
  console.log(data);
  let belonging = "league of legends";
  return (
    <div className="flex flex-col items-center justify-center">
    <div className="lg:grid grid-cols-4 items-center w-full lg:w-2/3 lg:gap-8 flex justify-evenly gap-2">
      <button className="bg-white text-[#C19639] rounded-lg shadow-xl lg:font-bold py-2 px-2" onClick={togglePatchNotesView}>Patch notes</button>
      <button className="bg-white text-[#C19639] rounded-lg shadow-xl lg:font-bold  py-2 px-4" onClick={toggleGuidesView}>Guides</button>
      <button className="bg-white text-[#C19639] rounded-lg shadow-xl lg:font-bold py-2 px-4 " onClick={toggleEventsView}>Events</button>
      <button className="bg-white text-[#C19639] rounded-lg shadow-xl lg:font-bold  py-2 px-4" onClick={togglePostView}>Posts</button>
    </div>
    {toggleEvents && <LeagueEvents/>}
    {togglePatchNotes && <LeaguePatchNotes/>}
    {toggleGuides && <LeagueGuides/>}
    {togglePosts && (
      <div className=" flex justify-center items-center flex-col w-full lg:w-1/2">
        <div className="w-full">
          <CreatePost belonging={belonging}/>
        </div>
        <div className="w-full flex flex-col items-center">
          {data?.map((post) => (
            <LeaguePosts
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
