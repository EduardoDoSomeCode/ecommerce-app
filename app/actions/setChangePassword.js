"use server"
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const ResetPassWord = async (newPassword) => {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);


    const { data, error } = await supabase.auth.updateUser({
        password: newPassword
    })

    if(error){
        return{
            sucess:false,
            message:`No se pudo guardar la nueva contraseña ${error}`
        }
    }

    return{
        sucess:true,
        message:`contraseña registrada ${data}`
    }

}

export default ResetPassWord;