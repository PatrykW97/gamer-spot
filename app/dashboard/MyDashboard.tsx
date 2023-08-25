"use client";
import { useState } from "react";
import MyAccount from "./MyAccount";
import MyPosts from "./MyPosts";
import MyFriends from "./MyFriends";

export default function MyDashboard({ user }: any) {
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [showMyFriends, setShowMyFriends] = useState(false)

  const showInfo = () => {
    setShowAccountInfo(!showAccountInfo);
    setShowMyFriends(false)
    setShowMyPosts(false);
  };
  const showPosts = () => {
    setShowAccountInfo(false);
    setShowMyFriends(false)
    setShowMyPosts(!showMyPosts);
  };
  const showFriends = () => {
    setShowAccountInfo(false);
    setShowMyPosts(false);
    setShowMyFriends(!showMyFriends)
  };

  return (
    <div>
      <div className="flex justify-center mb-8">
        <h1 className="text-2xl text-white font-bold">
          Pronto {user?.name}
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
         <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
          onClick={showFriends}
        >
          My friends
        </button>
      </div>
      {showMyFriends && <MyFriends user={user} />}
      {showAccountInfo && <MyAccount />}
      {showMyPosts && <MyPosts />}
    </div>
  );
}
