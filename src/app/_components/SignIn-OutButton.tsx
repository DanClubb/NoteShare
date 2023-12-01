import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";



export default async function SignInOutButton() {
    const session = await getServerAuthSession();
    return (
        <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className=" rounded-full bg-white/10 ml-auto px-10 py-3 bg-orange-300 font-semibold no-underline transition hover:bg-orange-200"
            >
              {session ? "Sign out" : "Sign in"}
        </Link>
    )
}
