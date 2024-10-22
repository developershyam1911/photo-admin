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
import ColorNameFinder from "./ColorNameFinder";
import UserNameFinder from "./UserNameFinder";

const WallpaperList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getJobList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/wallpaper`
      );
      setData(response.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching wallpaper data:", error);
      toast.error("Failed to fetch wallpaper list.");
      setLoading(false);
    }
  };
  useEffect(() => {
    getJobList();
  }, []);

  const deletebtnHandler = async (wallpaper_id) => {
    const choice = window.confirm("Are you sure you want to delete?");
    if (choice) {
      try {
        await axios.delete(
          `${
            import.meta.env.VITE_BASE_URL_DEVELOPMENT
          }/api/v1/wallpaper/${wallpaper_id}`
        );
        toast.success("wallpaper deleted successfully.");
        setData((prevData) =>
          prevData.filter((item) => item._id !== wallpaper_id)
        );
      } catch (error) {
        console.error("Error deleting wallpaper:", error.message);
        toast.error("Failed to delete the wallpaper.");
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
                    to="/dashboard/add-wallpaper"
                    className="btn btn-primary btn-sm"
                  >
                    {" "}
                    + Add wallpaper{" "}
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
                        <th>Image</th>
                        <th>Role</th>
                        <th>Color Name</th>
                        <th>User Name</th>
                        <th>Status</th>
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
                            <td>
                              <div>
                                <img
                                  src={item.image}
                                  alt=""
                                  style={{
                                    height: "70px",
                                    width: "70px",
                                    borderRadius: "10px",
                                  }}
                                />
                              </div>
                            </td>
                            <td>{item.role}</td>

                            <td>
                              {<ColorNameFinder color_id={item.color_id} />}
                            </td>
                            <td>{<UserNameFinder user_id={item.user_id} />}</td>
                            <td>{item.status}</td>
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

export default WallpaperList;
