import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import MyDashboard from "./MyDashboard"
import { getServerSession } from 'next-auth/next'
export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    if(!session){
        redirect('/api/auth/signin')
    }
    return(
        <main >
            <MyDashboard session={session} />
        </main>
    )
}