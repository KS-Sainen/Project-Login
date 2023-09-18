import pb from './database/pb.js'

export default function ClassHome() {
    const isLoggedIn = pb.authStore.isValid

    if (!isLoggedIn) {
        window.location.href = "/signin"
        localStorage.removeItem('classroom')
    }

    return (
        <>
            <center className="pt-[65px]">
                <div className="mr-[972px] bg-[#424345] w-[328px] h-[110px] rounded-t-[50px]">
                    <div className="tracking-widest text-white pt-[15px] text-[50px] font-semibold">
                        {localStorage.getItem('classroom')}
                    </div>
                </div>
                <div className="bg-[#5A5B5C] w-[1300px] h-[500px] rounded-tr-[50px] rounded-b-[50px]">
                    <div className="float-left mt-[30px] bg-[#D9D9D9] outline-[#D9D9D9] outline text-black text-[25px] py-2 font-bold rounded-2xl pr-[250px] pl-5 ml-[10px]">
                        <text className="">Name</text>
                        <text className="ml-[150px]">Surname</text>
                        <text className="ml-[150px]">No.</text>
                    </div>
                    <div className="bg-[#D9D9D9] w-[300px] h-[450px] float-right mr-[90px] mt-[25px] rounded-3xl">
                    </div>
                </div>
            </center>
        </>
    )
}