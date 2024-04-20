"use server"
import { createClient } from '@/utils/supabase/client'
import { revalidatePath } from 'next/cache'

const supabase = createClient()

const sendData = async (formData: FormData) => {
    const { name, price, description, categorie, image } = Object.fromEntries(formData.entries());

    if (name === null || price === null || description === null || categorie === null || image === null) {
        return {
            status: false,
            message: "Se requieren algunos valores",
            errors: null,
            params: { name, price, description, categorie, image }
        };
    }

    try {
        const {  error } = await supabase.from('products').insert([{ name, price, description, categorie, image}]).select();

        if (error) {
            return {
                status: false,
                message: `Ocurrio un error de tipo ${error.message}`,
                errors: null,
                params: { name, price, description, categorie, image }
            };
        }


        revalidatePath("/save-product");

        return {
            status: true,
            message: "La data se inserto",
            errors: null,
            params: { name, price, description, categorie, image }
        };
    } catch (error) {
        return {
            status: false,
            message: `Ocurrio un error de tipo ${error}`,
            errors: null,
            params: { name, price, description, categorie, image }
        };
    }
}

export default sendData;
