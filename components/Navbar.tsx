
import { NavLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import AuthProviders from "./AuthProviders"
import { GetCurrentSession } from "@/lib/session"
import ProfileMenu from './ProfileMenu'
export const Navbar =async ()=>{
    const session = await GetCurrentSession()
    return(
        <nav className="flexBetween navbar">
            <div className="flex-1 flexStart gap-10">
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        width={115}
                        height={43}
                        alt="flexibble logo"
                    />
                </Link>
                <ul className="xl:flex hidden text-small gap-7">
                    {NavLinks.map(link=>(
                        <Link href={link.href} key={link.key}>
                            {link.text}
                        </Link>
                    ))}
                </ul>
            </div>
            <div className='flexCenter gap-3'>
                {
                    session?.user ? (
                        <>
                            <ProfileMenu session={session} />
                            <Link href={"/create-project"}>
                                Share work
                            </Link>
                            {/* <button onClick={()=>signOut()} >Sign Out</button> */}
                        </>
                    ) : (<AuthProviders />)
                }
            </div>
        </nav>
    )
}