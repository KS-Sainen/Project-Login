import pb from './database/pb.js'
import React from 'react'
import { useState } from 'react'

export default function ClassChoice() {
    const isLoggedIn = pb.authStore.isValid;

    const [classroom, setClassroom] = useState('')
    const [isLoading, setLoading] = useState(false)

    const getClassroom = async (roomnumber) => {
        if (roomnumber.length == 0) {
            alert("Please Input Your Classroom")
        } else {
            try {
                setLoading(true)
                const roomPath = roomnumber.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'')
                const roomCheck = await pb.collection(roomPath).getList()
                localStorage.setItem('classroom', roomPath)
                window.location.href = `/class/${roomPath}`
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
        await pb.authStore.clear()
        window.location.href = "/signin"
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
                        <a onClick={signOut} className='mr-[100px] mb-9 cursor-pointer'>
                            Logout
                        </a>
                    </div>
                </div>
            </nav>
            <center className="pt-[52px]">
                <div className="bg-[#424345] w-[428px] h-[71px] rounded-t-[50px]">
                    <div className="text-white text-5xl font-semibold tracking-wider pt-[10px]">
                        Class Room
                    </div>
                </div>
                <div className="bg-[#D9D9D9] w-[646px] h-[320px] rounded-3xl">
                    <input
                        value={classroom}
                        onChange={(e) => setClassroom(e.target.value)}
                        type="text"
                        placeholder="M.6/..."
                        className="mt-[130px] bg-[#59A3F9] outline-[#59A3F9] outline text-white text-[20px] placeholder-gray-300 font-bold text-center rounded-lg py-2 px-[160px]"
                    />
                </div>
                <button type="submit" onClick={() => {getClassroom(classroom)}} className="mt-[50px] bg-[#F95959] outline-[#F95959] outline text-white text-[15px] font-bold rounded-lg py-3 px-[190px]">
                    {isLoading ? 'LOADING...' : 'OPEN CLASSROOM'}
                </button>
            </center>
        </>
    )
}