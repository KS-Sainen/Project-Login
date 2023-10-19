import pb from './database/pb.js'
import React from 'react'
import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import StudentBar from "./prefab/nameinfo.jsx"
import { get } from 'react-hook-form'
import { data } from 'autoprefixer'

export default function ClassHome() {
    const { key } = useParams()
    const [list, setList] = useState([])
    const isLoggedIn = pb.authStore.isValid
    const roomLabel = key[0] + "." + key[1] + "/" + key[2]

    const getNameList = async () => {
        const data = await pb.collection(key).getFullList({})
        data.sort((a, b) => a.number - b.number)
        return data
        // console.log(data)
    }

    useEffect(() => {
        const getAllList = async () => {
            setList(await getNameList())
        }
        getAllList()
    }, [])

    if (localStorage.getItem('classroom') != key) {
        window.location.href = "/classoption"
    }

    return (
        <>
            <center className="pt-[65px]">
                <div className="mr-[1123px] bg-[#424345] w-[328px] h-[110px] rounded-t-[50px]">
                    <div className="tracking-widest text-white pt-[15px] text-[50px] font-semibold">
                        {roomLabel.toUpperCase()}
                    </div>
                </div>
                <div className="bg-[#5A5B5C] w-[1450px] h-[500px] rounded-tr-[50px] rounded-b-[50px]">
                    <div className="float-left w-[1000px] h-[440px] mt-[30px] outline-[#D9D9D9] outline text-black text-[25px] py-2 font-bold rounded-2xl ml-[25px]">
                        <div className="float-left text-left grid grid-cols-4 gap-56 mt-[10px] bg-gray-300 outline-[#D9D9D9] w-[950px] outline text-gray-500 text-[20px] py-2 font-bold rounded-2xl pr-[80px] pl-5 ml-[25px] mb-3">
                            <div className="ml-[45px]">No.</div>
                            <div className="-ml-[75px]">Name</div>
                            <div className="-ml-[48px]">Surname</div>
                            <div className="ml-[1px]">Status</div>
                        </div>
                        <div className="overflow-y-scroll scrollbar-hide float-left w-[1000px] h-[360px] text-black text-[25px] font-bold">
                            {list.map((item) => (
                                <StudentBar
                                    key={item.id}
                                    name={item.name.toUpperCase()}
                                    surname={item.surname.toUpperCase()}
                                    number={item.number}
                                    status={item.arrival_status.toUpperCase()}
                                />
                            ))}
                        </div>
                    </div>

                    {/*activity box*/}
                    <div className="bg-[#D9D9D9] w-[300px] h-[450px] float-right mr-[60px] mt-[25px] rounded-3xl">
                        <div className='text-lg font-bold'>STUDENT ATTENDANCE</div>
                    </div>
                </div>
            </center>
        </>
    )
}