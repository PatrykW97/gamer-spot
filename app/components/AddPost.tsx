"use client";

import { useState, useRef } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface PostData {
  belongsTo: string;
  title: string;
  image?: File;
}

export default function CreatePost({ belonging }: any) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const queryClient = useQueryClient();
  let toastPostID: string;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  //Create a post
  const { mutate } = useMutation(
    async (data: PostData) => await axios.post("/api/posts/addPost", { data }),
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
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["csgo-posts"]);
        queryClient.invalidateQueries(["league-posts"]);
        queryClient.invalidateQueries(["valorant-posts"]);
        setTitle("");
        setIsDisabled(false);
      },
    }
  );
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading("Creating your post", { id: toastPostID });
    console.log(selectedImage);

    const formData = new FormData();
    if (selectedImage) formData.append("file", selectedImage);

    formData.append("upload_preset", "user-uploads");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dk9ro1nmb/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    setIsDisabled(true);
    setSelectedImage(null);
    mutate({ title, image: data.secure_url, belongsTo: belonging });
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
  const handleImageChange = (event: any) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };
  return (
    <div className="w-full flex justify-center items center">
      <form
        onSubmit={submitPost}
        className="bg-white m-8 p-4 rounded-md xl:w-2/3 md:w-1/2 w-3/4"
      >
        <div className="flex flex-col my-4">
          <textarea
            ref={textareaRef}
            onChange={handleTextareaInput}
            name="title"
            value={title}
            className="resize-none w-full p-4 text-lg rounded-md my-2 bg-gradient-to-tl from-blue-200 via-purple-200 to-pink-200  "
            placeholder="title"
          ></textarea>
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden"
            onChange={handleImageChange}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-1/3 text-center"
          >
            {" "}
            {selectedImage ? "Image selected" : "Pick image"}
          </label>
          <div className="mt-4">
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="image preview"
                className="max-h-40 mt-2"
              />
            )}
            {selectedImage && (
              <button
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-center"
                onClick={() => setSelectedImage(null)}
              >
                Delete image{" "}
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p
            className={`font-bold text-sm ${
              title.length > 300 ? "text-red-700" : " text-gray-700"
            }`}
          >{`${title.length}/300`}</p>
          <button
            disabled={isDisabled}
            className="text-sm bg-blue-500 text-white p-2 rounded-xl disabled:opacity-25 hover:bg-green-400"
            type="submit"
          >
            Send post!
          </button>
        </div>
      </form>
    </div>
  );
}
