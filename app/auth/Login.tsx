'use client'

import {signIn} from 'next-auth/react'

export default function Login(){
    return(
    <li className='list-none'>
        <button onClick={()=>signIn()}className=" font-bold text-lg bg-customPurple hover:bg-blue-800 text-white py-2 px-6 rounded-xl disabled:opacity-25 hover:bg-green-400">
            Sign in!
        </button>
    </li>
    )
}