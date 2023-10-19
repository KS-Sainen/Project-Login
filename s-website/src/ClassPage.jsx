import pb from './database/pb.js'
import React from 'react'
import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import StudentBar from "./prefab/nameinfo.jsx"
import { get, set } from 'react-hook-form'
import { data } from 'autoprefixer'

export default function ClassHome() {
    const { key } = useParams()
    const [list, setList] = useState([])

    const [numPresent, setNumPresent] = useState(0)
    const [numAbsent, setNumAbsent] = useState(0)
    const [numLate, setNumLate] = useState(0)
    const [numLeave, setNumLeave] = useState(0)
    const [numTotal, setNumTotal] = useState(0)

    const isLoggedIn = pb.authStore.isValid
    const roomLabel = key[0] + "." + key[1] + "/" + key[2]

    const getNameList = async () => {
        const data = await pb.collection(key).getFullList({})
        data.sort((a, b) => a.number - b.number)
        return data
    }

    const getAmount = async (status) => {
        const data = await pb.collection(key).getFullList({})
        let count = 0
        data.forEach((item) => {
            if (item.arrival_status == status) {
                count += 1
            }
        })
        return count
    }

    const getNumTotal = async () => {
        const data = await pb.collection(key).getFullList({})
        return data.length
    }

    useEffect(() => {
        const getAllList = async () => {
            setList(await getNameList())
            setNumTotal(await getNumTotal())
            setNumPresent(await getAmount("present"))
            setNumAbsent(await getAmount("absent"))
            setNumLate(await getAmount("late"))
            setNumLeave(await getAmount("lop"))
        }

        pb.collection(key).subscribe('*', function (e) {
            console.log(e)
            getAllList()
        });
        getAllList()
    }, [])

    if (localStorage.getItem('classroom') != key) {
        window.location.href = "/classoption"
    }

    return (
        <>-
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
                                    status={item.arrival_status=="lop" ? "LEAVE ON PERMISSION" : item.arrival_status.toUpperCase()}
                                />
                            ))}
                        </div>
                    </div>

                    {/*activity box*/}
                    <div className="bg-[#D9D9D9] w-[300px] h-[450px] float-right mr-[60px] mt-[25px] rounded-3xl">
                        <div className='text-xl mt-5 font-extrabold'>STUDENT ATTENDANCE</div>
                        <div className='grid gap-y-[30px] grid-cols-2 text-lg mt-10 font-bold'>
                            <span>CATEGORIES</span>
                            <span>AMOUNT</span>
                            <span className='font-semibold'>PRESENT</span>
                            <span className='font-semibold'>{numPresent <= 9 ? "0" + numPresent : numPresent}</span>
                            <span className='font-semibold'>ABSENT</span>
                            <span className='font-semibold'>{numAbsent <= 9 ? "0" + numAbsent : numAbsent}</span>
                            <span className='font-semibold'>LATE</span>
                            <span className='font-semibold'>{numLate <= 9 ? "0" + numLate : numLate}</span>
                            <span className='font-semibold text-[16px] -mt-3 ml-1.5'>LEAVE ON PERMISSION</span>
                            <span className='font-semibold'>{numLeave <= 9 ? "0" + numLeave : numLeave}</span>
                            <span className='font-semibold'>TOTAL</span>
                            <span className='font-semibold'>{numTotal <= 9 ? "0" + numTotal : numTotal}</span>
                        </div>
                    </div>
                </div>
            </center>
        </>
    )
}