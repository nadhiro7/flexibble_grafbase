"use client"

import {useRouter , useSearchParams , usePathname } from "next/navigation"

import { categoryFilters } from '@/constants/index'
 
function Categories() {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams =  useSearchParams()

    const category = searchParams.get('category')
    const handleTag = (filter: string)=> {
        router.push(`${pathName}?category=${filter}`)
    }

  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
        <ul className="flex gap-2 overflow-auto">
            {categoryFilters.map(filter=>(
                <button type="button" key={filter} onClick={()=>handleTag(filter)} 
                className={`${filter === category ? "bg-light-white-300 font-medium" : "font-normal"} px-4 py-3 rounded-lg capitalize whitespace-nowrap`}>
                    {filter}
                </button>
            ))}
        </ul>
    </div>
  )
}

export default Categories