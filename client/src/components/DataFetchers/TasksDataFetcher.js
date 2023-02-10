import { useEffect, useState } from "react";
import axios from "axios";

export const TasksDataFetcher = () => {
  const [data, setData] = useState([]);
  const rank = localStorage.getItem("rank");
  const id = localStorage.getItem("id");

  if (rank === "admin") {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:3000/tasks`).catch((err) => console.log(err));
      setData(data);
    };

    useEffect(() => {
      fetchData();
    }, []);
  } else if (rank === "manager") {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks/manager/${id}`);
        const data = response.data;
        setData(data);
      } catch (error) {
        
      }
    };    

    useEffect(() => {
      fetchData();
    }, []);
  } else if (rank === "employee") {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks/employee/${id}`);
        const data = response.data;
        setData(data);
      } catch (error) {
        
      }
    };
    

    useEffect(() => {
      fetchData();
    }, []);
  }

  return data;
};
