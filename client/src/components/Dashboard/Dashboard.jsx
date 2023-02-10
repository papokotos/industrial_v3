import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarContext } from "../Navbar/NavbarContext";
import axios from "axios";

const Dashboard = () => {
  var { mobileNav, setMobileNav } = useContext(NavbarContext);
  const navigate = useNavigate();
  function editUserInfo() {
    navigate("/editUserInfo");
  }
  const current_id = localStorage.getItem("id");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${current_id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div name="dashboard" className="w-full h-screen bg-[#16122b] text-[#000000]">
      <div className={mobileNav ? "hidden" : "flex flex-col justify-center items-center w-full h-full"}>
        <div className="grid grid-cols-1 grid-rows-2 drop-shadow-[0_0.188em_1.550em_rgb(156,156,156)]">
          {/* ROW 1 - IMAGE AND ACCOUNT INFORMATION */}
          <div className="h-[20rem] row-[1_/_1] grid grid-cols-2 grid-rows-1 bg-[#D3D3D3] rounded-t-xl">
            {/* ROW 1 - COLUMN 1 - PROFILE IMAGE*/}
            <div className="h-[20rem] col-[1_/_1] flex flex-col justify-center items-center w-full">
              <img src="https://i.imgur.com/XcpK8LQ.png" className="block h-[90%] mx-auto rounded-full cursor-pointer" />
            </div>
            {/* ROW 1 - COLUMNT 2 - ACCOUNT INFORMATION*/}
            <div className="h-[20rem] col-[2_/_2] grid grid-cols-1 grid-rows-2">
              {/* DIV CONTAINING IMPORTANT INFO */}
              <div className="grid grid-cols-1 grid-rows-1 w-full">
                <div>
                  <p className="p-2 border-b-2 border-[#000000] text-center text-[36px]">Account Information</p>
                  {/* DIV CONTAINING IMPORTANT INFO CONTENTS*/}
                  <div className="grid grid-cols-2">
                    {/* DIV CONTAINING IMPORTANT INFO DATA NAMES */}
                    <div className="grid grid-cols-1 grid-rows-2 border-r-2 rounded-br border-r-black text-right items-center">
                      <p className="px-2 text-[24px] bg-[#ECF2F3]" htmlFor="user">
                        Username:
                      </p>
                      <p className="px-2 text-[24px] rounded-bl rounded-br bg-[#ECF2F3]" htmlFor="pword">
                        Rank:
                      </p>
                    </div>
                    {/* DIV CONTAINING IMPORNTANT INFO DATA */}
                    <div className="grid grid-cols-1 grid-rows-2 items-center w-[150px]">
                      <p className="text-[24px] px-2">{data.user_name}</p>
                      <p className="text-[24px] px-2">{data.rank}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <button onClick={editUserInfo} className="text-[#000000] border-2 px-6 py-3 my-2 flex justify-center items-center rounded bg-[#CECDF3] border-white hover:border-[#000000]">
                  Edit User Info
                </button>
              </div>
            </div>
          </div>
          {/* ROW 2 - PERSONAL INFORMATION*/}
          <div className="h-[20rem] row-[2_/_2] grid grid-cols-1 grid-rows-2 bg-[#D3D3D3] rounded-b-xl">
            <div>
              {/* DIV CONTAINING PERSONAL INFORMATION*/}
              <p className="row-[1_/_1] border-b-2 border-[#000000] text-center text-[36px]">Personal Information</p>
              {/* DIV CONTAINING PERSONAL INFO CONTENTS*/}
              <div className="row-[2_/_2] grid grid-cols-2">
                {/* DIV CONTAINING PERSONAL INFO DATA NAMES */}
                <div className="grid grid-cols-1 grid-rows-5 border-r-2 rounded-br border-r-black text-right items-center">
                  <p className="text-[24px] px-2 bg-[#ECF2F3]">First Name:</p>
                  <p className="text-[24px] px-2 bg-[#ECF2F3]">Last Name:</p>
                  <p className="text-[24px] px-2 bg-[#ECF2F3]">email:</p>
                  <p className="text-[24px] px-2 bg-[#ECF2F3]">Age:</p>
                  <p className="text-[24px] px-2 bg-[#ECF2F3]">Assigned Team:</p>
                  <p className="text-[24px] px-2 bg-[#ECF2F3] rounded-br">Phone Number:</p>
                </div>
                {/* DIV CONTAINING PERSONAL INFO DATA */}
                <div className="grid grid-cols-1 grid-rows-5 items-center">
                  <p className="text-[24px] px-2">{data.first_name}</p>
                  <p className="text-[24px] px-2">{data.last_name}</p>
                  <p className="text-[24px] px-2">{data.email}</p>
                  <p className="text-[24px] px-2">{data.age}</p>
                  <p className="text-[24px] px-2">{data.assigned_team}</p>
                  <p className="text-[24px] px-2">{data.phone_number}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
