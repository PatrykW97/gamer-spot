"use client";

import AddFriend from "@/app/components/AddFriend";
import { AuthUser } from "@/app/types/AuthUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import PostElement from "@/app/components/PostElement";
type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};
export default function UserProfile(url: URL) {
     const { data, isLoading } = useQuery<AuthUser>({
    queryKey: ["detail-user"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return "Loading...";
  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <div className="flex gap-10 items-center">
        <h1 className="text-lg lg:text-2xl text-wrap text-white font-bold">
          Welcome to{" "}
          {data?.nickname ? data.nickname : data?.name} profile
        </h1>

        {data && <AddFriend userBId={data.id} />}
        </div>
        <div className="w-full lg:w-1/2 flex items-center flex-col">
        {data?.Post.map((post) => (
          <PostElement
            comments={post.Comment}
            key={post.id}
            name={data.name}
            avatar={data.image}
            postTitle={post.title}
            id={post.id}
            userId={post.userId}
            image={post.image}
            belonging={post.belonging}
          />
        ))}
        </div>
      </div>
    </div>
  );
}
