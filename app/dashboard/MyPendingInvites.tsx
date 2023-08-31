import Image from "next/image";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FriendType } from "../types/Friends";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";

type SessionUserInfo = {
  user: {
    id: string;
    name: string;
    image: string;
    email: string;
  };
  removeFriend: (friendshipId: string) => void;
};
const fetchPendingInvites = async () => {
  const response = await axios.get("api/posts/myFriends");
  return response.data;
};

export default function MyPendingInvites({
  user,
  removeFriend,
}: SessionUserInfo) {
  let toastFriendID: string;
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (friendshipId: string) =>
      await axios.put("/api/posts/myFriends", { friendshipId }),
    {
      onError: (error) => {
        toast.dismiss(toastFriendID);
        toast.error("Error adding friend");
      },
      onSuccess: (data) => {
        toast.dismiss(toastFriendID);
        toast.success("Friend added");
        queryClient.invalidateQueries(["friend-invites"]);
        queryClient.invalidateQueries(["friend"]);
      },
    }
  );
  const addFriend = async (friendshipId: string) => {
    toastFriendID = toast.loading("Adding friend", { id: toastFriendID });
    mutate(friendshipId);
  };

  const { data, isLoading } = useQuery<FriendType>({
    queryFn: fetchPendingInvites,
    queryKey: ["friend-invites"],
  });
  if (isLoading) return <h1>Loading friends...</h1>;

  return (
    <div>
      {data?.map((friend) => (
        <div className=" bg-white flex justify-between items-center py-2 px-2 mt-2 lg:mt-8 rounded-lg flex-col 2xl:flex-row lg:flex-col">
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
                <h1 className="font-bold">{friend.userB.name}</h1>
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
                <h1 className="font-bold">{friend.userA.name}</h1>
              </div>
            </Link>
          )}

          {friend.isConfirmed === false && friend.userAId === user.id ? (
            <div className=" flex items-center justify-center">
              <p className="text-sm">Waiting for acceptation</p>
              <button
                className=" hover:bg-red-500 rounded-lg p-2"
                onClick={() => removeFriend(friend.id)}
              >
                <FaXmark />
              </button>
            </div>
          ) : (
            <div className="w-1/3 flex justify-between">
              <button
                onClick={() => addFriend(friend.id)}
                className="hover:bg-green-200 rounded-lg w-1/2 py-2"
              >
                Add
              </button>
              <button
                className="hover:bg-red-200 rounded-lg w-1/2"
                onClick={() => removeFriend(friend.id)}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
