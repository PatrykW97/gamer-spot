"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
export default function GroupsContainer() {
  return (
    <div className=" flex-col gap-10 w-1/4 mt-8 xl:flex hidden">
      <Link className="w-1/2" href={"/groups/leagueoflegends"}>
        <p className="bg-white  text-[#C19639] border-2 border-[#C19639] border-l-0 font-bold rounded-e-lg md:text-md lg:text-lg py-4 text-center text-sm flex items-center justify-center  gap-6">
          <Image
            className=""
            width={32}
            height={32}
            src={
              "https://res.cloudinary.com/dk9ro1nmb/image/upload/v1693438777/pngwing_iuhdk2.png"
            }
            alt="avatar"
          />
          League of Legends
        </p>
      </Link>
      <Link className="w-1/2" href={"/groups/valorant"}>
        <p className="bg-[#FF4655]  font-bold border-2 border-black border-l-0 rounded-e-lg md:text-md lg:text-lg py-4 text-center flex items-center justify-center  gap-6">
          <Image
            className=""
            width={32}
            height={32}
            src={
              "https://res.cloudinary.com/dk9ro1nmb/image/upload/v1693437588/user-uploads/pmwezr2dlh68qyrvsoyu.svg"
            }
            alt="avatar"
          />
          Valorant
        </p>
      </Link>
      <Link className="w-1/2" href={"/groups/csgo"}>
        <p className="bg-customBlue  text-[#F29A1C] border-2 border-l-0 border-[#F29A1C] md:text-md lg:text-lg font-bold rounded-e-lg py-4 text-center text-sm flex items-center justify-center  gap-6">
          <Image
            className=""
            width={28}
            height={28}
            src={
              "https://res.cloudinary.com/dk9ro1nmb/image/upload/v1693438549/pngegg_wvlytl.png"
            }
            alt="avatar"
          />
          CS:GO
        </p>
      </Link>
    </div>
  );
}
