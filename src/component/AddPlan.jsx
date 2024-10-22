import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddPlan = () => {
  const [data, setData] = useState({
    plan_name: "",
    price: "",
    days: "",
    discountPrice: "",
    features: "",
  });

  const btnHandler = async (e) => {
    e.preventDefault();
    const { plan_name, price, days, discountPrice, features } = data;

    // Validate mandatory fields
    if (plan_name === "" || price === "" || days === "") {
      toast.error("Please fill all the mandatory fields.");
      return;
    }

    // Validate that discount price is not greater than the base price
    if (parseFloat(discountPrice) > parseFloat(price)) {
      toast.error("Discount price cannot be greater than the base price.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/plan`,
        {
          plan_name,
          price,
          days,
          discountPrice,
          features,
        }
      );
      console.log("this is response", response.data);
      setData({
        plan_name: "",
        price: "",
        days: "",
        discountPrice: "",
        features: "",
      });
      toast.success("Plan added successfully.");
    } catch (err) {
      console.error("Error while adding plan:", err.message);
      toast.error("Error while adding plan.");
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
                  {/* Plan Name Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Plan Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="plan_name"
                      placeholder="Enter plan name"
                      className="form-control"
                      value={data.plan_name}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Price Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Price <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter price"
                      className="form-control"
                      value={data.price}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Days Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Days <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      name="days"
                      placeholder="Enter number of days"
                      className="form-control"
                      value={data.days}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Discount Price Field */}
                  <div className="form-group">
                    <label className="form-label">Discount Price</label>
                    <input
                      type="number"
                      name="discountPrice"
                      placeholder="Enter discount price"
                      className="form-control"
                      value={data.discountPrice}
                      onChange={formHandler}
                    />
                  </div>

                  {/* Features Field */}
                  <div className="form-group">
                    <label className="form-label">Features</label>
                    <textarea
                      name="features"
                      className="form-control"
                      rows={5}
                      placeholder="Enter features of the plan"
                      value={data.features}
                      onChange={formHandler}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value="Add Plan"
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

export default AddPlan;
