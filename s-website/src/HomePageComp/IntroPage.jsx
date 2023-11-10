export default function TextAndSign() {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between text-white mx-auto">
        <div className="flex flex-col pl-5 lg:pl-32 ml-2 lg:ml-0">
          <div className="mt-5 mb-1 lg:mb-5 lg:mt-10 font-light text-xl lg:text-3xl">
            Welcome!
          </div>
          <div className="  font-medium text-3xl lg:text-5xl mb-2 lg:mb-3">
            Student Arrival
            <br />& Departure Time
            <br />
            System
          </div>
          <div className="font-thin text-base lg:text-2xl text-[#A5A6A7] mb-5 lg:mb-10">
            Efficiency in education begins
            <br />
            with punctuality
          </div>
          <div className="flex flex-col space-y-1">
            <a href="signin">
              <button className="mt-1 lg:mt-5 bg-[#59A3F9] outline-[#59A3F9] outline text-white text-[12px] lg:text-[15px] font-bold rounded-lg py-1.5 lg:py-3 px-[145px] lg:px-[190px]">
                SIGN IN
              </button>
            </a>
            <a href="signup">
              <button className="mt-4 lg:mt-5 bg-transparent outline-[#59A3F9] outline text-white text-[12px] lg:text-[15px] font-bold rounded-lg py-1.5 lg:py-3 px-[145px] lg:px-[190px]">
                SIGN UP
              </button>
            </a>
          </div>
        </div>
        <div className="flex pl-4 lg:pr-40">
          <img src="icon2.png" className="w-[300px] lg:w-[550px]" />
        </div>
      </div>
    </>
  );
}
