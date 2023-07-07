

import { Fragment } from 'react'
import { Menu } from '@headlessui/react'
import Image from 'next/image'

type Props ={
    title: string,
    filters: Array<string>,
    state: string,
    setState: (value:string)=>{}
}
function CustomMenu({title,filters,state,setState}:Props) {
  return (
    <div className='flexStart flex-col w-full mt-7 gap-2 relative'>
        <label className='w-full text-gray-100' htmlFor={title}>
            {title}
        </label>
        <Menu as='div' className='self-start relative'>
            <div>
                <Menu.Button>
                    {state || "Select a category"}
                    <Image
                        src="/arrow-down.svg"
                        width={10}
                        height={5}
                        alt='Arrow down'
                    />
                </Menu.Button>
            </div>
            <Menu.Items className='flexStart custom_menu-items'>
                {filters.map(tag=>(
                    <Menu.Item key={tag}>
                        <button type='button' value={tag} className='custom_menu-item' 
                            onClick={(e)=>setState(e.currentTarget.value)}
                        >
                            {tag}
                        </button>
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    </div>
  )
}

export default CustomMenu