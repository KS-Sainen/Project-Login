import pb from './database/pb.js'
import { useState } from 'react'
import { useForm } from "react-hook-form"

export default function SignIn() {
    const { register, handleSubmit } = useForm()
    const [isLoading, setLoading] = useState(false)

    const isLoggedIn = pb.authStore.isValid

    const signin = async (data) => {
        setLoading(true)
        try {
            const authData = await pb
                .collection('users')
                .authWithPassword(data.email, data.password)
        } catch (error) {
            alert(error)
        }
        setLoading(false)
    }

    if (isLoggedIn) {
        return (
            window.location.href = "/home"
        )
    }

    return (
        <>
            <center className="pt-[200px]">
                <form onSubmit={handleSubmit(signin)}>
                    <input
                        type="text"
                        className="font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Email Address"
                        required
                        {...register("email")}
                    />
                    <br />
                    <input
                        type="password"
                        className=" mt-[40px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Password"
                        oninvalid="this.setCustomValidity('Majburiy maydon')"
                        required
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