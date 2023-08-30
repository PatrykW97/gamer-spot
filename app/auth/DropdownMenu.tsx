"use client"
import Link from "next/link"

export default function DropdownMenu(){
    return(
        <select name="" id="">
        <option value="/group1"><Link href={"/groups/valorant"}><div>Grupa 1</div></Link></option>
         <option value="/group2">Grupa 2</option>
       </select>
    )
}