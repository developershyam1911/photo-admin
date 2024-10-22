import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddUser = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobno: "",
    password: "",
    business_name: "",
    role: "user", // Default role
  });
  const [imageFile, setImageFile] = useState(null);

  const btnHandler = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;

    // Validate mandatory fields
    if (name !== "" && email !== "" && password !== "") {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("mobno", data.mobno);
      formData.append("password", data.password);
      formData.append("business_name", data.business_name);
      formData.append("role", data.role);
      if (imageFile) {
        formData.append("image", imageFile); // Add image if available
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/user`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("this is response", response.data);
        setData({
          name: "",
          email: "",
          mobno: "",
          password: "",
          business_name: "",
          role: "user", // Reset to default
        });
        setImageFile(null);
        toast.success("User added successfully.");
      } catch (err) {
        console.error("Error while adding user:", err.message);
        toast.error("Error while adding user.");
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

  const imageHandler = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <form method="post" onSubmit={btnHandler}>
                  {/* Name Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      className="form-control"
                      value={data.name}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      className="form-control"
                      value={data.email}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Mobile Number Field */}
                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobno"
                      placeholder="Enter mobile number"
                      className="form-control"
                      value={data.mobno}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Password Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      className="form-control"
                      value={data.password}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Image Field */}
                  <div className="form-group">
                    <label className="form-label">Upload Image</label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={imageHandler}
                      accept="image/*"
                    />
                  </div>

                  {/* Business Name Field */}
                  <div className="form-group">
                    <label className="form-label">Business Name</label>
                    <input
                      type="text"
                      name="business_name"
                      placeholder="Enter business name"
                      className="form-control"
                      value={data.business_name}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Role Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Role <span className="text-danger">*</span>
                    </label>
                    <select
                      name="role"
                      className="form-control"
                      value={data.role}
                      onChange={formHandler}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value="Add User"
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

export default AddUser;
