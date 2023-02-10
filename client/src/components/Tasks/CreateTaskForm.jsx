import React, { useState, useContext } from "react";
import { NavbarContext } from "../Navbar/NavbarContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTaskForm = () => {
  var { mobileNav, setMobileNav } = useContext(NavbarContext);
  const navigate = useNavigate();

  const id = localStorage.getItem("id");

  const [formData, setFormData] = useState({
    task_name: "",
    assigned_to: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const createTask = (event) => {
    event.preventDefault();

    if (formData.task_name.length <= 0 || formData.description.length <= 0) {
      alert("All the fields need to be filled");
    } else {
      // Send a request to the server to create the specified task
      axios
        .post("http://127.0.0.1:3000/tasks/add-task", {
          task_name: formData.task_name,
          assigned_to: formData.assigned_to,
          assigned_from: id,
          description: formData.description,
        })
        .then((res) => {
          if (res.status === 201) {
            alert("Task created succesfully!");
            navigate("/tasks");
          }
        })
        .catch((error) => {
          // Handle register errors
          alert("Error creating new task");
        });
    }
  };

  return (
    <div className="w-full h-screen bg-[#16122b] text-gray-300">
      <div className={mobileNav ? "hidden" : "flex flex-col justify-center items-center w-full h-full"}>
        <div className="grid-container w-auto h-auto sm:w-full">
          {/* DIV CONTAINING THE TITLE */}
          <div className="grid-item-title">
            <h1 className="text-center text-4xl text-white bg-[#415191] rounded-t-lg border-b-[1px] border-black p-4">Create Task</h1>
          </div>
          {/* DIV CONTAINING THE NEW TASK FORM */}
          <form onSubmit={createTask} className="grid grid-cols-1 grid-rows-4">
            {/* ROW 1 - NEW TASK NAME */}
            <div className="row-[1_/_1] grid grid-cols-1 grid-row-1">
              <label className="row-[1_/_1] text-right text-[24px] flex justify-end items-center w-auto bg-[#55608f]">Task Name:</label>
              <input name="task_name" placeholder="Task Name" className="row-[1_/_1] text-[24px] w-auto sm:w-[30em] text-black text-center" type="text" value={formData.task_name} onChange={handleChange} />
            </div>
            {/* ROW 2 - NEW TASK ASSIGNEE */}
            <div className="row-[2_/_2] grid grid-cols-1 grid-row-1">
              <label className="row-[1_/_1] text-right text-[24px] flex justify-end items-center w-auto bg-[#55608f] border-t border-black">Assigned to:</label>
              <input name="assigned_to" placeholder="User ID" className="row-[1_/_1] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" type="number" value={formData.assigned_to} onChange={handleChange} />
            </div>
            {/* ROW 3 - NEW TEAM DESCRIPTION */}
            <div className="row-[3_/_3] grid grid-cols-1 grid-row-1">
              <label className="row-[1_/_1] text-right text-[24px] flex justify-end items-center w-auto bg-[#55608f] border-t border-black">Description:</label>
              <input name="description" placeholder="Description" className="row-[1_/_1] text-[24px] w-auto sm:w-[30em] text-black text-center border-t border-black" type="text" value={formData.description} onChange={handleChange} />
            </div>
            {/* ROW 4 - CREATE TEAM BUTTON */}
            <div className="row-[4_/_4] grid grid-cols-1 grid-row-1">
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

export default CreateTaskForm;
