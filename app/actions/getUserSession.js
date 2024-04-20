"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const GetUserSession = async () => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/")
        return
    }

}

export default GetUserSession;