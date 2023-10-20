import { useParams } from 'react-router-dom'
import img from '../public/icon.png'
import pb from './database/pb.js'
import React from 'react'
import { useEffect, useState } from 'react'

export default function InfoPage() {
    const { room } = useParams()
    const { key } = useParams()
    const [imagePath, setImagePath] = useState()

    const searchImagePath = async () => {
        const record = await pb.collection(room).getOne(key, {})
        let path = {}

        record.pictures.forEach(item => {
            if (item.startsWith("main")) {
                path = item
            }
        })
        return path
    }

    useEffect(() => {
        const getImagePath = async () => {
            searchImagePath().then((data) => {
                setImagePath("https://sadtsdatamanage.pockethost.io/api/files/" + room + "/" + key + "/" + data)
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
            <img src={imagePath} className='outline outline-[5px] h-[509px] w-[400px] mt-[45px] ml-[100px]'/>
            <img />
        </>
    )
}