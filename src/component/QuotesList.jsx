import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { MdDelete, MdEditSquare } from "react-icons/md";
import CatNameFinder from "./CatNameFinder";
import SubCatNameFinder from "./SubCatNameFinder";

const QuoteList = () => {
  const [data, setData] = useState([]);
  console.log(data);

  const [loading, setLoading] = useState(true);
  const getJobList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/quotes`
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

  const deletebtnHandler = async (quotes_id) => {
    const choice = window.confirm("Are you sure you want to delete?");
    if (choice) {
      try {
        await axios.delete(
          `${
            import.meta.env.VITE_BASE_URL_DEVELOPMENT
          }/api/v1/quotes/${quotes_id}`
        );
        toast.success("quotes deleted successfully.");
        setData((prevData) =>
          prevData.filter((item) => item._id !== quotes_id)
        );
      } catch (error) {
        console.error("Error deleting quotes:", error.message);
        toast.error("Failed to delete the quotes.");
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
                    to="/dashboard/add-quotes"
                    className="btn btn-primary btn-sm"
                  >
                    {" "}
                    + Add quotes{" "}
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
                        <th>Cat Name</th>
                        <th>Sub Cat Name</th>
                        <th>Content</th>
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
                            <td>{<CatNameFinder cat_id={item.cat_id} />}</td>
                            <td>
                              {
                                <SubCatNameFinder
                                  sub_cat_id={item.sub_cat_id}
                                />
                              }
                            </td>
                            <td>{item.content}</td>
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

export default QuoteList;
