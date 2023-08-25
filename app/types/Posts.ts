export type PostType = {
    title: string
    id: string
    createdAt?: string
    user: {
        name: string
        image: string
        id: string
    }
    Comment?:{
        createdAt?: string
        id: string
        message?: string
        postId: string
        userId: string
        user: {
            email: string;
            id: string;
            image: string;
            name: string;
          };
    }[]
}