import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddSubscription = () => {
  const [data, setData] = useState({
    plan_id: "",
    user_id: "",
    startDate: "",
    payment_mode: "",
    transaction_id: "",
    payment_status: "pending",
    remark: "",
  });
  console.log(data);

  const [plan, setPlan] = useState([]);
  useEffect(() => {
    const fetchedPlan = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/plan`
        );
        setPlan(response.data.data);
      } catch (err) {
        console.error("Error while fetching categories:", err.message);
        toast.error("Error while fetching categories.");
      }
    };
    fetchedPlan();
  }, []);

  const btnHandler = async (e) => {
    e.preventDefault();
    const {
      plan_id,
      user_id,
      startDate,
      payment_mode,
      transaction_id,
      payment_status,
    } = data;

    if (plan_id && startDate && payment_mode && transaction_id) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_DEVELOPMENT}/api/v1/subscription`,
          data
        );
        console.log("this is response", response.data);
        setData({
          plan_id: "",
          user_id: "",
          startDate: "",
          payment_mode: "",
          transaction_id: "",
          payment_status: "pending",
          remark: "",
        });
        toast.success("Subscription added successfully.");
      } catch (err) {
        console.error("Error while adding subscription:", err.message);
        toast.error("Error while adding subscription.");
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
                  {/* Plan ID Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Select Plan <span className="text-danger">*</span>
                    </label>
                    <select
                      name="plan_id"
                      className="form-control"
                      value={data.plan_id}
                      onChange={formHandler}
                    >
                      <option value="" disabled selected>
                        Select Plan
                      </option>
                      {plan.map((plan) => (
                        <option key={plan._id} value={plan._id}>
                          {plan.plan_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* User ID Field */}
                  <div className="form-group">
                    <label className="form-label">
                      User ID <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="user_id"
                      placeholder="Enter User ID"
                      className="form-control"
                      value={data.user_id}
                      onChange={formHandler}
                      required
                    />
                  </div>

                  {/* Start Date Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Start Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      className="form-control"
                      value={data.startDate}
                      onChange={formHandler}
                      required
                    />
                  </div>

                  {/* Payment Mode Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Payment Mode <span className="text-danger">*</span>
                    </label>
                    <select
                      name="payment_mode"
                      value={data.payment_mode}
                      onChange={formHandler}
                      className="form-control"
                    >
                      <option disabled selected>
                        Payment Mode
                      </option>
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>

                  {/* Transaction ID Field */}
                  <div className="form-group">
                    <label className="form-label">
                      Transaction ID <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="transaction_id"
                      placeholder="Enter Transaction ID"
                      className="form-control"
                      value={data.transaction_id}
                      onChange={formHandler}
                      required
                    />
                  </div>

                  {/* Payment Status Field */}
                  <div className="form-group">
                    <label className="form-label">Payment Status</label>
                    <select
                      name="payment_status"
                      className="form-control"
                      value={data.payment_status}
                      onChange={formHandler}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>

                  {/* Remarks Field */}
                  <div className="form-group">
                    <label className="form-label">Remarks</label>
                    <textarea
                      name="remark"
                      className="form-control"
                      rows={3}
                      placeholder="Enter remarks"
                      value={data.remark}
                      onChange={formHandler}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="form-group my-3">
                    <input
                      type="submit"
                      value="Add Subscription"
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

export default AddSubscription;
