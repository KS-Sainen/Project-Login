import pb from "./database/pb.js";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentBar from "./prefab/nameinfo.jsx";
import { get, set } from "react-hook-form";
import { data } from "autoprefixer";

export default function ClassHome() {
  const { key } = useParams();
  const [nameList, setNameList] = useState([]);
  const [info, setInfo] = useState({});

  const isLoggedIn = pb.authStore.isValid;
  const roomLabel = key[0] + "." + key[1] + "/" + key[2];

  if (!isLoggedIn) {
    return (window.location.href = "/class");
  }

  const getInfo = async () => {
    const keyData = await pb.collection(key).getFullList({});
    keyData.sort((a, b) => a.number - b.number);
    const countTotal = keyData.length;
    let countNumPresent = 0;
    let countNumAbsent = 0;
    let countNumLate = 0;
    let countNumLOP = 0;
    keyData.forEach((item) => {
      switch (item.arrival_status) {
        case "present":
          countNumPresent += 1;
          break;
        case "absent":
          countNumAbsent += 1;
          break;
        case "late":
          countNumLate += 1;
          break;
        case "lop":
          countNumLOP += 1;
          break;
      }
    });
    return {
      keyData,
      countNumPresent,
      countNumAbsent,
      countNumLate,
      countNumLOP,
      countTotal,
    };
  };

  useEffect(() => {
    const getAllList = async () => {
      await getInfo().then((data) => {
        setNameList(data.keyData);
        setInfo(data);
      });
    };

    getAllList();
    pb.collection(key).subscribe("*", function (e) {
      getAllList();
    });
  }, []);

  return (
    <>
      <center className="pt-8 xl:pt-16">
        <div className="mr-[222px] xl:mr-[1123px] bg-[#424345] w-[128px] h-[50px] xl:w-[328px] xl:h-[110px] rounded-t-[30px] xl:rounded-t-[50px]">
          <div className="tracking-widest text-white pt-3 xl:pt-8 text-2xl xl:text-5xl font-semibold">
            {roomLabel.toUpperCase()}
          </div>
        </div>
        <div className="cursor-default bg-[#5A5B5C] w-[350px] h-[700px] xl:w-[1450px] xl:h-[500px] rounded-tr-[50px] rounded-b-[50px]">
          <div className="float-left w-[290px] h-[340px] xl:w-[1000px] xl:h-[440px] mt-[30px] outline-[#D9D9D9] outline text-black text-xs xl:text-2xl py-2 font-bold rounded-2xl ml-[25px]">
            <div className="float-left text-left grid grid-cols-4 gap-10 xl:gap-56 mt-[10px] bg-gray-300 outline-[#D9D9D9] w-[250px] xl:w-[950px] outline text-gray-500 text-xs xl:text-2xl py-2 font-bold rounded-2xl pr-[80px] pl-5 ml-[25px] mb-3">
              <div className="-ml-1 xl:ml-[45px]">No.</div>
              <div className="-ml-5 xl:-ml-[75px]">Name</div>
              <div className="ml-1 xl:-ml-[48px]">Surname</div>
              <div className="ml-10 xl:ml-[1px]">Status</div>
            </div>
            <div className="overflow-y-scroll overflow-x-hidden scrollbar-hide w-[290px] h-[340px] xl:w-[1000px] xl:h-[360px] text-black text-xs xl:text-2xl font-bold ">
              {nameList.map((item) => (
                <StudentBar
                  key={item.id}
                  itemID={item.id}
                  name={String(item.name).toUpperCase()}
                  surname={String(item.surname).toUpperCase()}
                  number={item.number}
                  status={
                    item.arrival_status == "lop"
                      ? "LEAVE ON PERMISSION"
                      : String(item.arrival_status).toUpperCase()
                  }
                />
              ))}
            </div>
          </div>

          {/*activity box*/}
          <div className="cursor-default bg-[#D9D9D9] w-[320px] h-[270px] xl:w-[300px] xl:h-[450px] float-right mr-[17px] xl:mr-[60px] mt-[30px] xl:mt-[25px] rounded-3xl">
            <div className="text-sm xl:text-xl mt-4 xl:mt-5 font-extrabold">
              STUDENT ATTENDANCE
            </div>
            <div className="grid gap-y-[20px] xl:gap-y-[30px] grid-cols-2 text-xs xl:text-xl mt-5 xl:mt-10 font-bold">
              <span>CATEGORIES</span>
              <span>AMOUNT</span>
              <span className="font-semibold">PRESENT</span>
              <span className="font-semibold">
                {info.countNumPresent <= 9
                  ? "0" + info.countNumPresent
                  : info.countNumPresent}
              </span>
              <span className="font-semibold">ABSENT</span>
              <span className="font-semibold">
                {info.countNumAbsent <= 9
                  ? "0" + info.countNumAbsent
                  : info.countNumAbsent}
              </span>
              <span className="font-semibold">LATE</span>
              <span className="font-semibold">
                {info.countNumLate <= 9
                  ? "0" + info.countNumLate
                  : info.countNumLate}
              </span>
              <span className="font-semibold text-xs xl:text-[16px] xl:-mt-3 ml-1.5">
                LEAVE ON PERMISSION
              </span>
              <span className="font-semibold">
                {info.countNumLOP <= 9
                  ? "0" + info.countNumLOP
                  : info.countNumLOP}
              </span>
              <span className="font-semibold">TOTAL</span>
              <span className="font-semibold">
                {info.countTotal <= 9 ? "0" + info.countTotal : info.countTotal}
              </span>
            </div>
          </div>
        </div>
      </center>
    </>
  );
}
