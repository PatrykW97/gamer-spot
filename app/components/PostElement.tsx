import Image from "next/image";
import { useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Link from "next/link";
type PostInfo = {
  avatar: string;
  name: string;
  postTitle: string;
  id: string;
  userId: string;
  comments?: {
    createdAt?: string;
    id: string;
    postId: string;
    message?: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};

export default function PostElement({
  avatar,
  name,
  postTitle,
  id,
  comments,
  userId
}: PostInfo) {
  const [showComments, setShowComments] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const toggleCommentView = () => {
    setShowAddComment(!showAddComment);
    setShowComments(!showComments);
  };
  return (
    <div className="bg-white my-4 p-4 rounded-xl xl:w-1/3 md:w-1/2 w-3/4">
      <Link href={`/user/${userId}`}>
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
      </Link>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor items-center">
        <button onClick={toggleCommentView}>
          <p className="text-sm font-bold text-gray-700 ">
            {comments?.length} Comments
          </p>
        </button>
      </div>
      {showComments &&
        comments?.map((comment, index) => (
          <CommentList key={comment.id} comment={comment} />
        ))}
      {showAddComment && (
        <AddComment id={id} setShowAddComment={setShowAddComment} />
      )}
    </div>
  );
}
