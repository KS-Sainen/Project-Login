import { useParams } from "react-router-dom";
import pb from "./database/pb.js";
import React from "react";
import { useEffect, useState } from "react";
import iconRevert from "../public/icon_revert.png";
import icon from "../public/icon.png";

export default function InfoPage() {
  const { room } = useParams();
  const { key } = useParams();
  const [imagePath, setImagePath] = useState();
  const [info, setInfo] = useState({});
  const [status, setStatus] = useState();
  const roomLabel = room[0] + "." + room[1] + "/" + room[2];

  const searchImagePath = async () => {
    const record = await pb.collection(room).getOne(key, {});
    let path = {};

    record.pictures.forEach((item) => {
      if (item.startsWith("main")) {
        path = item;
      }
    });
    return { record, path };
  };

  useEffect(() => {
    const getImagePath = async () => {
      searchImagePath().then((data) => {
        setImagePath(
          "https://sadtsdatamanage.pockethost.io/api/files/" +
            room +
            "/" +
            key +
            "/" +
            data.path
        );
        setInfo(data.record);
        setStatus(data.record.arrival_status);
      });
    };

    getImagePath();
    pb.collection(key).subscribe("*", function (e) {
      getImagePath();
    });
  }, []);

  const data = [
    [
      "FULL NAME",
      `${String(info.name).toUpperCase()} ${String(
        info.surname
      ).toUpperCase()}`,
    ],
    ["CLASS", String(roomLabel).toUpperCase()],
    ["SCHOOL ID", info.school_id],
    ["PHONE NUMBER", info.phone_number],
  ];

  return (
    <>
      <nav className="h-20 lg:h-[150px] w-full justify-center bg-[#59A3F9] flex">
        <div className="items-center lg:pt-[15px] flex mx-2 lg:mx-10">
          <img src={icon} className="w-12 h-12 lg:w-[121px] lg:h-[121px]" />
          <div className="flex items-center">
            <div className="flex flex-col gap-y-1 lg:gap-y-5 items-center justify-center">
              <div className="text-center  text-base lg:text-3xl text-white font font-semibold tracking-normal lg:tracking-widest">
                Student Arrival & Departure System
              </div>
              <div className="text-center text-sm lg:text-2xl text-white font-thin">
                Student Identification
              </div>
            </div>
          </div>
          <img />
          <img
            src={iconRevert}
            className="w-12 h-12 lg:w-[121px] lg:h-[121px]"
          />
        </div>
      </nav>

      <div className="flex flex-1 flex-col lg:flex-row w-full h-full text-white items-center">
        <img
          src={imagePath}
          className="outline outline-black lg:outline-[5px] h-[200px] lg:h-[509px] mt-7 lg:mt-[42.5px] w-[160px] lg:w-[400px] ml-5 lg:ml-[100px]"
        />
        <div className="flex flex-col lg:mx-20 my-20 lg:my-0 space-y-10">
          {data.map((item) => (
            <div className="flex space-x-6">
              <div className="font-semibold">{item[0]}:</div>
              <div>{item[1]}</div>
            </div>
          ))}
          <div className="flex space-x-6">
            <div className="font-semibold">TODAY'S STATUS:</div>
            <select
              value={status}
              onChange={(e) => {
                pb.collection(room).update(key, {
                  arrival_status: e.target.value,
                });
                setStatus(e.target.value);
              }}
              className="text-black"
            >
              <option style={{ display: "none" }} />
              <option value="present">PRESENT</option>
              <option value="absent">ABSENT</option>
              <option value="late">LATE</option>
              <option value="lop">LEAVE ON PERMISSION</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
