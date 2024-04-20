'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
    const [notes, setNotes] = useState(null)
    const[search, setSearch] = useState("")
    const supabase = createClient()

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('notes').select()
            setNotes(data)
        }
        getData()
    }, [])

    const getTextFromInput =(query , array)=>{
        if(!query){return array}

        return array.filter((item) => item.title.includes(query))

    }

    const getText =(event)=>{
setSearch(event.target.value)
    }

    const filterArrayText =  getTextFromInput(search, notes)
    return <>
        <div className='flex  mt-5 mb-5 '>
            <input onChange={getText} placeholder='insertar busqueda' className='p-2 text-black' /> <button className='bg-slate-700 p-2 hover:bg-slate-900'>Submit</button>
        </div>
        <ol >
            {filterArrayText && filterArrayText?.map((item) => (
                <li className=" text-black bg-neutral-300 p-6   rounded-md mb-3 hover:bg-slate-500 " key={item.id}>
                    {item.title}
                </li>
            ))
            }
        </ol>
    </>
}