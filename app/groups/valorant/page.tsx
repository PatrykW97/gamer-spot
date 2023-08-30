"use client";
import CreatePost from "../../components/AddPost";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../../types/Posts";
import ValorantPosts from "./ValorantPosts";
import GroupsContainer from "@/app/components/GroupsContainer";
const allPosts = async () => {
  const response = await axios.get("/api/posts/getValorantPosts");
  return response.data;
};
export default function valorant() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["valorant-posts"],
  });
  if (error) return "Error";
  if (isLoading) return "Loading....";
  let belonging = "valorant";
  return (
    <div className=" flex justify-center items-center flex-col">
       
      <div className="w-full md:w-1/2">
        <CreatePost belonging={belonging} />
      </div>
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
  );
}
