import pb from './database/pb.js'
import { useState } from 'react'

export default function SignUp() {
    const [isLoading, setLoading] = useState(false)

    const [email, setEmail] = useState()
    const [firstName, setFirstName] = useState()
    const [middleName, setMiddleName] = useState()
    const [lastName, setLastName] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()

    const [invalidFirstName, setInvalidFirstName] = useState(false)
    const [invalidMiddleName, setInvalidMiddleName] = useState(false)
    const [invalidLastName, setInvalidLastName] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [invaliConfirmPassword, setInvalidConfirmPassword] = useState(false)
    const isLoggedIn = pb.authStore.isValid

    function capitalize(s) {
        return s && s[0].toUpperCase() + s.slice(1);
    }

    const signUp = async (FirstName, MiddleName, LastName, Email, Password, PasswordConfirm) => {
        const nameRegex = /^[a-zA-Z]+$/;
        if (!nameRegex.test(FirstName) || FirstName.length == 0 || FirstName == null || FirstName == undefined || FirstName == " ") {
            setInvalidFirstName(true)
        } else if (!nameRegex.test(MiddleName)) {
            setInvalidMiddleName(true)
        } else if (!nameRegex.test(LastName) || LastName.length == 0 || LastName == null || LastName == undefined || LastName == " ") {
            setInvalidLastName(true)
        } else if (Password.length <= 5 || Password == null || Password == undefined || Password == " ") {
            setInvalidPassword(true)
        } else if (PasswordConfirm != Password || PasswordConfirm == null || PasswordConfirm == undefined || PasswordConfirm == " ") {
            setInvalidPassword(true)
        } else {
            try {
                const data = {
                    "username": capitalize(FirstName) + capitalize(LastName),
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
                alert("Account Creation Failed, please contact the administrator")
            }
        }
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
            <div className='h-[79.9vh] flex justify-center overflow-y-auto'>
                <div className="pt-[50px]">
                    <div className=''>
                        {invalidFirstName ?
                            <> {/*If Invalid first name (ternary operator)*/}
                                <input
                                    type="text"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-red-500 rounded-xl text-white placeholder-red-500"
                                    placeholder="First Name"
                                />
                                <div className='text-red-500 mt-3'>
                                    Please check the following:<br />
                                    - First name cannot be blank.<br />
                                    - First name must be written in English.<br />
                                    - First name cannot contain special characters.
                                </div>
                            </>
                            :
                            <>
                                <input
                                    type="text"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                                    placeholder="First Name"
                                />
                                <div></div>
                            </>
                        }


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
                    </div>
                    <br />
                    <button type="submit" onClick={() => signUp(firstName, middleName, lastName, email, password, passwordConfirm)} className="mt-[20px] bg-[#F95959] outline-[#F95959] outline text-white text-[15px] font-bold rounded-lg py-3 px-[190px]">
                        {isLoading ? 'LOADING...' : 'SIGN UP'}
                    </button>
                    <a href="signin" className='underline text-white'>
                        <div className='mt-8 flex justify-center'>Already have an account? Sign In</div>
                    </a>
                    <div className='pt-[50px]'></div>
                </div>
            </div>
        </>
    )
}