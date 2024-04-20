"use client"
import React, { useState,useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import sendData from '../actions/send-product'
import GetUserSession from '../actions/getUserSession'

const SaveProduct = () => {
    // interface Product {
    //     name: string;
    //     price: number;
    //     description: string;
    //     categorie: string;
    //     image: string;
    // }

    const [errors, setErrors] = useState({})
    const [isValid, setIsValid] = useState(true)
    const [productData, setProductData] = useState({
        name: "",
        price: 0,
        description: "",
        categorie: "",
        image: "",

    })

    const supabase = createClient()



    // interface errorShow{
    //     name:string,
    //     description:string,
    //     price:string,
    // }
    useEffect(()=>{
        GetUserSession()
    },[])

    const validateData = (form) => {
        form.preventDefault()
        let errorList = {}

        if (!productData.name) {
            errorList.name = "Se necesita un nombre";
        }
        if (!productData.description) {
            errorList.description = " Se necesita una descripcion";
        }
        if (!productData.price) {
            errorList.price = "Se necesita de un precio";
        }

        if (!productData.categorie) {
            errorList.categorie = "Se necesita de una categoria";
        }


        if (Object.keys(errorList).length > 0) {
            setErrors(errorList);
            return;
        }

        sendProductData()
    }

    const checkValue = (value) => {
        // return (value.trim() != '' && /^[a-zA-Z]+$/.test(value) );

        return (value.trim() != '' || /^[a-z0-9]+$/i.test(value));

    }


    const sendProductData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('price', productData.price);
            formData.append('description', productData.description);
            formData.append('categorie', productData.categorie);
            formData.append('image', productData.image);

            const response = await sendData(formData);

            if (response.status) {
                // Enviar los datos de forma exitosa
                console.log('El dato del producto fue envio de forma exitosa:', response.message);
                setProductData({
                    name: "",
                    price: 0,
                    description: "",
                    categorie: "",
                    image: "",
            
                })
            } else {
                // Manejar error del servidor
                console.error('Error procesando data:', response.message);
                setErrors(response.errors || {});
            }
        } catch (error) {
            console.error('Error sending product data:', error.message);
        }
    };
    const setValueToState = (event) => {
        const { name, value } = event.target;

        let valueToCheck = checkValue(value);

        if (valueToCheck) {
            setIsValid(true);
            setProductData(data => ({
                ...data,
                [name]: value,
            }));
        } else {
            setIsValid(false);
        }

    }




    return (
        <>
            <h2 className='pt-5 pb-4 text-xl'>Add a product</h2>
            <form onSubmit={validateData}>
                <div className='flex flex-col gap-3 '>
                    <label htmlFor="name"
                    >  Nombre</label>
                    <input type="text" value={productData.name} onChange={setValueToState}  name='name' placeholder='dummy-product' className={`rounded-md p-2 text-black `}  />

                    <p className='text-rose-600'>{errors.name}</p>
                    <label htmlFor="">
                        Precio
                    </label>

                    <input  type="text" value={productData.price} onChange={setValueToState} name='price' placeholder='$00.0' className='rounded-md p-2 text-black'  />

                    <p className='text-rose-600'>{errors.price}</p>

                    <label htmlFor="">
                        Descripcion
                    </label>

                    <input type="text" value={productData.description} onChange={setValueToState}  name='description' placeholder='lorem ipsum' className='rounded-md p-2 text-black'  />

                    <p className='text-rose-600'>{errors.description}</p>

                    <label htmlFor="">
                        Categoria
                    </label>

                    <input type="text" value={productData.categorie} onChange={setValueToState}  name='categorie' placeholder='tech,comic,...' className='rounded-md p-2 text-black'  />

                    <p className='text-rose-600'>{errors.categorie}</p>

                    <label htmlFor="">
                        Imagen
                    </label>

                    <input type="text" value={productData.image}  onChange={setValueToState} name='image' placeholder='https:lorem-picsum' className='rounded-md p-2 text-black ' />


                    <button type="submit" className='p-2 bg-slate-500 text-white rounded-lg hover:bg-slate-800'>Añadir producto</button>

                </div>


            </form>

            <div className='bg-blue-200 text-black mt-4 p-3 rounded-md group-invalid:pointer-events-none group-invalid:opacity-30'>

                <pre >{JSON.stringify(productData, null, 2)}</pre>
            </div>

        </>
    )
}


export default SaveProduct;
