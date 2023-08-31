"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
export default function WelcomePage() {
  return (
    <div>
      <div className="flex items-center justify-center flex-col bg-white bg-opacity-20 pb-10 lg:pb-20 px-4 text-center">
        <h1 className="font-bold text-2xl text-white py-10 ">
          Hey there fellow gamer!
        </h1>
        <p className="font-bold text-lg text-white">Welcome to Gamer Spot</p>
        <p className="font-bold text-lg text-white">
          A site where you can find your favorite games and friends to share
          your achivements, thoughts and ideas
        </p>
        <p className="font-bold text-lg text-white">
          Add friends, join groups, comment posts and enjoy the only space
          dedicated for gamers
        </p>
      </div>
      <UserRegister />
    </div>
  );
}
