'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FriendType } from "../types/Friends";
type SessionUserInfo = {
    user:{
    id: string
    name: string
    image: string
    email: string
    }
}
const fetchAuthPost = async () => {
    const response = await axios.get("api/posts/myFriends");
    return response.data;
  };
export default function MyFriends({user}:SessionUserInfo){

    const { data, isLoading } = useQuery<FriendType>({
        queryFn: fetchAuthPost,
        queryKey: ["friend"],
      });
      if (isLoading) return <h1>Loading posts...</h1>;
      console.log(data)
    return(
        <div>
            {data?.map((friend)=>(
                <div>
                    <h1>{friend.userB.name}</h1>
                    {friend.isConfirmed===false && friend.userAId===user.id ? <h1>Waiting for acceptation</h1> : <h1>Zaakceptuj zaproszenie albo wypierdol</h1>}
                    
                </div>
            ))}
        </div>
    )
}