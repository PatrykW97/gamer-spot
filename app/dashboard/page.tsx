import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import MyPosts from "./MyPosts"
import { getServerSession } from 'next-auth/next'
export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    if(!session){
        redirect('/api/auth/signin')
    }
    return(
        <main >
            <h1 className="text-2xl text-white font-bold">Pronto {session?.user?.name}</h1>
            <MyPosts />
        </main>
    )
}