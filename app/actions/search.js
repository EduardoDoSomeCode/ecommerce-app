"use server"
import { createClient } from '@/utils/supabase/client'



const searchProduct = async (search) => {
    const supabase = createClient()

    const { data, error } = await supabase.from('products').select("*").like("name", `%${search.toLowerCase()}%`);

    return data;

}


const getElementById = async (id) => {
    const supabase = createClient()

    const { data, error } = await supabase.from("products").select("*").eq("id", `${id}`)
    return data
}

const updateElementById = async (id, updatedData) => {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('products')
        .update({
            name: updatedData.name,
            price: updatedData.price,
            categorie: updatedData.categorie,
            description: updatedData.description,
            image: updatedData.image,
        })
        .eq('id', id);


    return { status: 200, product: data }
}


export { searchProduct, getElementById, updateElementById };