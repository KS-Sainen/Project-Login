import pb from './database/pb.js'
import { useState } from 'react'

export default function SignUp() {
    const [isLoading, setLoading] = useState(false)

    const [email, setEmail] = useState()
    const [firstname, setFirstName] = useState()
    const [middlename, setMiddleName] = useState()
    const [lastname, setLastName] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()

    const isLoggedIn = pb.authStore.isValid

    function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}

    const signUp = async (FirstName, MiddleName, LastName, Email, Password, PasswordConfirm) => {
        setLoading(true)
        try {
            const data = {
                "username": capitalize(FirstName)+capitalize(LastName),
                "email": Email,
                "password": Password,
                "passwordConfirm": PasswordConfirm,
                "firstName": capitalize(FirstName),
                "middleName": capitalize(MiddleName),
                "lastName": capitalize(LastName),
                "role": "visitor",
            };
            const record = await pb
                .collection('Users')
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
            <center className='h-[79.9vh] overflow-y-auto'>
                <div className="pt-[50px]">
                    <input
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        className="font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="First Name"
                    />
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setMiddleName(e.target.value)}
                        className="mt-[20px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                        placeholder="Middle Name (Optional)"
                    />
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
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
                    <div className='pt-[50px]'></div>
                </div>
            </center>
        </>
    )
}