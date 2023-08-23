"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";
import MyAccount from "./MyAccount";
import MyPosts from "./MyPosts";

export default function MyDashboard({ session }: any) {
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);

  const showInfo = () => {
    setShowAccountInfo(!showAccountInfo);
    setShowMyPosts(false);
  };
  const showPosts = () => {
    setShowAccountInfo(false);
    setShowMyPosts(!showMyPosts);
  };

  return (
    <div>
      <div className="flex justify-center mb-8">
        <h1 className="text-2xl text-white font-bold">
          Pronto {session?.user?.name}
        </h1>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
          onClick={showPosts}
        >
          My posts
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
          onClick={showInfo}
        >
          My account
        </button>
      </div>

      {showAccountInfo && <MyAccount />}
      {showMyPosts && <MyPosts />}
    </div>
  );
}
