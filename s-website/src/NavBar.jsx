import React from 'react'

function NavBar() {
    return(
        <>
        <nav className='h-[150px] w-full bg-[#666666] bg-opacity-[46%]'>
            <div className='ml-[107px] pt-[15px] flex'>
                <img src="icon.png" width={121} height={121} />
                <div className='mt-[44px] ml-[5px] text-3xl text-white font font-semibold'>SADTS</div>
                <div className='flex mt-[44px] text-2xl ml-auto text-white font-thin'>
                    <div className='pr-[150px] cursor-pointer '>
                        About
                    </div>
                    <div className='pr-[100px]'>
                        Projects
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}

export default NavBar