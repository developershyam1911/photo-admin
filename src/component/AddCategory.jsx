import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddCategory = () => {
  const [data, setData] = useState({
    name: "",
    status: "active",
  });

  const btnHandler = async (e) => {
    e.preventDefault();
    const { name, status } = data;
    if (name !== "" && status !== "") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/category`,
          { name, status },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("this is response", response.data);
        setData({
          name: "",
          status: "active", // Reset status to default
        });
        toast.success("Category added successfully.");
      } catch (err) {
        console.error("Error while adding Category:", err.message);
        toast.error("Error while adding Category.");
      }
    } else {
      toast.error("Please fill all the mandatory fields");
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
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter category name"
                      className="form-control"
                      value={data.name}
                      onChange={formHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      name="status"
                      className="form-control"
                      value={data.status}
                      onChange={formHandler}
                    >
                      <option value="active">Active</option>
                      <option value="deactive">Deactive</option>
                    </select>
                  </div>

                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value="Add Category"
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

export default AddCategory;
