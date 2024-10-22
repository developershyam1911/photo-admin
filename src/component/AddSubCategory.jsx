import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddSubCategory = () => {
  const [data, setData] = useState({
    cat_id: "",
    name: "",
    status: "active",
  });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/category`
        );
        setCategories(response.data.data);
      } catch (err) {
        console.error("Error while fetching categories:", err.message);
        toast.error("Error while fetching categories.");
      }
    };
    fetchCategories();
  }, []);

  const btnHandler = async (e) => {
    e.preventDefault();
    const { cat_id, name, status } = data;
    if (cat_id !== "" && name !== "" && status !== "") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/sub-category`,
          { cat_id, name, status },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("this is response", response.data);
        setData({
          cat_id: "",
          name: "",
          status: "active", // Reset to default
        });
        toast.success("Sub-Category added successfully.");
      } catch (err) {
        console.error("Error while adding Sub-Category:", err.message);
        toast.error("Error while adding Sub-Category.");
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
                  {/* Category ID Dropdown */}
                  <div className="form-group">
                    <label className="form-label">
                      Select Category <span className="text-danger">*</span>
                    </label>
                    <select
                      name="cat_id"
                      className="form-control"
                      value={data.cat_id}
                      onChange={formHandler}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter sub-category name"
                      className="form-control"
                      value={data.name}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Status Field */}
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

                  {/* Submit Button */}
                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value="Add Sub-Category"
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

export default AddSubCategory;
