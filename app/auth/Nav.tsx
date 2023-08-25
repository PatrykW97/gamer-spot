
import Link from "next/link"
import Login from "./Login"
import Logged from "./Loggged"
import { getCurrentUser } from "../session"
export default async function Nav() {

    const user = await getCurrentUser()

    return(
    <nav className="flex justify-evenly items-center py-8">
        <Link href={'/'}>
        <h1 className="font-bold text-2xl text-white py-2 shadow-xl px-2">Gamer Spot.</h1>
        </Link>
        <ul className="flex items-center gap-6">
            {!user && <Login />}
            {user && <Logged image={user?.image || ''} />}
        </ul>
    </nav>
    )
}