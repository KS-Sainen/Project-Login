import pb from './database/pb.js'
import { useState } from 'react'

export default function SignIn() {
    const [isLoading, setLoading] = useState(false)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const isLoggedIn = pb.authStore.isValid

    const signIn = async(Email, Password) => {
        setLoading(true)
        try {
            const authData = await pb
                .collection('users')
                .authWithPassword(Email, Password)
        } catch (e) {
            validation(Email, Password)
        }
        setLoading(false)
    }
    const validation = async(Email, Password) => {
        if (Email.length == 0) {
            alert("Please Enter Your Email")
        } else if (Password.length == 0) {
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
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        className="font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Email Address"
                    />
                    <br />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className=" mt-[40px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Password"
                    />
                    <br />
                    <button type="submit" onClick={() => signIn(email, password)} className="mt-[50px] bg-[#F95959] outline-[#F95959] outline text-white text-[15px] font-bold rounded-lg py-3 px-[190px]">
                        {isLoading ? 'LOADING...' : 'SIGN IN'}
                    </button>
                <a href="signup" className='underline text-white'>
                    <div className='mt-8'>Don't have an account? Sign Up</div>
                </a>
            </center>
        </>
    )
}