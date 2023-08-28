"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FriendType } from "../types/Friends";
import Image from "next/image";
type SessionUserInfo = {
  user: {
    id: string;
    name: string;
    image: string;
    email: string;
  };
};
const fetcMyFriends = async () => {
  const response = await axios.get("api/posts/myFriends");
  return response.data;
};
export default function MyFriends({ user }: SessionUserInfo) {
  const { data, isLoading } = useQuery<FriendType>({
    queryFn: fetcMyFriends,
    queryKey: ["friend"],
  });
  if (isLoading) return <h1>Loading friends...</h1>;
  console.log(data);
  return (
    <div>
      {data?.map((friend) => (
        <div className="flex justify-between bg-white my-8 p-8 rounded-lg items-center">
        <div className="flex items-center gap-4">
            {friend.userAId === user.id}
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={friend.userB.image}
            alt="avatar"
          />
          <h1 className="font-bold">{friend.userB.name}</h1>
          </div>
          {friend.isConfirmed === false && friend.userAId === user.id ? (
            <h1>Waiting for acceptation</h1>
          ) : (
            <h1>Accept friend</h1>
          )}
        </div>
      ))}
    </div>
  );
}
