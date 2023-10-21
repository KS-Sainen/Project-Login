import { useParams } from 'react-router-dom'
import img from '../public/icon.png'
import pb from './database/pb.js'
import React from 'react'
import { useEffect, useState } from 'react'

export default function InfoPage() {
    const { room } = useParams()
    const { key } = useParams()
    const [imagePath, setImagePath] = useState()
    const [info, setInfo] = useState({})
    const [status, setStatus] = useState()
    const roomLabel = room[0] + "." + room[1] + "/" + room[2]

    const searchImagePath = async () => {
        const record = await pb.collection(room).getOne(key, {})
        let path = {}

        record.pictures.forEach(item => {
            if (item.startsWith("main")) {
                path = item
            }
        })
        return { record, path }
    }

    useEffect(() => {
        const getImagePath = async () => {
            searchImagePath().then((data) => {
                setImagePath("https://sadtsdatamanage.pockethost.io/api/files/" + room + "/" + key + "/" + data.path)
                setInfo(data.record)
                setStatus(data.record.arrival_status)
            })
        }

        getImagePath()
        pb.collection(key).subscribe('*', function (e) {
            getImagePath()
        });
    }, [])

    return (
        <>
            <nav className='h-[150px] w-full bg-[#59A3F9]'>
                <div className='pt-[15px] flex'>
                    <img src={img} width={121} height={121} className='ml-6' />
                    <div className='grid grid-rows-2 gap-y-5'>
                        <div className='self-center text-center ml-[360px] text-3xl text-white font font-semibold tracking-widest'>Student Arrival & Departure System</div>
                        <div className='self-center text-center ml-[360px] text-2xl text-white font-thin'>Student Identification</div>
                    </div>
                    <div className='flex mt-[44px] text-2xl ml-auto text-white text-center'></div>
                    <img src={img} width={121} height={121} className='rotate-[240deg] mr-6' />
                </div>
            </nav>
            <img src={imagePath} className='outline outline-[5px] h-[509px] mt-[42.5px] w-[400px] ml-[100px]' />
            <div className='grid pb-10 grid-cols-2 -mt-[500px] gap-y-[75px] text-2xl text-white tracking-tighter ml-[600px]'>
                <div className='font-semibold'>FULL NAME:</div>
                <div className='-ml-[100px]'>{String(info.name).toUpperCase()}&nbsp;&nbsp;{String(info.surname).toUpperCase()}</div>
                <div className='font-semibold'>CLASS:</div>
                <div className='-ml-[100px]'>{String(roomLabel).toUpperCase()}</div>
                <div className='font-semibold'>SCHOOL ID:</div>
                <div className='-ml-[100px]'>{info.school_id}</div>
                <div className='font-semibold'>PHONE NUMBER:</div>
                <div className='-ml-[100px]'>{info.phone_number}</div>
                <div className='font-semibold'>TODAY'S STATUS:</div>
                <select value={status} required onChange={(e) => {
                    setStatus(e.target.value)
                    pb.collection(room).update(key, {
                        arrival_status: e.target.value
                    })
                }} className='text-black -ml-[100px] w-[300px]'>
                    <option style={{display:"none"}}/>
                    <option value="present">PRESENT</option>
                    <option value="absent">ABSENT</option>
                    <option value="late">LATE</option>
                    <option value="lop">LEAVE ON PERMISSION</option>
                </select>
            </div>
        </>
    )
}