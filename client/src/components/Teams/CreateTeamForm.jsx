import React, { useState, useContext } from "react";
import axios from "axios";
import { NavbarContext } from "../Navbar/NavbarContext";
import { useNavigate } from "react-router-dom";

const CreateTeamForm = () => {
  var { mobileNav, setMobileNav } = useContext(NavbarContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    team_name: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const createTeam = (event) => {
    event.preventDefault();

    if (formData.team_name.length <= 0 || formData.description.length <= 0) {
      alert("All the fields need to be filled");
    } else {
      // Send a request to the server to create the specified team
      axios
        .post("http://127.0.0.1:3000/teams/add-team", formData)
        .then((res) => {
          if (res.status === 201) {
            navigate("/teams");
            window.location.reload(true);
          }
        })
        .catch((error) => {
          // Handle register errors
          alert("Error creating new team");
        });
    }
  };

  return (
    <div className="w-full h-screen bg-[#16122b] text-gray-300">
      <div className={mobileNav ? "hidden" : "flex flex-col justify-center items-center w-full h-full"}>
        <div className="grid-container w-auto h-auto sm:w-full">
          {/* DIV CONTAINING THE TITLE */}
          <div className="grid-item-title">
            <h1 className="text-center text-4xl text-white bg-[#415191] rounded-t-lg border-b-[1px] border-black p-4">Create Team</h1>
          </div>
          {/* DIV CONTAINING THE NEW TEAM FORM */}
          <form onSubmit={createTeam} className="grid grid-cols-1 grid-rows-3">
            {/* ROW 1 - NEW TEAM NAME DATA */}
            <div className="row-[1_/_1] grid grid-cols-1 grid-row-1">
              <label className="row-[1_/_1] text-right text-[24px] w-auto bg-[#55608f]">Team Name:</label>
              <input name="team_name" placeholder="Team Name" className="row-[1_/_1] text-[24px] w-auto sm:w-[30em] text-black text-center" type="text" value={formData.team_name} onChange={handleChange} />
            </div>
            {/* ROW 3 - NEW TEAM DESCRIPTION */}
            <div className="row-[2_/_2] grid grid-cols-1 grid-row-1">
              <label className="row-[1_/_1] text-right text-[24px] w-auto bg-[#55608f] border-t border-black">Description:</label>
              <input name="description" placeholder="Description" className="row-[1_/_1] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" type="text" value={formData.description} onChange={handleChange} />
            </div>
            {/* ROW 4 - CREATE TEAM BUTTON */}
            <div className="row-[3_/_3] grid grid-cols-1 grid-row-1">
              <button type="submit" className="text-white border-2 px-6 py-3 flex justify-center items-center hover:bg-green-600 hover:border-green-600">
                Create Team
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamForm;
