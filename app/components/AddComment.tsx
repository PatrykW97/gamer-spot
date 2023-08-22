"use client";

import { Dispatch, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type PostProps = {
  setShowAddComment: Dispatch<boolean>;
  id?: string;
};

type Comment = {
  postId?: string;
  title: string;
};
export default function AddComment({ id, setShowAddComment }: PostProps) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  let commentToastId: string;

  const { mutate } = useMutation(
    async (data: Comment) =>
      await axios.post("/api/posts/addComment", { data }),
    {
      onSuccess: (data) => {
        setTitle("");
        setIsDisabled(false);
        queryClient.invalidateQueries(["detail-post"]);
        toast.dismiss(commentToastId);
        toast.success("Added comment");
      },
      onError: (error) => {
        setIsDisabled(false);
        toast.dismiss(commentToastId);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message);
        }
      },
    }
  );
  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    setShowAddComment(false);
    commentToastId = toast.loading("Adding comment", { id: commentToastId });
    mutate({ title, postId: id });
  };

  const handleTextareaInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTitle(event.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  return (
    <form onSubmit={addComment} className="my-8">
      <h3 className="my-8">Add comment</h3>
      <div className="flex flex-col my-2">
        <textarea
          ref={textareaRef}
          onChange={handleTextareaInput}
          value={title}
          name="title"
          className="resize-none w-full p-4 text-lg rounded-md my-2 bg-gray-300"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className="text-sm bg-blue-700 text-white py-2 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add comment
        </button>
        <p
          className={`font-bold  ${
            title.length > 300 ? "text-red-700" : " text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
      </div>
    </form>
  );
}
