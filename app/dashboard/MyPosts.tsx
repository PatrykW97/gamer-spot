"use client"
import EditPost from "./EditPost";
import { AuthUser } from "../types/AuthUser";

export default function MyPosts({data}:any) {
 
  return (
    <>
      {data?.Post?.map((post:any) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.Comment}
        />
      ))}
    </>
  );
}
