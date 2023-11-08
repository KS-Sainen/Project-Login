import pb from './database/pb.js'
import React from 'react'
import { useState } from 'react'

export default function ClassChoice() {
    const isLoggedIn = pb.authStore.isValid;

    const [classroom, setClassroom] = useState('')
    const [isLoading, setLoading] = useState(false)

    function capitalize(s) {
        return s && s[0].toUpperCase() + s.slice(1);
    }

    const getClassroom = async (roomnumber) => {
        if (roomnumber.length == 0) {
            alert("Please Input Your Classroom")
        } else {
            try {
                setLoading(true)
                const roomPath = roomnumber.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'')
                const userClass = pb.authStore.model.classroom.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'')

                if (userClass == capitalize(roomPath) || pb.authStore.model.role == "admin") {
                    window.location.href = `/class/${capitalize(roomPath)}`
                } else {
                    alert("No Access")
                }

            } catch (e) {
                alert("Classroom Not Found")
            }
        }
        setLoading(false)
    }

    if (!isLoggedIn) {
        window.location.href = "/signin"
    }

    const signOut = async () => {
        pb.authStore.clear()
        window.location.href = "/signin"
    }

    return (
        <>
            <nav className='top-0 h-20 lg:h-[150px] w-screen lg:w-full bg-[#666666] bg-opacity-[46%] flex items-center justify-between'>
                <div className='flex items-center pl-2 lg:pl-16'>
                    <a href="/">
                        <img src="icon.png" className='w-16 h-16 lg:w-[121px] lg:h-[121px]' />
                    </a>
                    <div className='ml-2 lg:ml-4 text-xl lg:text-4xl text-white font font-semibold'>SADTS</div>
                </div>
                <div className='flex items-center text-white pr-4 lg:pr-20 space-x-4 lg:space-x-28 text-xs lg:text-2xl'>
                        <a onClick={signOut} className='cursor-pointer'>
                            Logout
                        </a>
                    </div>
            </nav>
            <center className="pt-10 lg:pt-14">
                <div className="bg-[#424345] w-60 h-10 lg:w-[428px] lg:h-[71px] rounded-t-[35px] lg:rounded-t-[50px]">
                    <div className="text-white text-lg lg:text-4xl font-semibold tracking-wider pt-1.5 lg:pt-[10px]">
                        Class Room
                    </div>
                </div>
                <div className="bg-[#D9D9D9] w-80 lg:w-[646px] h-60 lg:h-[320px] rounded-3xl">
                    <input
                        value={classroom}
                        onChange={(e) => setClassroom(e.target.value)}
                        type="text"
                        placeholder="M.6/..."
                        className="mt-24 lg:mt-32 bg-[#59A3F9] outline-[#59A3F9] outline text-white text-base lg:text-xl placeholder-gray-300 font-bold text-center rounded-lg py-1 lg:py-2 px-5 lg:px-40"
                    />
                </div>
                <button type="submit" onClick={() => {getClassroom(classroom)}} className="mt-10 lg:mt-12 bg-[#F95959] outline-[#F95959] outline text-white text-sm lg:text-base font-bold rounded-lg py-2 lg:py-3 px-24 lg:px-48">
                    {isLoading ? 'LOADING...' : 'OPEN CLASSROOM'}
                </button>
            </center>
        </>
    )
}