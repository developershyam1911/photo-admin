import React, { useEffect, useState } from "react";
import axios from "axios";

const ColorNameFinder = ({ color_id }) => {
  const [data, setData] = useState({});
  const getJobList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/color/${color_id}`
      );
      setData(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };
  useEffect(() => {
    getJobList();
  }, [color_id]);

  return <div>{data?.name}</div>;
};

export default ColorNameFinder;
