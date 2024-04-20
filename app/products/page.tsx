"use client"

import { useEffect, useState } from "react"
import producList from "../actions/read-product"
import { createClient } from '@/utils/supabase/client'
import { searchProduct } from "../actions/search"
import SimpleSlider from "./simple-slider/page"

const Producst = () => {
    const supabase = createClient()

    const [products, setProducts] = useState<any>([])
    const [searchProductValue, setSearchProductValue] = useState("")

    const sendSerachProduct = () => {

        if (!searchProduct) {
            console.log("Añade un producto")
            return
        } else {
            let response = searchProduct(searchProductValue)

            console.log("Response query ==>", response)


            response.then((item)=>{
                setProducts(item)
            })

        }
    }


    useEffect(() => {
        const getData = async () => {
            const dataResult = await producList();

            setProducts(dataResult.products || [])

            if (dataResult.error) {
                alert(dataResult.error.message)
            }
        }
        getData()
    }, [])

    return (
        <div className=" flex flex-col justify-center content-center items-center ">

            <input onChange={(e: any) => { setSearchProductValue(e.target.value) }} type="text" className="mt-4 mb-2 w-2/4 rounded-lg p-1 text-black" />
            <button onClick={sendSerachProduct}   className="bg-slate-600 p-2 mb-2 rounded-md hover:bg-slate-800 hover:text-white transition">Enviar</button>
           
           
            <SimpleSlider widthCarrousel={300} heightCarrousel={400} items={products}/>
           
            {products.map((item: any, index: number) => (
                <div className="bg-slate-300 rounded-lg text-black mt-8 p-4 flex  content-center justify-between mb-4 w-2/4 " key={index}>

                    <div>
                        <p className="text-3xl capitalize">{item.name}</p>
                        <p>${item.price}</p>
                        <p className=" pt-2   text-balance ">{item.description}</p>
                        <p className="bg-slate-800 text-white rounded-md p-2 w-16 ">{item.categorie}</p>
                    </div>
                    <div className="pl-3 w-1/2  flex content-center justify-center  ">
                        <img className="" src={item.image} alt={`image of the product${item.name}`} />
                    </div>

                </div>
            ))}

        </div>
    )
}

export default Producst;