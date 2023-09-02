"use client";
import { useState } from "react";
import MyAccount from "./MyAccount";
import MyPosts from "./MyPosts";
import MyFriends from "./MyFriends";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthUser } from "../types/AuthUser";

const getUserInfo = async () => {
  const response = await axios.get("api/posts/authPosts");
  return response.data;
};
export default function MyDashboard({ user }: any) {
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [showMyFriends, setShowMyFriends] = useState(false);

  const { data, isLoading } = useQuery<AuthUser>({
    queryFn: getUserInfo,
    queryKey: ["user-info"],
  });
  if (isLoading) return <h1>Loading posts...</h1>;
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="flex justify-center mb-8">
        <h1 className="text-2xl text-white font-bold">Welcome {user?.name}</h1>
      </div>

      <div className="lg:grid grid-cols-3 lg:gap-10 sm:flex sm:flex-col w-3/4">
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4  mb-2 rounded w-full"
            onClick={() => setShowAccountInfo(!showAccountInfo)}
          >
            My account
          </button>
          {showAccountInfo && <MyAccount data={data} />}
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mb-2 rounded w-full"
            onClick={() => setShowMyPosts(!showMyPosts)}
          >
            My posts
          </button>
          {showMyPosts && <MyPosts data={data} />}
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mb-2 rounded w-full"
            onClick={() => setShowMyFriends(!showMyFriends)}
          >
            My friends
          </button>
          {showMyFriends && <MyFriends user={user} />}
        </div>
      </div>
    </div>
  );
}
