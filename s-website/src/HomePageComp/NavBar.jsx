import React from "react";
import img from "../../public/icon.png";

export default function NavBar() {
  return (
    <>
      <nav className="top-0 h-20 lg:h-[150px] w-screen bg-[#666666] bg-opacity-[46%] flex items-center justify-between">
        <div className="flex items-center pl-2 lg:pl-16">
          <img
            src={img}
            onClick={() => {
              window.location.href = "/";
            }}
            className="cursor-pointer w-16 h-16 lg:w-[121px] lg:h-[121px]"
          />
          <div className="ml-2 lg:ml-4 text-xl lg:text-4xl text-white font font-semibold">
            SADTS
          </div>
        </div>
        <div className="flex items-center text-white pr-4 lg:pr-20 space-x-4 lg:space-x-28 text-xs lg:text-2xl">
          <a href="#" className="cursor-pointer">
            About
          </a>
          <a href="#" className="cursor-pointer">
            Projects
          </a>
        </div>
      </nav>
    </>
  );
}
