import pb from './database/pb.js'
import React from 'react'
import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import StudentBar from "./prefab/nameinfo.jsx"
import { get, set } from 'react-hook-form'
import { data } from 'autoprefixer'

export default function ClassHome() {
    const { key } = useParams()
    const [nameList, setNameList] = useState([])
    const [info, setInfo] = useState({})

    const isLoggedIn = pb.authStore.isValid
    const roomLabel = key[0] + "." + key[1] + "/" + key[2]

    const getInfo = async () => {
        const keyData = await pb.collection(key).getFullList({})
        keyData.sort((a, b) => a.number - b.number)
        const countTotal = keyData.length
        let countNumPresent = 0
        let countNumAbsent = 0
        let countNumLate = 0
        let countNumLOP = 0
        keyData.forEach((item) => {
            if (item.arrival_status == "present") {
                countNumPresent += 1
            } else if (item.arrival_status == "absent") {
                countNumAbsent += 1
            } else if (item.arrival_status == "late") {
                countNumLate += 1
            } else if (item.arrival_status == "lop") {
                countNumLOP += 1
            }
        })
        return { keyData, countNumPresent, countNumAbsent, countNumLate, countNumLOP, countTotal }
    }

    useEffect(() => {
        const getAllList = async () => {
            await getInfo().then((data) => {
                setNameList(data.keyData)
                setInfo(data)
            })
        }

        getAllList()
        pb.collection(key).subscribe('*', (e) => {
            getAllList()
        });
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
                            {nameList.map((item) => (
                                <StudentBar
                                    key={item.id}
                                    itemID={item.id}
                                    name={item.name.toUpperCase()}
                                    surname={item.surname.toUpperCase()}
                                    number={item.number}
                                    status={item.arrival_status == "lop" ? "LEAVE ON PERMISSION" : item.arrival_status.toUpperCase()}
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
                            <span className='font-semibold'>{info.countNumPresent <= 9 ? "0" + info.countNumPresent : info.countNumPresent}</span>
                            <span className='font-semibold'>ABSENT</span>
                            <span className='font-semibold'>{info.countNumAbsent <= 9 ? "0" + info.countNumAbsent : info.countNumAbsent}</span>
                            <span className='font-semibold'>LATE</span>
                            <span className='font-semibold'>{info.countNumLate <= 9 ? "0" + info.countNumLate : info.countNumLate}</span>
                            <span className='font-semibold text-[16px] -mt-3 ml-1.5'>LEAVE ON PERMISSION</span>
                            <span className='font-semibold'>{info.countNumLOP <= 9 ? "0" + info.countNumLOP : info.countNumLOP}</span>
                            <span className='font-semibold'>TOTAL</span>
                            <span className='font-semibold'>{info.countTotal <= 9 ? "0" + info.countTotal : info.countTotal}</span>
                        </div>
                    </div>
                </div>
            </center>
        </>
    )
}