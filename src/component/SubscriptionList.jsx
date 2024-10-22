import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { MdDelete, MdEditSquare } from "react-icons/md";
import CatNameFinder from "./CatNameFinder";
import PlanNameFinder from "./PlanNameFinder";

const SubscriptionList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getJobList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/subscription`
      );
      setData(response.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job data:", error);
      toast.error("Failed to fetch job list.");
      setLoading(false);
    }
  };
  useEffect(() => {
    getJobList();
  }, []);

  const deletebtnHandler = async (subscription_id) => {
    const choice = window.confirm("Are you sure you want to delete?");
    if (choice) {
      try {
        await axios.delete(
          `${
            import.meta.env.VITE_BASE_URL_DEVELOPMENT
          }/api/v1/subscription/${subscription_id}`
        );
        toast.success("subscription deleted successfully.");
        setData((prevData) =>
          prevData.filter((item) => item._id !== subscription_id)
        );
      } catch (error) {
        console.error("Error deleting subscription:", error.message);
        toast.error("Failed to delete the subscription.");
      }
    } else {
      return;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header row d-flex justify-content-between align-items-center">
                <div className="col-md-4">
                  <Link
                    to="/dashboard/add-subscription"
                    className="btn btn-primary btn-sm"
                  >
                    {" "}
                    + Add Subscription{" "}
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered shadow-sm mt-3"
                    cellPadding={5}
                  >
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Plan Name</th>
                        <th>User Name</th>
                        <th>Start Date</th>
                        <th>Payment Mode</th>
                        <th>Transaction Id</th>
                        <th>Payment Status</th>
                        <th>Remark</th>
                        <th>createdAt</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={6}>
                            <Skeleton count={6} />
                          </td>
                        </tr>
                      ) : data?.length > 0 ? (
                        data?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{<PlanNameFinder plan_id={item.plan_id} />}</td>
                            <td>{"test"}</td>
                            <td>{item.startDate}</td>
                            <td>{item.payment_mode}</td>
                            <td>{item.transaction_id}</td>
                            <td>{item.payment_status}</td>
                            <td>{item.remark}</td>
                            <td>
                              {new Date(item?.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <button
                                className="btn"
                                onClick={() => deletebtnHandler(item._id)}
                              >
                                <MdDelete size={24} style={{ color: "red" }} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="text-center text-danger">
                          <td colSpan={6}>Sub Category not found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SubscriptionList;
