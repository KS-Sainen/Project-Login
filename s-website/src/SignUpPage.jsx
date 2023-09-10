import pb from './database/pb.js'
import { useState } from 'react'
import { useForm } from "react-hook-form"

export default function SignUp() {
    const { register, handleSubmit } = useForm()
    const [isLoading, setLoading] = useState(false)

    const isLoggedIn = pb.authStore.isValid

    const signup = async (data) => {
        setLoading(true)
        try {
            const record = await pb.collection('users').create(data);
            alert("Account Created Successfully")
            window.location.href = "/signin"
        } catch (error) {
            alert("Account Creation Failed")
        }
        setLoading(false)
    }

    if (isLoggedIn) {
        return (
            window.location.href = "/classoption"
        )
    }


    return (
        <>
            <center className="pt-[100px]">
                <form onSubmit={handleSubmit(signup)}>
                    <input
                        type="text"
                        className="font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="First Name"
                        required
                        {...register("firstname")}
                    />
                    <br />
                    <input
                        type="text"
                        className="mt-[20px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Middle Name (Optional)"
                        {...register("middlename")}
                    />
                    <br />
                    <input
                        type="text"
                        className="mt-[20px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Last Name"
                        required
                        {...register("lastname")}
                    />
                    <br />
                    <input
                        type="text"
                        className="mt-[40px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Email Address"
                        required
                        {...register("email")}
                    />
                    <br />
                    <input
                        type="password"
                        className=" mt-[20px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Password"
                        required
                        {...register("password")}
                    />
                    <br />
                    <input
                        type="password"
                        className="mt-[20px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Confirm Password"
                        required
                        {...register("passwordConfirm")}
                    />
                    <br />
                    <button type="submit" className="mt-[50px] bg-[#F95959] outline-[#F95959] outline text-white text-[15px] font-bold rounded-lg py-3 px-[190px]">
                        {isLoading ? 'LOADING...' : 'SIGN UP'}
                    </button>
                </form>
                <a href="signin" className='underline text-white'>
                    <div className='mt-8'>Already have an account? Sign In</div>
                </a>
            </center>
        </>
    )
}