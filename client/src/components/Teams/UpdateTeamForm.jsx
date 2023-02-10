import React, { useState, useContext } from "react";
import { NavbarContext } from "../Navbar/NavbarContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateTeamForm = () => {
  var { mobileNav, setMobileNav } = useContext(NavbarContext);
  const navigate = useNavigate();
  const rank = localStorage.getItem("rank");

  const [formData, setFormData] = useState({
    team_id: "",
    user_add_id: "",
    user_delete_id: "",
    leader_id: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const addUser = (event) => {
    if (rank === "manager" || rank === "admin") {
      event.preventDefault();
      if (formData.team_id.length <= 0 || formData.user_add_id.length <= 0) {
        alert("All the fields need to be filled");
      } else {
        const t_id = formData.team_id;
        const u_id = formData.user_add_id;
        // Send a request to the server to create the specified User
        axios
          .post("http://127.0.0.1:3000/teams/add-user", { team_id: t_id, user_id: u_id })
          .then((res) => {
            if (res.status === 201) {
              navigate("/teams");
              window.location.reload(true);
            }
          })
          .catch((error) => {
            // Handle register errors
            alert("Error adding user");
          });
      }
    } else {
      alert("Your rank is not sufficient!!");
    }
  };

  const removeUser = (event) => {
    if (rank === "manager" || rank === "admin") {
      event.preventDefault();
      if (formData.team_id.length <= 0 || formData.user_delete_id.length <= 0) {
        alert("All the fields need to be filled");
      } else {
        const t_id = formData.team_id;
        const u_id = formData.user_delete_id;
        // Send a request to the server to create the specified User
        axios
          .post("http://127.0.0.1:3000/teams/remove-user", { team_id: t_id, user_id: u_id })
          .then((res) => {
            if (res.status === 201) {
              navigate("/teams");
              window.location.reload(true);
            }
          })
          .catch((error) => {
            // Handle register errors
            console.log(error);
          });
      }
    } else {
      alert("Your rank is not sufficient!!");
    }
  };

  const addLeader = (event) => {
    if (rank === "manager" || rank === "admin") {
      event.preventDefault();
      if (formData.leader_id.length <= 0 || formData.team_id.length <= 0) {
        alert("All the fields need to be filled");
      } else {
        const t_id = formData.team_id;
        const l_id = formData.leader_id;
        // Send a request to the server to create the specified User
        axios
          .post("http://127.0.0.1:3000/teams/add-leader", { team_id: t_id, leader: l_id })
          .then((res) => {
            if (res.status === 201) {
              navigate("/teams");
              window.location.reload(true);
            }
          })
          .catch((error) => {
            // Handle register errors
            alert("Error adding Leader");
          });
      }
    } else {
      alert("Your rank is not sufficient!!");
    }
  };

  return (
    <div className="w-full h-screen bg-[#16122b] text-gray-300">
      <div className={mobileNav ? "hidden" : "flex flex-col justify-center items-center w-full h-full"}>
        <div className="grid-container w-auto h-auto sm:w-full">
          {/* DIV CONTAINING THE NEW USER FORM */}
          <div className="grid grid-cols-1 grid-rows-4">
            {/* ROW 1 - TEAM ID TO UPDATE */}
            <div className="row-[1_/_1] grid grid-cols-1 grid-row-1 w-auto">
              {/* DIV CONTAINING THE TITLE */}
              <div className="grid-item-title flex flex-row">
                <h1 className="text-center text-4xl text-white bg-[#415191] rounded-tl-lg border-b-[1px] border-black p-4 w-full">Update Teams</h1>
                <div>
                  <input value={formData.team_id} onChange={handleChange} name="team_id" placeholder="ID" className="text-[24px] text-center text-black rounded-tr-lg h-full border-b border-black" type="number"></input>
                </div>
              </div>
            </div>
            {/* ROW 2 - NEW USER TO ADD TO TEAM */}
            <div className="row-[2_/_2] grid grid-cols-2 grid-row-1 w-auto">
              <label className="row-[1_/_1] col-[1_/_1] flex items-center justify-end text-[24px] w-auto bg-[#55608f] ">User ID:</label>
              <div className="row-[1_/_1] col-[2_/_2] grid grid-cols-2">
                <input value={formData.user_add_id} onChange={handleChange} type="number" name="user_add_id" placeholder="User ID to ADD" className="row-[1_/_1] text-[24px] text-black text-center" />
                <button onClick={addUser} className="text-white border-2 px-6 py-3 flex justify-center items-center hover:bg-[#7F4000] hover:border-[#7F4000]">
                  Add User to Team
                </button>
              </div>
            </div>
            {/* ROW 3 - USER ID TO DELETE FROM TEAM */}
            <div className="row-[3_/_3] grid grid-cols-2 grid-row-1 w-auto">
              <label className="row-[1_/_1] col-[1_/_1] flex items-center justify-end text-[24px] w-auto bg-[#55608f] ">User ID:</label>
              <div className="row-[1_/_1] col-[2_/_2] grid grid-cols-2">
                <input value={formData.user_delete_id} onChange={handleChange} type="number" name="user_delete_id" placeholder="User ID to REMOVE" className="row-[1_/_1] text-[24px] text-black text-center" />
                <button onClick={removeUser} className="text-white border-2 px-6 py-3 flex justify-center items-center hover:bg-[#7F4000] hover:border-[#7F4000]">
                  Remove User from Team
                </button>
              </div>
            </div>
            {/* ROW 2 - NEW LEADER TO ADD TO TEAM */}
            <div className="row-[4_/_4] grid grid-cols-2 grid-row-1 w-auto">
              <label className="row-[1_/_1] col-[1_/_1] flex items-center justify-end text-[24px] w-auto bg-[#55608f] rounded-bl-lg">Leader ID:</label>
              <div className="row-[1_/_1] col-[2_/_2] grid grid-cols-2">
                <input value={formData.leader_id} onChange={handleChange} type="number" name="leader_id" placeholder="Leader ID to ADD" className="row-[1_/_1] text-[24px] text-black text-center" />
                <button onClick={addLeader} className="text-white border-2 px-6 py-3 flex justify-center items-center hover:bg-[#7F4000] hover:border-[#7F4000] rounded-br-lg">
                  Add Leader to Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTeamForm;
