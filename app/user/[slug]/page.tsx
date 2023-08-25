"use client"
import AddComment from "@/app/components/AddComment";
import AddFriend from "@/app/components/AddFriend";

import Post from "@/app/components/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

type URL = {
  params: {
    slug: string,
  },
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};
export default function UserDetail(url:URL) {
  const { data, isLoading } = useQuery({
    queryKey: ["detail-user"],
    queryFn: () => fetchDetails(url.params.slug),
  });

  if (isLoading) return "Loading...";

  return (
    <div>
      <div className="flex justify-center mb-8">
        <h1 className="text-2xl text-white font-bold">Witaj na profilu użytkownika {data.name}</h1>
        <AddFriend  userBId={data.id}/>
      </div>
    </div>
  );
}