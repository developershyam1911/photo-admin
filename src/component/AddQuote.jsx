import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddQuote = () => {
  const [data, setData] = useState({
    cat_id: "",
    sub_cat_id: "",
    content: "",
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

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

  useEffect(() => {
    const fetechSubCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/sub-category`
        );
        setSubCategories(response.data.data);
      } catch (err) {
        console.error("Error while fetching sub categories:", err.message);
        toast.error("Error while fetching sub categories.");
      }
    };
    fetechSubCategories();
  }, []);

  let currentuser = "67162b0ec7fa1465f19018da";

  const btnHandler = async (e) => {
    e.preventDefault();
    const { cat_id, sub_cat_id, content } = data;

    if (cat_id !== "" && sub_cat_id !== "" && content !== "") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/quotes`,
          {
            cat_id,
            sub_cat_id,
            content,
            user_id: currentuser,
          }
        );
        setData({
          cat_id: "",
          sub_cat_id: "",
          content: "",
        });
        toast.success("Quote added successfully.");
      } catch (err) {
        console.error("Error while adding quote:", err.message);
        toast.error("Error while adding quote.");
      }
    } else {
      toast.error("Please fill all the mandatory fields.");
    }
  };

  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });

    // Reset subcategory when category changes
    if (name === "cat_id") {
      setData({ ...data, cat_id: value, sub_cat_id: "" });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <form method="post" onSubmit={btnHandler}>
                  {/* Category ID Field */}
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
                      <option value="" disabled>
                        Select Category
                      </option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sub Category Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Select Sub Category <span className="text-danger">*</span>
                    </label>
                    <select
                      name="sub_cat_id"
                      className="form-control"
                      value={data.sub_cat_id}
                      onChange={formHandler}
                      disabled={!data.cat_id} // Disable until a category is selected
                    >
                      <option value="" disabled>
                        Select Sub Category
                      </option>
                      {subCategories
                        .filter((sub) => sub.cat_id === data.cat_id) // Filter subcategories based on selected category
                        .map((sub) => (
                          <option key={sub._id} value={sub._id}>
                            {sub.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Content Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Content <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="content"
                      className="form-control"
                      rows={5}
                      placeholder="Enter quote content"
                      value={data.content}
                      onChange={formHandler}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value="Add Quote"
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

export default AddQuote;
