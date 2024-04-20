"use server"
import { createClient } from '@/utils/supabase/client'



const producList = async () => {
    const supabase = createClient()

    const { data, error } = await supabase.from("products").select()

    return {
        products: data,
        error,
    }
}


export default producList