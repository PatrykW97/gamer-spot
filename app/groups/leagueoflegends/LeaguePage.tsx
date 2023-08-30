"use client";
import CreatePost from "../../components/AddPost";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../../types/Posts";
import LeaguePosts from "./LeaguePosts";
const allPosts = async () => {
  const response = await axios.get("/api/posts/getLeaguePosts");
  return response.data;
};

export default function LeaguePage() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["league-posts"],
  });
  if (error) return "Error";
  if (isLoading) return "Loading....";
  console.log(data);
  let belonging = "league of legends";
  return (
    <div className=" flex justify-center items-center flex-col">
      <div className="w-1/2">
        <CreatePost belonging={belonging} />
      </div>
      <div className="w-1/2 flex flex-col items-center">
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
  );
}
