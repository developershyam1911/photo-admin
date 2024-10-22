import React, { useEffect, useState } from "react";
import axios from "axios";

const FrameFinder = ({ frame_id }) => {
  const [data, setData] = useState({});
  const getJobList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/frame/${frame_id}`
      );
      setData(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };
  useEffect(() => {
    getJobList();
  }, [frame_id]);

  return (
    <div>
      <img
        src={data?.image}
        alt=""
        style={{ height: "100px", width: "100px", borderRadius: "5px" }}
      />
    </div>
  );
};

export default FrameFinder;
