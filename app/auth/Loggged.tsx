"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

type User = {
    image: string
}

export default function Logged({image}:User) {
  const router = useRouter()
  
  const handleSignOut = async () => {
    await signOut() 
    // router.push('/') 
  }


  return (
    <li className="flex gap-8 items-center">
      <button
        onClick={handleSignOut}
        className="bg-blue-800 text-white text-lg px-6 py-2 rounded-xl"
      >
        Sign out
      </button>

      <Link href={"/dashboard"}>
        <Image width={64} height={64} src={image} className="w-14 rounded-full" alt="" priority />
      </Link>
    </li>
  );
}
