import { useEffect, useState } from "react";
import axios from "axios";

export const TeamsDataFetcher = () => {
  const [data, setData] = useState([]);
  const rank = localStorage.getItem("rank");
  const id = localStorage.getItem("id");

  if (rank === "admin") {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:3000/teams`).catch((err) => console.log(err));
      setData(data);
    };

    useEffect(() => {
      fetchData();
    }, []);
  } else if (rank === "manager") {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:3000/teams`).catch((err) => console.log(err));
      setData(data);
    };

    useEffect(() => {
      fetchData();
    }, []);
  } else if (rank === "employee") {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:3000/teams`).catch((err) => console.log(err));
      setData(data);
    };

    useEffect(() => {
      fetchData();
    }, []);
  }

  return data;
};
