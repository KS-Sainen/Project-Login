export default function ClassChoice() {
    return (
        <>
            <center className="pt-[60px]">
                <div className="bg-[#424345] w-[428px] h-[91px] rounded-t-[50px]">
                    <div className="text-white text-5xl font-semibold tracking-wider pt-[20px]">
                        Class Room
                    </div>
                </div>
                <div className="bg-[#D9D9D9] w-[646px] h-[395px] rounded-3xl">
                    <input
                        type="text"
                        placeholder="M.6/..."
                        className="mt-[170px] bg-[#59A3F9] outline-[#59A3F9] outline text-white text-[20px] placeholder-gray-300 font-bold text-center rounded-lg py-2 px-[160px]" />
                </div>
                <button type="submit" className="mt-[70px] bg-[#F95959] outline-[#F95959] outline text-white text-[15px] font-bold rounded-lg py-3 px-[190px]">
                    OPEN
                </button>
            </center>
        </>
    )
}