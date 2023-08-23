"use client";

import Image from "next/image";
import { useState } from "react";
import Toggle from "./Toggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import CommentList from "../components/CommentList";
import AddComment from "../components/AddComment";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
    user: {
        email: string;
        id: string;
        image: string;
        name: string;
      };
  }[];
};
export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  const [showComments, setShowComments] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [toggle, setToggle] = useState(false);
  let deleteToastID: string;
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: id }),
    {
      onError: (error) => {
        toast.dismiss(deleteToastID);
        toast.error("Error deleting post");
      },
      onSuccess: (data) => {
        toast.dismiss(deleteToastID);
        toast.success("Post has been deleted");
        queryClient.invalidateQueries(["auth-posts"]);
      },
    }
  );
  const deletePost = () => {
    deleteToastID = toast.loading("Deleting your post", { id: deleteToastID });
    mutate(id);
  };

  const toggleCommentView = () => {
    setShowAddComment(!showAddComment);
    setShowComments(!showComments);
  };
  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex gap-4 cursor items-center">
          <button onClick={toggleCommentView}>
            <p className="text-sm font-bold text-gray-700">
              {comments?.length} Comments
            </p>
          </button>
          <button onClick={(e)=> setToggle(true)} className="text-sm font-bold text-red-500" >Delete</button>
        </div>
        {showComments &&
          comments?.map((comment, index) => (
            <CommentList key={comment.id} comment={comment} />
          ))}
        {showAddComment && (
          <AddComment id={id} setShowAddComment={setShowAddComment} />
        )}
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
