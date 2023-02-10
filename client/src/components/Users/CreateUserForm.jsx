import React, { useState, useContext } from "react";
import axios from "axios";
import { NavbarContext } from "../Navbar/NavbarContext";
import { useNavigate } from "react-router-dom";

const CreateUserForm = (_props) => {
  var { mobileNav, setMobileNav } = useContext(NavbarContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    password: "",
    email: "",
    rank: "",
    age: "",
    phone_number: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const createUser = (event) => {
    event.preventDefault();

    if (formData.age.length <= 0 || formData.email.length <= 0 || formData.first_name.length <= 0 || formData.last_name.length <= 0 || formData.password.length <= 0 || formData.rank.length <= 0 || formData.phone_number.length <= 0 || formData.user_name.length <= 0) {
      alert("All the fields need to be filled");
    } else {
      // Send a request to the server to create the specified User
      axios
        .post("http://127.0.0.1:3000/users/register", formData)
        .then((res) => {
          if (res.status === 201) {
            navigate("/users");
            window.location.reload(true);
          }
        })
        .catch((error) => {
          // Handle register errors
          alert("Error creating new user");
        });
    }
  };

  return (
    <div className="w-full h-screen bg-[#16122b] text-gray-300">
      <div className={mobileNav ? "hidden" : "flex flex-col justify-center items-center w-full h-full"}>
        <div className="grid-container w-auto h-auto sm:w-full">
          {/* DIV CONTAINING THE TITLE */}
          <div className="grid-item-title">
            <h1 className="text-center text-4xl text-white bg-[#415191] rounded-t-lg border-b-[1px] border-black p-4">Create User</h1>
          </div>
          {/* DIV CONTAINING THE NEW USER FORM */}
          <form onSubmit={createUser} className="grid grid-cols-1 grid-rows-8">
            {/* ROW 1 - FIRST NAME DATA */}
            <div className="row-[1_/_1] grid grid-cols-1 grid-row-1">
              <label className="row-[1_/_1] text-right text-[24px] w-auto bg-[#55608f] ">First Name:</label>
              <input name="first_name" placeholder="First Name" className="row-[1_/_1] text-[24px] w-auto sm:w-[30em] text-black text-center" type="text" value={formData.first_name} onChange={handleChange} />
            </div>
            {/* ROW 2 - LAST NAME DATA */}
            <div className="row-[2_/_2] grid grid-cols-1 grid-row-1">
              <label className="row-[1_/_1] text-right text-[24px] w-auto bg-[#55608f] border-t border-black ">Last Name:</label>
              <input name="last_name" placeholder="Last Name" className="row-[1_/_1] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" type="text" value={formData.last_name} onChange={handleChange} />
            </div>
            {/* ROW 3 - USERNAME DATA */}
            <div className="row-[3_/_3] grid grid-cols-1 grid-row-1">
              <label className="row-[1_/_1] text-right text-[24px] w-auto bg-[#55608f] border-t border-black ">Username:</label>
              <input name="user_name" placeholder="Username" className="row-[1_/_1] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" type="text" value={formData.user_name} onChange={handleChange} />
            </div>
            {/* ROW 4 - PASSWORD DATA */}
            <div className="row-[4_/_4] grid grid-cols-1 grid-row-1">
              <label className="row-[1_/_1] text-right text-[24px] w-auto bg-[#55608f] border-t border-black ">Password:</label>
              <input name="password" placeholder="Password" className="row-[1_/_1] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" type="password" value={formData.password} onChange={handleChange} />
            </div>
            {/* ROW 5 - EMAIL DATA */}
            <div className="row-[5_/_5] grid grid-cols-1 grid-row-1">
              <label className="row-[1_/_1] text-right text-[24px] w-auto bg-[#55608f] border-t border-black ">E-mail:</label>
              <input name="email" placeholder="E-mail" className="row-[1_/_1] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" type="text" value={formData.email} onChange={handleChange} />
            </div>
            {/* ROW 6 - RANK DATA */}
            <div className="row-[6_/_6] grid grid-cols-1 grid-row-1">
              <label className="row-[1_/_1] text-right text-[24px] w-auto bg-[#55608f] border-t border-black ">Role:</label>
              <select name="rank" className="row-[1_/_1] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" onChange={handleChange}>
                <option value="admin">admin</option>
                <option value="manager">manager</option>
                <option value="employee">employee</option>
              </select>
            </div>
            {/* ROW 7 - AGE DATA */}
            <div className="row-[7_/_7] grid grid-cols-1 grid-row-1">
              <label className="row-[1_/_1] text-right text-[24px] w-auto bg-[#55608f] border-t border-black ">Age:</label>
              <input name="age" placeholder="Age" className="row-[1_/_1] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" type="number" value={formData.age} onChange={handleChange} />
            </div>
            {/* ROW 8 - PHONE NUMBER DATA */}
            <div className="row-[8_/_8] grid grid-cols-1 grid-row-1">
              <label className="row-[1_/_1] text-right text-[24px] w-auto bg-[#55608f] border-t border-black ">Phone Number:</label>
              <input name="phone_number" placeholder="Phone Number" className="row-[1_/_1] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" type="text" value={formData.phone_number} onChange={handleChange} />
            </div>
            <div className="row-[9_/_9] grid grid-cols-1 grid-row-1">
              <button type="submit" className="text-white border-2 px-6 py-3 flex justify-center items-center hover:bg-green-600 hover:border-green-600 rounded-b-lg">
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
