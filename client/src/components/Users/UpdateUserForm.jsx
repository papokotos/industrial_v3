import React, { useState, useContext } from "react";
import axios from "axios";
import { NavbarContext } from "../Navbar/NavbarContext";
import { useNavigate } from "react-router-dom";

const UpdateUserForm = (_props) => {
  var { mobileNav, setMobileNav } = useContext(NavbarContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    rank: "",
    age: "",
    phone_number: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateUser = (event) => {
    event.preventDefault();
    if (formData.age.length <= 0 || formData.email.length <= 0 || formData.first_name.length <= 0 || formData.last_name.length <= 0 || formData.rank.length <= 0 || formData.phone_number.length <= 0 || formData.id.length <= 0) {
      alert("All the fields need to be filled");
    } else {
      // Send a request to the server to create the specified User
      axios
        .post("http://127.0.0.1:3000/users/update", formData)
        .then((res) => {
          if (res.status === 201) {
            alert("user updated succesfully!");
            navigate("/users");
          }
        })
        .catch((error) => {
          // Handle register errors
          alert("Error updating user");
        });
    }
  };

  return (
    <div className="w-full h-screen bg-[#16122b] text-gray-300">
      <div className={mobileNav ? "hidden" : "flex flex-col justify-center items-center w-full h-full"}>
        <div className="grid-container w-auto h-auto sm:w-full">
          {/* DIV CONTAINING THE NEW USER FORM */}
          <form onSubmit={updateUser} className="grid grid-cols-1 grid-rows-8">
            <div className="row-[1_/_1]">
              {/* DIV CONTAINING THE TITLE */}
              <div className="grid-item-title flex flex-row">
                <h1 className="text-center text-4xl text-white bg-[#415191] rounded-tl-lg border-b-[1px] border-black p-4 w-full">Update User</h1>
                <div>
                  <input value={formData.id} onChange={handleChange} name="id" placeholder="ID" className="text-[24px] text-center text-black rounded-tr-lg h-full border-b border-black"></input>
                </div>
              </div>
            </div>
            {/* ROW 1 - FIRST NAME DATA */}
            <div className="row-[2_/_2] grid grid-cols-1 grid-row-1 w-auto">
              <label className="row-[2_/_2] text-right text-[24px] w-auto bg-[#55608f] ">First Name:</label>
              <input name="first_name" placeholder="First Name" className="row-[2_/_2] text-[24px] w-auto sm:w-[30em] text-black text-center" type="text" value={formData.first_name} onChange={handleChange} />
            </div>
            {/* ROW 2 - LAST NAME DATA */}
            <div className="row-[3_/_3] grid grid-cols-1 grid-row-1">
              <label className="row-[3_/_3] text-right text-[24px] w-auto bg-[#55608f] border-t border-black ">Last Name:</label>
              <input name="last_name" placeholder="Last Name" className="row-[3_/_3] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" type="text" value={formData.last_name} onChange={handleChange} />
            </div>
            {/* ROW 3 - EMAIL DATA */}
            <div className="row-[4_/_4] grid grid-cols-1 grid-row-1">
              <label className="row-[4_/_4] text-right text-[24px] w-auto bg-[#55608f] border-t border-black ">E-mail:</label>
              <input name="email" placeholder="E-mail" className="row-[4_/_4] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" type="text" value={formData.email} onChange={handleChange} />
            </div>
            {/* ROW 4 - RANK DATA */}
            <div className="row-[5_/_5] grid grid-cols-1 grid-row-1">
              <label className="row-[5_/_5] text-right text-[24px] w-auto bg-[#55608f] border-t border-black ">Role:</label>
              <select name="rank" className="row-[5_/_5] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            {/* ROW 5 - AGE DATA */}
            <div className="row-[6_/_6] grid grid-cols-1 grid-row-1">
              <label className="row-[6_/_6] text-right text-[24px] w-auto bg-[#55608f] border-t border-black ">Age:</label>
              <input name="age" placeholder="Age" className="row-[6_/_6] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" type="number" value={formData.age} onChange={handleChange} />
            </div>
            {/* ROW 6 - PHONE NUMBER DATA */}
            <div className="row-[7_/_7] grid grid-cols-1 grid-row-1">
              <label className="row-[7_/_7] text-right text-[24px] w-auto bg-[#55608f] border-t border-black ">Phone Number:</label>
              <input name="phone_number" placeholder="Phone Number" className="row-[7_/_7] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" type="text" value={formData.phone_number} onChange={handleChange} />
            </div>
            <div className="row-[8_/_8] grid grid-cols-1 grid-row-1">
              <button type="submit" className="text-white border-2 px-6 py-3 flex justify-center items-center hover:bg-[#7F4000] hover:border-[#7F4000] rounded-b-lg">
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserForm;
