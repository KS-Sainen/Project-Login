import pb from './database/pb.js'
import { useState } from 'react'

export default function SignUp() {
    const [isLoading, setLoading] = useState(false)

    const [email, setEmail] = useState()
    const [firstname, setFirstname] = useState()
    const [middlename, setMiddlename] = useState()
    const [lastname, setLastname] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()

    const isLoggedIn = pb.authStore.isValid

    const signUp = async(FirstName, MiddleName, LastName, Email, Password, PasswordConfirm) => {
        setLoading(true)
        try {
            const data = {
                "email": Email,
                "password": Password,
                "passwordConfirm": PasswordConfirm,
                "firstname": FirstName,
                "middlename": MiddleName,
                "lastname": LastName,
                "field": "unknown",
            }
            const record = await pb
                .collection('users')
                .create(data)
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
                    <input
                        type="text"
                        onChange={(e) => setFirstname(e.target.value)}
                        className="font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="First Name"
                    />
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setMiddlename(e.target.value)}
                        className="mt-[20px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Middle Name (Optional)"
                    />
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setLastname(e.target.value)}
                        className="mt-[20px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Last Name"
                        
                    />
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-[40px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Email Address"
                        
                    />
                    <br />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className=" mt-[20px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Password"
                        
                    />
                    <br />
                    <input
                        type="password"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        className="mt-[20px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Confirm Password"
                        
                    />
                    <br />
                    <button type="submit" onClick={() => signUp(firstname, middlename, lastname, email, password, passwordConfirm)} className="mt-[50px] bg-[#F95959] outline-[#F95959] outline text-white text-[15px] font-bold rounded-lg py-3 px-[190px]">
                        {isLoading ? 'LOADING...' : 'SIGN UP'}
                    </button>
                <a href="signin" className='underline text-white'>
                    <div className='mt-8'>Already have an account? Sign In</div>
                </a>
            </center>
        </>
    )
}