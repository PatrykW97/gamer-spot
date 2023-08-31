"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FriendType } from "../types/Friends";
import Image from "next/image";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MyPendingInvites from "./MyPendingInvites";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";
import ToggleFriendRemove from "./ToggleFriendRemove";
type SessionUserInfo = {
  user: {
    id: string;
    name: string;
    image: string;
    email: string;
  };
};

const fetcMyFriends = async () => {
  const response = await axios.get("api/posts/myConfirmedFriends");
  return response.data;
};
export default function MyFriends({ user }: SessionUserInfo) {
  const queryClient = useQueryClient();
  const [toggle, setToggle] = useState(false);
  const removeFriend = async (friendshipId: string) => {
    await axios
      .delete("api/posts/myFriends", { data: friendshipId })
      .then((response) => toast.success("Friend removed"))
      .catch((error) => toast.error("Error"));
    queryClient.invalidateQueries(["friend"]);
    setToggle(false);
  };
  const { data, isLoading } = useQuery<FriendType>({
    queryFn: fetcMyFriends,
    queryKey: ["friend"],
  });
  if (isLoading) return <h1>Loading friends...</h1>;
  return (
    <div>
      <MyPendingInvites user={user} removeFriend={removeFriend} />
      {data?.map((friend) => (
        <div className="flex justify-between bg-white py-6 px-2 rounded-lg items-center my-2 md:my-2 lg:my-8">
          {friend.userAId === user.id ? (
            <Link href={`/user/${friend.userBId}`}>
              <div className="flex items-center gap-4">
                <Image
                  className="rounded-full"
                  width={32}
                  height={32}
                  src={friend.userB.image}
                  alt="avatar"
                />
                <h1 className="font-bold py-2">{friend.userB.name}</h1>
              </div>
            </Link>
          ) : (
            <Link href={`/user/${friend.userAId}`}>
              <div className="flex items-center gap-4">
                <Image
                  className="rounded-full"
                  width={32}
                  height={32}
                  src={friend.userA.image}
                  alt="avatar"
                />
                <h1 className="font-bold py-2">{friend.userA.name}</h1>
              </div>
            </Link>
          )}
          <button
            className=" hover:bg-red-500 rounded-lg p-2 "
            onClick={(e) => setToggle(true)}
          >
            <FaXmark />
          </button>
          {toggle && (
            <ToggleFriendRemove
              removeFriend={removeFriend}
              friendId={friend.id}
              setToggle={setToggle}
            />
          )}
        </div>
      ))}
    </div>
  );
}
