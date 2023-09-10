function SignIn() {
    return(
        <>
        <center class="pt-[200px]">
            <input
            type="text"
            className="font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
            placeholder="Email Address"
            />
            <br/>
            <input
            type="password"
            className=" mt-[40px] font-thin tracking-widest w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
            placeholder="Password"
            />
            <br/>
            <a href="#">
                <button class="mt-[50px] bg-[#F95959] outline-[#F95959] outline text-white text-[15px] font-bold rounded-lg py-3 px-[190px]">
                    SIGN IN
                </button>   
            </a>
        </center>

        </>
    )
}

export default SignIn