"use client";
import { useState } from "react";
import MyAccount from "./MyAccount";
import MyPosts from "./MyPosts";
import MyFriends from "./MyFriends";

export default function MyDashboard({ user }: any) {
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [showMyFriends, setShowMyFriends] = useState(false);

  const showInfo = () => {
    setShowAccountInfo(!showAccountInfo);
  };
  const showPosts = () => {
    setShowMyPosts(!showMyPosts);
  };
  const showFriends = () => {
    setShowMyFriends(!showMyFriends);
  };

  return (
    <div>
      <div className="flex justify-center mb-8">
        <h1 className="text-2xl text-white font-bold">Pronto {user?.name}</h1>
      </div>

      <div className="grid grid-cols-4 gap-10">
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
            onClick={showInfo}
          >
            My account
          </button>
          {showAccountInfo && <MyAccount />}
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
            onClick={showPosts}
          >
            My posts
          </button>
          {showMyPosts && <MyPosts />}
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
            onClick={showFriends}
          >
            My friends
          </button>
          {showMyFriends && <MyFriends user={user} />}
        </div>
        <div>
        <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
            onClick={showInfo}
          >
            My groups
          </button>
          {showAccountInfo && <MyAccount />}
        </div>
        
      </div>
    </div>
  );
}
//grid gap-4 grid-cols-3 grid-rows-3
//flex items-center justify-center space-x-4
