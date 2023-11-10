import pb from "../database/pb.js";
import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function StudentBar({ itemID, name, surname, number, status }) {
  const { key } = useParams();
  const userRole = pb.authStore.model.role;

  return (
    <>
      {userRole == "visitor" || userRole == "student" ? (
        <div className="cursor-pointer float-left text-left grid grid-cols-4 gap-10 xl:gap-56 mt-[10px] bg-[#D9D9D9] outline-[#D9D9D9] w-[250px] xl:w-[950px] outline text-black text-[10px] xl:text-[20px] py-2  font-bold rounded-2xl pr-[80px] pl-5 ml-[25px] mb-3">
          <div className="ml-0 xl:ml-[45px] w-[100px]">{number}</div>
          <div className="ml-0 xl:-ml-[75px] w-[400px]">{name}</div>
          <div className="ml-3 xl:-ml-[48px] w-[300px]">{surname}</div>
          {status == "LEAVE ON PERMISSION" ? (
            <div className="-ml-[100px] w-[1000px]">{status}</div>
          ) : (
            <div className="ml-10 text-center">{status}</div>
          )}
        </div>
      ) : (
        <div
          onClick={() => {
            window.location.href = `/class/${key}/studentinfo/${itemID}`;
          }}
          className="cursor-pointer float-left text-left grid grid-cols-4 gap-10 xl:gap-56 mt-[10px] bg-[#D9D9D9] outline-[#D9D9D9] w-[250px] xl:w-[950px] outline text-black text-[10px] xl:text-[20px] py-2  font-bold rounded-2xl pr-[80px] pl-5 ml-[25px] mb-3  "
        >
          <div className="-ml-1 xl:ml-[45px] w-[100px]">{number}</div>
          <div className="-ml-5 xl:-ml-[75px] w-[400px]">{name}</div>
          <div className="ml-1 xl:-ml-[48px] w-[300px]">{surname}</div>
          {status == "LEAVE ON PERMISSION" ? (
            <div className="-ml-[100px] w-[1000px]">{status}</div>
          ) : (
            <div className="ml-10 text-center">{status}</div>
          )}
        </div>
      )}
    </>
  );
}

export default StudentBar;
