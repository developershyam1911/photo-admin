import React, { useState, useEffect } from "react";
import {
  MdDashboard,
  MdPeople,
  MdAccountBox,
  MdOutlineBusinessCenter,
  MdOutlineLibraryAdd,
  MdOutlineViewList,
} from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./style.min.css";
import SidebarMenu from "./SidebarMenu";
const Sidenavbar = () => {
  const [windowDimension, setWindowDimension] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(true);
  const detectSize = () => {
    setWindowDimension(window.innerWidth);
    if (windowDimension < 768) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  useEffect(() => {
    if (windowDimension < 768) {
      setIsOpen(false);
    }
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  const [item, setItem] = useState([
    {
      title: "Category Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Category",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/add-cat",
        },
        {
          title: "Category List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/Cat-list",
        },
      ],
    },
    {
      title: "Sub Cat Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Sub Cat",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-sub-cat",
        },
        {
          title: "Sub Cat List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/sub-cat-list",
        },
      ],
    },
    {
      title: "Users Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add User/Admin",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-user",
        },
        {
          title: "User/Admin List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/user-list",
        },
      ],
    },
    {
      title: "Wallpapers Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Wallpaper",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-wallpaper",
        },
        {
          title: "Wallpapers List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/wallpaper-list",
        },
      ],
    },
    {
      title: "Quotes Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Quotes",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-quotes",
        },
        {
          title: "Quotes List",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/quotes-list",
        },
      ],
    },
    {
      title: "Color Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Color",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-color",
        },
        {
          title: "Color List",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/color-list",
        },
      ],
    },
    {
      title: "Plans  Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Plan",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-plan",
        },
        {
          title: "Plan List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/plan-list",
        },
      ],
    },
    {
      title: "Style Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Style",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-style",
        },
        {
          title: "Style List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/style-list",
        },
      ],
    },
    {
      title: "Frame Management",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Frame",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-frame",
        },
        {
          title: "Frame List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/frame-list",
        },
      ],
    },
    {
      title: "Subscriptions",
      icon: <MdPeople className="my__nav__icon" />,
      dropDown: [
        {
          title: "Add Subscriptions",
          icon: <MdAccountBox className="my__nav__icon" />,
          href: "/dashboard/add-subscription",
        },
        {
          title: "Subscriptions List",
          icon: <MdOutlineLibraryAdd className="my__nav__icon" />,
          href: "/dashboard/subscription-list",
        },
      ],
    },
  ]);

  return (
    <aside className="left-sidebar" data-sidebarbg="skin5">
      {/* <!-- Sidebar scroll--> */}
      <div className="scroll-sidebar">
        {/* <!-- Sidebar navigation--> */}
        <nav className="sidebar-nav">
          <ul id="sidebarnav" className="pt-4">
            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="dash_board"
                aria-expanded="false"
              >
                <MdDashboard
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            {item.map((item, index) => {
              return (
                <SidebarMenu
                  title={item.title}
                  icon={item.icon}
                  dropDown={item.dropDown}
                  key={index}
                />
              );
            })}
            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/dashboard/transaction-history"
                aria-expanded="false"
              >
                <MdDashboard
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">Transaction History</span>
              </Link>
            </li>
            {/* <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/dashboard/enquiry"
                aria-expanded="false"
              >
                <MdDashboard
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">Enquiry</span>
              </Link>
            </li> */}

            <li className="sidebar-item">
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link "
                to="/dashboard/logout"
                aria-expanded="false"
              >
                <BiLogOutCircle
                  size={23}
                  style={{
                    display: "inline-block",
                    color: "white",
                    textAlign: "center",
                    width: "35px",
                  }}
                />
                <span className="hide-menu">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidenavbar;
