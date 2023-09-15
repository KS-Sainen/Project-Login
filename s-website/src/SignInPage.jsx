import pb from './database/pb.js'
import { useState } from 'react'
import { useForm } from "react-hook-form"

export default function SignIn() {
    const { register, handleSubmit } = useForm()
    const [isLoading, setLoading] = useState(false)

    const isLoggedIn = pb.authStore.isValid

    const signIn = async (data) => {
        setLoading(true)
        try {
            const authData = await pb
                .collection('users')
                .authWithPassword(data.email, data.password)
        } catch (error) {
            validation(data)
        }
        setLoading(false)
    }
    const validation = async(data) => {
        if (data.email.length == 0) {
            alert("Please Enter Your Email")
        } else if (data.password.length == 0) {
            alert("Please Enter Your Password")
        }
    }


    if (isLoggedIn) {
        return (
            window.location.href = "/classoption"
        )
    }

    return (
        <>
            <center className="pt-[200px]">
                <form onSubmit={handleSubmit(signIn)}>
                    <input
                        type="text"
                        className="font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Email Address"
                        {...register("email")}
                    />
                    <br />
                    <input
                        type="password"
                        className=" mt-[40px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Password"
                        {...register("password")}
                    />
                    <br />
                    <button type="submit" className="mt-[50px] bg-[#F95959] outline-[#F95959] outline text-white text-[15px] font-bold rounded-lg py-3 px-[190px]">
                        {isLoading ? 'LOADING...' : 'SIGN IN'}
                    </button>
                </form>
                <a href="signup" className='underline text-white'>
                    <div className='mt-8'>Don't have an account? Sign Up</div>
                </a>
            </center>
        </>
    )
}