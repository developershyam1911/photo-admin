import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddColor = () => {
  const [data, setData] = useState({
    name: "",
    status: "active", // Default status
  });

  const btnHandler = async (e) => {
    e.preventDefault();
    const { name, status } = data;
    if (name !== "") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/color`,
          {
            name,
            status,
          }
        );
        console.log("this is response", response.data);
        setData({
          name: "",
          status: "active",
        });
        toast.success("Color added successfully.");
      } catch (err) {
        console.error("Error while adding color:", err.message);
        toast.error("Error while adding color.");
      }
    } else {
      toast.error("Please fill all the mandatory fields.");
    }
  };

  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <form method="post" onSubmit={btnHandler}>
                  <div className="form-group">
                    <label className="form-label">
                      Color Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter color name"
                      className="form-control"
                      value={data.name}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Status Field */}
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                      name="status"
                      className="form-control"
                      value={data.status}
                      onChange={formHandler}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value="Add Color"
                      className="btn btn-info"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddColor;
