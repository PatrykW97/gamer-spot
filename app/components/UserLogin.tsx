'use client'

import { useState } from "react"
import {signIn} from 'next-auth/react'

export default function UserLogin(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogIn = async () =>{
        const result = await signIn('credentials',{
            redirect: false,
            email,
            password
        })
        result && result.error ? console.log(result.error) : console.log("succ")
    }
    return(
        <div className='flex flex-col items-center mt-10'>
            <input className='py-2 w-1/3 text-center' onChange={(e)=>setEmail(e.target.value)} type="text"  placeholder='email' value={email} />
            <input className='py-2 my-4 w-1/3 text-center' onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='password' value={password}/>
            <button className='p-2 mt-2 w-1/4 bg-customPurple hover:bg-green-400' onClick={handleLogIn}>Log in</button>
        </div>
    )
}