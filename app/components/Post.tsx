"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../types/Posts";
import PostElement from "./PostElement";

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPost");
  return response.data;
};

export default function Post() {

 
  //Fetching post data
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return "Error";
  if (isLoading) return "Loading....";

  return (
    <div className="flex flex-grow-2 flex-col items-center">
    
    {data?.map((post) => (
        <PostElement
          comments={post.Comment}
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
        />
      ))}
    </div>
  );
}
