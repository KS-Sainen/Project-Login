function TextAndSign() {
    return (
        <>
            <div class="flex text-white">
                <div class="flex-1 ml-[100px] tracking-widest">
                    <div className="mb-5 mt-10 font-light text-3xl">Welcome!</div>
                    <div className="mb-10 font-medium text-5xl">Student Arrival<br />& Departure Time<br />System</div>
                    <div className="font-thin text-2xl text-[#A5A6A7] mb-10">Efficiency in education begins<br />with punctuality</div>

                    <a href="signin">
                        <button class=" mt-5 bg-[#59A3F9] outline-[#59A3F9] outline text-white text-[15px] font-bold rounded-lg py-3 px-[190px]">
                            SIGN IN
                        </button>
                    </a>

                    <a href="#">
                        <button class=" mt-5 bg-transparent outline-[#59A3F9] outline text-white text-[15px] font-bold rounded-lg py-3 px-[190px]">
                            SIGN UP
                        </button>   
                    </a>
                </div>
                <div class="flex-1">
                    <img src="icon2.png"className="w-[550px]"/>
                </div>
            </div>
        </>
    )
}

export default TextAndSign