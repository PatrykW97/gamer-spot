"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type User = {
  image: string;
};

export default function Logged({ image }: User) {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    // router.push('/')
  };
  const handleGroupSelect = (e: any) => {
    const group = e.target.value;
    if (group) router.push(group);
  };

  return (
    <div className="flex lg:gap-8 gap-2">
      <select
        onChange={handleGroupSelect}
        className="block appearance-none md:hidden  bg-blue-500  text-white p-2 rounded-xl leading-tight focus:outline-none focus:bg-blue-600 focus:border-gray-500 text-center"
      >
        <option value="">Pick a group</option>
        <option value="/">Main</option>
        <option value="/groups/valorant">Valorant</option>
        <option value="/groups/leagueoflegends">League of legends</option>
        <option value="/groups/csgo">CS:GO</option>
      </select>

      <button
        onClick={handleSignOut}
        className="bg-blue-500 hover:bg-blue-600 text-white text-lg  px-2 lg:px-6 py-2 rounded-xl"
      >
        Sign out
      </button>

      <Link href={"/dashboard"}>
        <Image
          width={64}
          height={64}
          src={image}
          className="w-12 lg:w-14 rounded-full"
          alt=""
          priority
        />
      </Link>
    </div>
  );
}
