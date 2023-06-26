import { footerLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"

type ColumnProps = {
    title: string,
    links: Array<string>
}

const FontColumn = ({title, links} : ColumnProps)=>{
    return (
        <div className="footer_column">
            <h4 className="font-semibold">{title}</h4>
            <ul className="flex flex-col gap-2 font-normal">
                {links.map(link=>(
                    <Link href={"/"} key={link}>{link}</Link>
                    ))}
            </ul>
        </div>
    )
}

export const Footer = ()=>{
    return(
        <footer className="flexStart footer">
            <div className="flex flex-col gap-12 w-full ">
                <div className="flex items-start flex-col">
                    <Image
                        src="logo-purple.svg"
                        width={115}
                        height={38}
                        alt="flexibble"
                    />
                    <p className="text-start text-sm font-normal mt-5 max-w-xs">
                        Flexibble is the world&apos;s leading community for creatives to share, grow, and get hired.
                    </p>
                </div>
                <div className="flex flex-wrap gap-12">
                    <FontColumn title={footerLinks[0].title} links={footerLinks[0].links} />
                    <div className="flex-1 flex flex-col gap-4">
                        <FontColumn title={footerLinks[1].title} links={footerLinks[1].links} />
                        <FontColumn title={footerLinks[2].title} links={footerLinks[2].links} />
                    </div>
                    <FontColumn title={footerLinks[3].title} links={footerLinks[3].links} />
                    <div className="flex-1 flex flex-col gap-4">
                        <FontColumn title={footerLinks[4].title} links={footerLinks[4].links} />
                        <FontColumn title={footerLinks[5].title} links={footerLinks[5].links} />
                    </div>
                    <FontColumn title={footerLinks[6].title} links={footerLinks[6].links} />
                </div>
            </div>
            <div className="flexBetween footer_copyright">
                <p>
                    @ 2023 flexibble. All right reserved
                </p>
                <p className="text-gray">
                    <span className="text-black">10,214</span> projects submitted
                </p>
            </div>
        </footer>
    )
}