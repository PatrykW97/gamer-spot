"use client";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function UserRegister() {
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRepPassword, setUserRepPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRepEmail, setUserRepEmail] = useState("");
  let registerToastId: string;

  type User = {
    name: string;
    nickname: string;
    email: string;
    password: string;
  };

  const { mutate } = useMutation(
    async (data: User) => await axios.post("/api/posts/registerUser", { data }),
    {
      onSuccess: (data) => {
        toast.dismiss(registerToastId);
        toast.success("Registered");
      },
      onError: (error) => {
        toast.dismiss(registerToastId);
        if (error instanceof AxiosError) {
          toast.error("Somethink went wrong");
        }
      },
    }
  );

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if(userPassword != userRepPassword || userEmail != userRepEmail) toast.error("Please make sure that email and password are correct");
    else {
      registerToastId = toast.loading("Registering u", { id: registerToastId });
      mutate({
      name: name,
      nickname: nickName,
      email: userEmail,
      password: userPassword,
    });
    }
  };

  return (
    <form onSubmit={registerUser} className="flex flex-col items-center m-4">
      <input
        type="text"
        placeholder="User name"
        className="mb-2 w-full md:w-1/2 py-2 lg:w-1/2 rounded-t-lg"
        onChange={(e) => setName(e.target.value)}
        value={name}
      ></input>
      <input
        type="text"
        placeholder="User nickname(optional)"
        className="mb-2 w-full md:w-1/2 py-2 lg:w-1/2"
        onChange={(e) => setNickName(e.target.value)}
        value={nickName}
      ></input>
      <input
        type="password"
        placeholder="Password"
        className="mb-2 w-full md:w-1/2 py-2 lg:w-1/2"
        onChange={(e) => setUserPassword(e.target.value)}
        value={userPassword}
      ></input>
      <input
        type="password"
        placeholder=" Repeat password"
        className={`mb-2 w-full md:w-1/2 py-2 lg:w-1/2 ${userPassword!=userRepPassword ? "text-red-500 border-2 border-red-600" : "text-black" }`}
        onChange={(e) => setUserRepPassword(e.target.value)}
        value={userRepPassword}
      ></input>
      <input
        type="text"
        placeholder="Email"
        className="mb-2 w-full md:w-1/2 py-2 lg:w-1/2 "
        onChange={(e) => setUserEmail(e.target.value)}
        value={userEmail}
      ></input>
      <input
        type="text"
        placeholder="Repeat email"
        className={`mb-2 w-full py-2 md:w-1/2 lg:w-1/2 rounded-b-lg ${userEmail!=userRepEmail ? "text-red-500 border-2 border-red-600" : "text-black" }`}
        onChange={(e) => setUserRepEmail(e.target.value)}
        value={userRepEmail}
      ></input>
      <button
        type="submit"
        className=" bg-blue-500 hover:bg-blue-600 font-bold text-xl text-white  px-4 py-4 rounded-xl"
      >
        Create account!
      </button>
    </form>
  );
}
