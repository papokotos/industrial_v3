import { useMemo, useState, useContext } from "react";
import { NavbarContext } from "../Navbar/NavbarContext";
import { COLUMNS } from "./teamColumns";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeamsTable = ({ mockData }) => {
  var { mobileNav, setMobileNav } = useContext(NavbarContext);
  const navigate = useNavigate();
  const columns = useMemo(() => COLUMNS, []); // memoize before adding to useTable hook
  const data = useMemo(() => [...mockData], [mockData]);
  const rank = localStorage.getItem("rank");
  const [delete_id, setDeleteId] = useState("");

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns, // useTable hook takes in memoized columns and data to be displayed
    data,
  });

  const handleDeleteChange = (event) => {
    setDeleteId(event.target.value);
  };

  function handleCreate() {
    if (rank === "admin") {
      navigate("/createTeam");
    } else if (rank === "manager" || rank == "employee") {
      alert("Your rank is not sufficient!!");
    }
  }

  function handleUpdate() {
    if (rank === "admin" || rank === "manager") {
      navigate("/updateTeam");
    } else if (rank == "employee") {
      alert("Your rank is not sufficient!!");
    }
  }

  function handleDelete() {
    if (rank === "admin") {
      if (delete_id > 0) {
        axios
          .delete(`http://localhost:3000/teams/delete-team`, { data: { team_id: delete_id } })
          .then((res) => {
            if (res.status === 201) {
              window.location.reload();
            }
          })
          .catch((error) => {
            alert("Cannot delete team!!");
          });
      } else {
        alert("The id cannot be empty!!");
      }
    } else if (rank === "manager" || rank == "employee") {
      alert("Your rank is not sufficient!!");
    }
  }

  return (
    <div name="users" className="w-full h-screen bg-[#16122b] text-gray-300">
      <div className={mobileNav ? "hidden" : "flex flex-col justify-center items-center w-full h-full"}>
        {/* DIV CONTAINING THE GRID FOR TABLE AND BUTTONS */}
        <div className="grid-container">
          {/* P CONTAINING THE TITLE */}
          <div className="grid-item-title">
            <h1 className="text-center text-4xl text-white bg-[#415191] rounded-t-lg border-b-[1px] border-black p-4">Teams Table</h1>
          </div>
          {/* DIV CONTAINING THE TABLE */}
          <div className="grid-item-table">
            {/* THIS METHOD RETURNS AN OBJECT OF PROPS THAT CAN BE SPREAD IN A TABLE ELEMENT
            IT CAN INCLUDE ATTRIBUTES THAT CAN BE IN A TABLE (CLASSNAME STYLE ID ETC) 
            ... MEANS THAT WE ARE DESTRUCTURING THE PROP*/}
            <table className="w-full" {...getTableProps()}>
              <thead>
                {
                  // Loop over the header rows
                  headerGroups.map((headerGroup) => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {
                        // Loop over the headers in each row
                        headerGroup.headers.map((column) => (
                          // Apply the header cell props
                          <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))
                      }
                    </tr>
                  ))
                }
              </thead>
              {/* Apply the table body props */}
              <tbody {...getTableBodyProps()}>
                {
                  // Loop over the table rows
                  rows.map((row, i) => {
                    // Prepare the row for display
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {
                          // Loop over the rows cells
                          row.cells.map((cell) => {
                            // Apply the cell props
                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                          })
                        }
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          {/* DIV CONTAINING THE BUTTONS */}
          <div className="grid-item-buttons grid-cols-3">
            <button onClick={handleCreate} className="text-white border-2 px-6 py-3 flex justify-center items-center hover:bg-green-600 hover:border-green-600 rounded-bl-lg">
              Create
            </button>
            <button onClick={handleUpdate} className="text-white border-2 px-6 py-3 flex justify-center items-center hover:bg-[#7F4000] hover:border-[#7F4000]">
              Update
            </button>
            <div className="grid grid-cols-2 grid-rows-1">
              <button onClick={handleDelete} className="col-[1_/_1] text-white border-2 px-6 py-3 flex justify-center items-center hover:bg-red-600 hover:border-red-600">
                Delete
              </button>
              <input value={delete_id} onChange={handleDeleteChange} name="id" placeholder="ID" className="col-[2_/_2] text-[24px] text-black text-center rounded-br-lg" type="number"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsTable;
