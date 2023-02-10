import { useEffect, useState } from "react";
import axios from "axios";

export const UsersDataFetcher = () => {
  const [data, setData] = useState([]);
  const rank = localStorage.getItem("rank");

  if (rank === "admin") {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:3000/users`).catch((err) => console.log(err));
      setData(data);
    };

    useEffect(() => {
      fetchData();
    }, [data.id]);
  } else if (rank === "manager") {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:3000/users/employees`).catch((err) => console.log(err));
      setData(data);
    };

    useEffect(() => {
      fetchData();
    }, [data.id]);
  }

  return data;
};
