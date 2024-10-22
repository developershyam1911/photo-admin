import React, { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import "./BusinessAnalysis.css";
import { doc, getDoc } from "firebase/firestore";
import init from "../firebase";
import { Link } from "react-router-dom";
import one1 from "../assets/icon/1.png";
import one2 from "../assets/icon/2.png";
import one3 from "../assets/icon/3.jpg";
import one4 from "../assets/icon/4.png";
import one5 from "../assets/icon/5.png";
import one6 from "../assets/icon/6.png";
import one7 from "../assets/icon/7.png";
import one8 from "../assets/icon/8.png";
import one9 from "../assets/icon/9.png";
import one10 from "../assets/icon/10.png";
const BusinessAnalysis = () => {
  const [box, setBox] = useState([
    {
      title: "Dashboard",
      quatity: "70",
      url: "https://img.icons8.com/office/256/booking.png",
      href: "/dashboard/dash_board",
    },
    {
      title: "Cat Mgmt",
      quatity: "343",
      url: one3,
      href: "/dashboard/cat-list",
    },
    {
      title: "Sub Cat Mgmt",
      quatity: "343",
      url: one3,
      href: "/dashboard/sub-cat-list",
    },
    {
      title: "Users Mgmt",
      quatity: "343",
      url: one1,
      href: "/dashboard/user-list",
    },
    {
      title: "Wallpapers",
      quatity: "343",
      url: one5,
      href: "/dashboard/wallpaper-list",
    },
    {
      title: "Quotes Mgmt",
      quatity: "343",
      url: one7,
      href: "/dashboard/quotes-list",
    },
    {
      title: "Color Mgmt",
      quatity: "343",
      url: one3,
      href: "/dashboard/color-list",
    },
    {
      title: "Plan Mgmt",
      quatity: "343",
      url: one4,
      href: "/dashboard/plan-list",
    },
    {
      title: "Style Mgmt",
      quatity: "343",
      url: one10,
      href: "/dashboard/style-list",
    },

    {
      title: "Frame Mgmt",
      quatity: "343",
      url: one4,
      href: "/dashboard/frame-list",
    },
    {
      title: "Subscriptions",
      quatity: "343",
      url: one1,
      href: "/dashboard/subscription-list",
    },
    {
      title: "History",
      quatity: "343",
      url: one1,
      href: "/dashboard/transaction-history",
    },
  ]);
  const [value, setValue] = useState(50);
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="card">
          <div className="card-body ">
            <div className="d-md-flex align-items-center">
              <h4 className="card-title text-center mb-4">Welcome Admin</h4>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  {box.map((cur, index) => {
                    return (
                      <div className="col-md-3 col-6" key={index}>
                        <div className=" p-10  text-center total_card shadow-sm ">
                          <div className="data d-flex justify-content-around">
                            <img
                              src={cur.url}
                              className="dash_icon"
                              alt="Event Planet"
                            />
                            {/* <h4 className="">{cur.quatity}</h4> */}
                          </div>
                          <Link to={cur.href}>
                            <p className="p-2">{cur.title}</p>{" "}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalysis;
