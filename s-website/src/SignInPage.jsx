import pb from './database/pb.js'
import { useState } from 'react'
import NavBar from './HomePageComp/NavBar.jsx'

export default function SignIn() {
    const [isLoading, setLoading] = useState(false)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const isLoggedIn = pb.authStore.isValid

    const signIn = async (Email, Password) => {
        setLoading(true)
        try {
            const authData = await pb
                .collection('Users')
                .authWithPassword(Email, Password)
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    if (isLoggedIn) {
        return (
            window.location.href = "/class"
        )
    }

    return (
        <>
            <nav className='h-[150px] w-full bg-[#666666] bg-opacity-[46%]'>
                <div className='ml-[107px] pt-[15px] flex'>
                    <a href="/">
                        <img src="icon.png" width={121} height={121} />
                    </a>
                    <div className='mt-[44px] ml-[5px] text-3xl text-white font font-semibold'>SADTS</div>
                    <div className='flex mt-[44px] text-2xl ml-auto text-white font-thin items-center'>
                        <a href="#" className='mr-[150px] mb-9 cursor-pointer'>
                            About
                        </a>
                        <a href="#" className='mr-[100px] mb-9 cursor-pointer'>
                            Projects
                        </a>
                    </div>
                </div>
            </nav>
            <center className="pt-[130px]">
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