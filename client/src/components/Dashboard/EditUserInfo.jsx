import React, { useState, useContext } from "react";
import { NavbarContext } from "../Navbar/NavbarContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditUserInfo = () => {
  var { mobileNav, setMobileNav } = useContext(NavbarContext);
  const navigate = useNavigate();
  const current_id = localStorage.getItem("id");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function update() {
    if (password.length <= 0 || username.length <= 0) {
      alert("Password or username is empty!!");
    } else {
      axios
        .post(`http://localhost:3000/users/update-credentials`, { id: current_id, user_name: username, password: password })
        .then(function (response) {
          alert("Password and username have being changed!!");
          navigate("/Dashboard");
        })
        .catch(function (error) {});
    }
  }

  return (
    <div className="w-full h-screen bg-[#16122b] text-[#000000]">
      <div className={mobileNav ? "hidden" : "flex flex-col justify-center items-center w-full h-full"}>
        <div className="grid grid-cols-1 grid-rows-1 drop-shadow-[0_0.188em_1.550em_rgb(156,156,156)]">
          <div className="grid grid-rows-4 bg-[#D3D3D3] rounded-xl">
            <div className="row-[1_/_1] grid grid-cols-2 justify-center items-center w-full bg-[#ECF2F3] rounded-t-xl">
              <p className="text-[24px] pl-2 text-right">Old Username:</p>
              <p className="text-[24px] pr-2">&nbsp;Username</p>
            </div>
            <div className="row-[2_/_2] grid grid-cols-2 justify-center items-center w-full bg-[#ECF2F3]">
              <p className="text-[24px] pl-2 text-right">New Username:</p>
              <input type="username" placeholder="Username" className="text-[24px] pr-2 pl-2" value={username} onChange={handleChange}></input>
            </div>
            <div className="row-[3_/_3] grid grid-cols-2 justify-center items-center w-full bg-[#ECF2F3]">
              <p className="text-[24px] pl-2 text-right">New Password:</p>
              <input type="password" placeholder="Password" className="text-[24px] pr-2 pl-2" value={password} onChange={handlePasswordChange}></input>
            </div>
            <div className="row-[4_/_4] flex flex-col justify-center items-center w-full">
              <button onClick={update} className="text-[#000000] text-[20px] border-2 px-6 py-3 my-2 flex justify-center items-center rounded bg-[#CECDF3] border-[#CECDF3] hover:border-[#000000]">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfo;
