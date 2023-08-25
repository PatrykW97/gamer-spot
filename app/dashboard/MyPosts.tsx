import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";
import EditPost from "./EditPost";

const fetchAuthPost = async () => {
  const response = await axios.get("api/posts/authPosts");
  return response.data;
};
export default function MyPosts() {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPost,
    queryKey: ["auth-posts"],
  });
  if (isLoading) return <h1>Loading posts...</h1>;

  return (
    <>
      {data?.Post?.map((post) => (
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
