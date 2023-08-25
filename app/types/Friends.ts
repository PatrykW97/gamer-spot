export type FriendType = {
    id: string;
    userAId: string;
    userBId: string;
    isConfirmed: boolean;
    userA:{
            email: string
            id: string
            image: string
            name: string
    }
    userB:{
      email: string
      id: string
      image: string
      name: string
    }
}[];