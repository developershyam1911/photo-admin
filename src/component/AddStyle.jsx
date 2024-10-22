import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddStyle = () => {
  const [data, setData] = useState({
    color_id: "",
    frame_id: "",
    fontSize: "",
    shadow: "",
    box_color: "",
    fontName: "",
    align: "",
    status: "active", // Default status
  });
  const [color, setColor] = useState([]);
  const [frame, setFrame] = useState([]);

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

  useEffect(() => {
    const getFrame = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/frame`
        );
        setFrame(response.data.data);
      } catch (err) {
        console.error("Error while fetching frame:", err.message);
        toast.error("Error while fetching frame.");
      }
    };
    getFrame();
  }, []);

  const btnHandler = async (e) => {
    e.preventDefault();
    const {
      color_id,
      frame_id,
      fontSize,
      shadow,
      box_color,
      fontName,
      align,
      status,
    } = data;

    // Validate mandatory fields
    if (
      color_id !== "" &&
      frame_id !== "" &&
      fontSize !== "" &&
      fontName !== ""
    ) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/style`,
          {
            color_id,
            frame_id,
            fontSize,
            shadow,
            box_color,
            fontName,
            align,
            status,
          }
        );
        console.log("this is response", response.data);
        setData({
          color_id: "",
          frame_id: "",
          fontSize: "",
          shadow: "",
          box_color: "",
          fontName: "",
          align: "",
          status: "active", // Reset to default
        });
        toast.success("Style added successfully.");
      } catch (err) {
        console.error("Error while adding style:", err.message);
        toast.error("Error while adding style.");
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

  const handleFrameClick = (frame_id) => {
    setData({ ...data, frame_id });
    // toast.info(`Selected Frame ID: ${frame_id}`);
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <form method="post" onSubmit={btnHandler}>
                  {/* Color ID Field */}

                  {/* Frame Selection (Clickable Images) */}
                  <div className="form-group">
                    <label className="form-label">
                      Select Frame <span className="text-danger">*</span>
                    </label>
                    <div className="frame-selection">
                      {frame.map((frame) => (
                        <div
                          key={frame._id}
                          className={`frame-item ${
                            data.frame_id === frame._id ? "selected-frame" : ""
                          }`}
                          onClick={() => handleFrameClick(frame._id)}
                          style={{
                            display: "inline-block",
                            margin: "10px",
                            cursor: "pointer",
                            border:
                              data.frame_id === frame._id
                                ? "3px solid blue"
                                : "1px solid gray",
                            padding: "5px",
                          }}
                        >
                          <img
                            src={frame.image}
                            alt="frame"
                            style={{
                              height: "100px",
                              width: "100px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                      ))}
                    </div>
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
                  {/* Font Size Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Font Size <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="fontSize"
                      placeholder="Enter font size (e.g., 16px)"
                      className="form-control"
                      value={data.fontSize}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Shadow Field */}
                  <div className="form-group">
                    <label className="form-label">Shadow</label>
                    <input
                      type="text"
                      name="shadow"
                      placeholder="Enter shadow (e.g., 2px 2px 5px #000)"
                      className="form-control"
                      value={data.shadow}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Box Color Field */}
                  <div className="form-group">
                    <label className="form-label">Box Color</label>
                    <input
                      type="text"
                      name="box_color"
                      placeholder="Enter box color (e.g., #fff)"
                      className="form-control"
                      value={data.box_color}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Font Name Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Font Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="fontName"
                      placeholder="Enter font name"
                      className="form-control"
                      value={data.fontName}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Alignment Field */}
                  <div className="form-group">
                    <label className="form-label">Alignment</label>
                    <select
                      name="align"
                      className="form-control"
                      value={data.align}
                      onChange={formHandler}
                    >
                      <option value="">Select alignment</option>
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
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
                      value="Add Style"
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

export default AddStyle;
