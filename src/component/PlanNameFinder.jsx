import React, { useEffect, useState } from "react";
import axios from "axios";

const PlanNameFinder = ({ plan_id }) => {
  const [data, setData] = useState({});
  const getJobList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/plan/${plan_id}`
      );
      setData(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };
  useEffect(() => {
    getJobList();
  }, [plan_id]);

  return <div>{data?.plan_name}</div>;
};

export default PlanNameFinder;
