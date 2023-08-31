"use client";

import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

type userIdType = {
  userBId: string;
};
export default function AddFriend({ userBId }: userIdType) {
  let toastFrientID: string;

  const { mutate } = useMutation(
    async (userBId: string) =>
      await axios.post("/api/posts/createFriendship", { userBId }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.dismiss(toastFrientID);
          toast.error(error?.response?.data.message);
        }
      },
      onSuccess: (data) => {
        toast.dismiss(toastFrientID);
        toast.success("Friendship request created!");
      },
    }
  );
  const createFriendship = async () => {
    toastFrientID = toast.loading("Creating your request", {
      id: toastFrientID,
    });
    mutate(userBId);
  };
  return (
    <div>
      <button onClick={createFriendship}>Add friend</button>
    </div>
  );
}
