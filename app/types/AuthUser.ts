export type AuthUser = {
  email: string;
  id: string;
  image: string;
  name: string;
  nickname: string;
  Post: {
    createdAt: string;
    id: string;
    title: string;
    userId: string;
    image?: string;
    belonging: string;
    user: {
      name: string
      image: string
      id: string
    },
    Comment?: {
      createdAt: string;
      id: string;
      postId: string;
      title: string;
      userId: string;
      user: {
        email: string;
        id: string;
        image: string;
        name: string;
      };
    }[];
  }[];
  friendshipsA: {
    id: string;
    userAId: string;
    userBId: string;
    isConfirmed: boolean;
  }[];
  friendshipsB: {
    id: string;
    userAId: string;
    userBId: string;
    isConfirmed: boolean;
  }[];
};
