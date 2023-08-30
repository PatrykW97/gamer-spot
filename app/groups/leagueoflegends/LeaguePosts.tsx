import Image from "next/image";
import { useState } from "react";
import CommentList from "../../components/CommentList";
import AddComment from "../../components/AddComment";
import Link from "next/link";
import ModalImage from "react-modal-image";

type PostInfo = {
  avatar: string;
  name: string;
  postTitle: string;
  image?: string
  id: string;
  userId: string;
  belonging: string;
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

export default function LeaguePosts({
  avatar,
  belonging,
  name,
  image,
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
    <div className="bg-gradient-to-br from-white via-white to-yellow-200 my-4 p-4 rounded-xl xl:w-2/3 md:w-1/2 w-3/4">
      <Link className="w-1/2" href={`/user/${userId}`}>
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="font-bold text-[#C19639]">{name}</h3>
          <h2 className="text-black">{belonging}</h2>
        </div>
      </Link>
      <div className="mt-8">
        <p className="break-all text-black">{postTitle}</p>
      </div>
      <div className="p-4 flex">
      {image && <ModalImage
             small={image}
             large={image}
             alt={postTitle}
             hideDownload={true}
             hideZoom={true}
             className="cursor-pointer w-1/2"
             imageBackgroundColor="transparent"
          />}
          </div>
      <div className="flex gap-4 cursor items-center">
        <button onClick={toggleCommentView}>
          <p className="text-sm font-bold text-[#C19639] ">
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
