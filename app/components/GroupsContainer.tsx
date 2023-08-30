"use client";
import Link from "next/link";
import { useState } from "react";
export default function GroupsContainer() {
    
  return (
    
 
    <div className=" flex-col gap-10 w-1/4 mt-8 md:flex hidden">
      <Link className="w-1/2" href={"/groups/leagueoflegends"}>
        <p className="bg-white hover:bg-blue-300 text-[#C19639] border-2 border-[#C19639] border-l-0 font-bold rounded-e-lg md:text-xl py-4 text-center text-sm">
          League of Legends
        </p>
      </Link>
      <Link className="w-1/2" href={"/groups/valorant"}>
        <p className="bg-[#FF4655] hover:bg-red-600 font-bold border-2 border-black border-l-0 rounded-e-lg md:text-xl py-4 text-center">
          Valorant
        </p>
      </Link>
      <Link className="w-1/2" href={"/groups/csgo"}>
        <p className="bg-customBlue hover:bg-blue-700 text-[#F29A1C] border-2 border-l-0 border-[#F29A1C] md:text-xl font-bold rounded-e-lg py-4 text-center text-sm">
          CS:GO
        </p>
      </Link>
    </div>

  );
}
