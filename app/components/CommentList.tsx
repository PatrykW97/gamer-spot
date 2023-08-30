"use client";
import Toggle from "./Toggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

type CommentInfo = {
  comment: {
    createdAt?: string;
    id: string;
    postId: string;
    message?: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  };
};

const fetchAuthPost = async () => {
  const response = await axios.get("api/posts/manageComments");
  return response.data;
};

export default function CommentList({ comment }: CommentInfo) {
  const { data, isLoading } = useQuery({
    queryFn: fetchAuthPost,
    queryKey: ["auth-comment"],
  });
  const [toggle, setToggle] = useState(false);
  let deleteToastID: string;
  const queryClient = useQueryClient();
  
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/manageComments", { data: id }),
    {
      onError: (error) => {
        toast.dismiss(deleteToastID);
        toast.error("Error deleting comment");
      },
      onSuccess: (data) => {
        toast.dismiss(deleteToastID);
        toast.success("Comment has been deleted");
        queryClient.invalidateQueries(["post"]);
      },
    }
  );
  const deleteComment = () => {
    deleteToastID = toast.loading("Deleting your comment", {
      id: deleteToastID,
    });
    mutate(comment.id);
    setToggle(false);
  };
  
  return (
    <>
      <div className="comment-list py-4 ">
        <div className="py-4 bg-gray-300 flex justify-between rounded-md group">
        <div className="flex justify-evenly items-center"><Image
            width={32}
            height={32}
            src={comment.user?.image}
            alt="avatar"
            className="mx-4 rounded-full"
            
          />
          <p className="px-4">{comment?.message}</p>
          </div>
          
          {comment.userId === data?.id && (
            <button
              onClick={(e) => setToggle(true)}
              className=" font-bold opacity-0 group-hover:opacity-100 text-red-400 rounded cursor-pointer"
            >
              Delete
            </button>
          )}
          
        </div>
        
      </div>
      {toggle && <Toggle deleteComment={deleteComment} setToggle={setToggle} />}
    </>
  );
}
