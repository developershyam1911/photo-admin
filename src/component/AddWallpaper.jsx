import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddWallpaper = () => {
  const [data, setData] = useState({
    role: "user", // Default role
    color_id: "",
    status: "active", // Default status
  });

  const [color, setColor] = useState([]);
  const imageInputRef = useRef(null); // Use ref for the image input

  useEffect(() => {
    const getColors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/color`
        );
        setColor(response.data.data);
      } catch (err) {
        console.error("Error while fetching color:", err.message);
        toast.error("Error while fetching color.");
      }
    };
    getColors();
  }, []);

  const [imageFile, setImageFile] = useState(null);

  const btnHandler = async (e) => {
    e.preventDefault();
    const { role, color_id, status } = data;
    let user_id = "67162b0ec7fa1465f19018da";
    // Validate mandatory fields
    if (imageFile !== null && color_id !== "") {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("role", role);
      formData.append("color_id", color_id);
      formData.append("status", status);
      formData.append("user_id", user_id);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/wallpaper`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("this is response", response.data);
        setData({
          role: "user",
          color_id: "",
          status: "active",
        });
        setImageFile(null);
        // Clear the image input by resetting its value via ref
        if (imageInputRef.current) {
          imageInputRef.current.value = null;
        }
        toast.success("Wallpaper added successfully.");
      } catch (err) {
        console.error("Error while adding wallpaper:", err.message);
        toast.error("Error while adding wallpaper.");
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
                  {/* Image Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Image <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={imageHandler}
                      accept="image/*"
                      ref={imageInputRef} // Assign ref to the image input
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

                  <div className="form-group">
                    <label className="form-label">
                      Select Color <span className="text-danger">*</span>
                    </label>
                    <select
                      name="color_id"
                      className="form-control"
                      value={data.color_id}
                      onChange={formHandler}
                    >
                      <option value="">Select Color</option>
                      {color.map((color) => (
                        <option key={color._id} value={color._id}>
                          {color.name}
                        </option>
                      ))}
                    </select>
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
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value="Add Wallpaper"
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

export default AddWallpaper;
