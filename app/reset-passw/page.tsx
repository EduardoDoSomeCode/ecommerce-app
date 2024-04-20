"use client"
import React, { useState } from 'react'
import ResetPassWord from '../actions/setChangePassword'
import Link from 'next/link'

function RessetPass() {

    const [password, setPassword] = useState("")
    const [secondPasword, setSecondPasword] = useState("")
    const [textWarwing, setTextWarning] = useState("")
    const [sucessMessage, setSuccesMessage] = useState(false)


    const validatePassword = async (event: any) => {
        event.preventDefault()
        if (password !== secondPasword) {
            return setTextWarning("La contraseña no coincide con la confirmacion")
        }
        if (password.length < 6) {
            return setTextWarning("La contraseña debe de tener minimo 6 caracteres")
        }
        let response = await ResetPassWord(secondPasword)
        if (response.sucess === true) {
            setSuccesMessage(true);

        }

        setTextWarning("");
        setPassword("");
        return setSecondPasword("");
    }





    return (
        <div className='flex flex-col items-center justify-center min-h-screen '>

            <Link
                href="/"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{" "}
                Back
            </Link>
            <form onClick={validatePassword} action="" className=' bg-slate-400   flex flex-col gap-4 p-4 justify-center aspect-square max-w-4xl '>
                <label htmlFor="" className='text-black' >Contraseña</label>
                <input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} className='text-black p-3' />
                <label htmlFor="" className='text-black'>Confirmar contraseña</label>

                <input type="password" onChange={(e) => { setSecondPasword(e.target.value) }} className='text-black p-3' />
                <button name='secondPasword' className='bg-slate-700 p-4'>Cambiar contraseña</button>
                <p className='break-words'>{textWarwing}</p>
                {sucessMessage && <p>La contraseña fue cambiada con exito</p>}
            </form>
            { }
        </div>
    )
}

export default RessetPass