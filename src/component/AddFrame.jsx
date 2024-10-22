import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddFrame = () => {
  const [data, setData] = useState({
    imageFile: null,
    status: "active", // Default status
  });
  const imageInputRef = useRef(null);
  const btnHandler = async (e) => {
    e.preventDefault();
    const { imageFile, status } = data;

    // Validate mandatory fields
    if (imageFile !== null) {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("status", status);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/frame`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("this is response", response.data);
        setData({
          imageFile: null,
          status: "active", // Reset to default
        });
        // Clear the image input by resetting its value via ref
        if (imageInputRef.current) {
          imageInputRef.current.value = null;
        }
        toast.success("Frame added successfully.");
      } catch (err) {
        console.error("Error while adding frame:", err.message);
        toast.error("Error while adding frame.");
      }
    } else {
      toast.error("Please upload an image.");
    }
  };

  const imageHandler = (e) => {
    setData({ ...data, imageFile: e.target.files[0] });
  };

  const statusHandler = (e) => {
    setData({ ...data, status: e.target.value });
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
                  <div className="form-group my-3">
                    <label className="form-label">
                      Image <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={imageHandler}
                      accept="image/*"
                      ref={imageInputRef}
                    />
                  </div>

                  {/* Status Field */}
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                      name="status"
                      className="form-control"
                      value={data.status}
                      onChange={statusHandler}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value="Add Frame"
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

export default AddFrame;
