import React from "react";
import { Link } from 'react-router-dom'

function StudentBar({ name, surname, number, status }) {
    return (
        <div className="float-left text-left grid grid-cols-4 gap-56 mt-[10px] bg-[#D9D9D9] outline-[#D9D9D9] w-[950px] outline text-black text-[20px] py-2 font-bold rounded-2xl pr-[80px] pl-5 ml-[25px] mb-3">
            <div className="ml-[45px]">{number}</div>
            <div className="-ml-[75px]">{name}</div>
            <div className="-ml-[48px]">{surname}</div>
            {status == "LEAVE ON PERMISSION" ?
                <div className="-ml-[100px] w-[1000px]">{status}</div>
                :
                <div className="text-center">{status}</div>
            }
        </div>
    )
}

export default StudentBar;
