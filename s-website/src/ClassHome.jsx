import pb from './database/pb.js'
import { useParams } from "react-router-dom"

export default function ClassHome() {
    const {key} = useParams()
    const isLoggedIn = pb.authStore.isValid
    const roomLabel = key[0]+"."+key[1]+"/"+key[2]

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
                        <div className="float-left mt-[10px] bg-[#D9D9D9] outline-[#D9D9D9] outline text-black text-[20px] py-2 font-bold rounded-2xl pr-[80px] pl-5 ml-[10px] mb-3">
                            <span className="text-zinc-500">Name</span>
                            <span className="ml-[250px] text-zinc-500">Surname</span>
                            <span className="ml-[250px] text-zinc-500">No.</span>
                            <span className="ml-[150px] text-zinc-500">Status</span>
                        </div>
                    </div>
                    <div className="bg-[#D9D9D9] w-[300px] h-[450px] float-right mr-[60px] mt-[25px] rounded-3xl">
                    </div>
                </div>
            </center>
        </>
    )
}