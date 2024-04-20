import { createClient } from '@/utils/supabase/client'

const SearchByCategorie = async(search:string) => {
    const supabase = createClient()

    const { data, error } = await supabase.from('products').select("*").like("categorie", `%${search}%`);

    return {data,error};
}



export default SearchByCategorie