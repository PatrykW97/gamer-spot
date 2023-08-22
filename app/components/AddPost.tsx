"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const quertClient = useQueryClient()
  let toastPostID: string;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  //Create a post
  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.dismiss(toastPostID);
          toast.error(error?.response?.data.message);
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.dismiss(toastPostID);
        toast.success("post has been made");
        quertClient.invalidateQueries(["posts"])
        setTitle("");
        setIsDisabled(false);
      },
    }
  );
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading("Creating your post", { id: toastPostID });
    setIsDisabled(true);
    mutate(title);
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
    <form onSubmit={submitPost} className="bg-white m-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          ref={textareaRef}
          onChange={handleTextareaInput}
          name="title"
          value={title}
          className="resize-none w-full p-4 text-lg rounded-md my-2 bg-gradient-to-tl from-blue-200 via-purple-200 to-pink-200  "
          placeholder="title"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : " text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-blue-700 text-white py-2 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Wyślij to!
        </button>
      </div>
    </form>
  );
}
