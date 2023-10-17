import React from "react";
import { Link } from 'react-router-dom'

function studentBar({ name, surname, number, status }) {
    <div className="float-left mt-[10px] bg-[#D9D9D9] outline-[#D9D9D9] outline text-black text-[20px] py-2 font-bold rounded-2xl pr-[80px] pl-5 ml-[10px] mb-3">
        <span className="">{name}</span>
        <span className="ml-[250px]">{surname}</span>
        <span className="ml-[250px]">{number}</span>
        <span className="ml-[150px]">{status}</span>
    </div>
}

export default studentBar;
