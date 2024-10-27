import { LogoutOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkLoginStatus, logout } from "../services/authService";
import { toast } from "react-toastify";
import { Card } from "antd";
import AllReviews from "./allReview";
import AccountManagement from "./AdminPages/accountManagement";
import FinancialManagement from "./AdminPages/financialManagement";
import PartsManagement from "./AdminPages/partsManagement";
import ManageAppointments from "./AdminPages/manageAppointments";

const WmLandingPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const navigate = useNavigate();

  useEffect(() => {
    LoginStatus();
  }, []);

  const LoginStatus = async () => {
    try {
      const res = await checkLoginStatus();
      if (res.data.verified) {
        setLoggedInUser(res.data.user);
      } else {
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.status === 200) {
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        window.location.reload();
        navigate("/");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const tabList = [
    {
      key: "tab1",
      tab: (
        <p className="btext font-semibold text-lg md:text-2xl py-2">
          Dashboard
        </p>
      ),
    },
    {
      key: "tab2",
      tab: (
        <p className="btext font-semibold text-lg md:text-2xl py-2">
          Handle Appointments
        </p>
      ),
    },
    {
      key: "tab3",
      tab: (
        <p className="btext font-semibold text-lg md:text-2xl py-2">
          Manage Parts
        </p>
      ),
    },
    {
      key: "tab4",
      tab: (
        <p className="btext font-semibold text-lg md:text-2xl py-2">
          Track Finances
        </p>
      ),
    },
    {
      key: "tab5",
      tab: (
        <p className="btext font-semibold text-lg md:text-2xl py-2">
          View Reviews
        </p>
      ),
    },
    {
      key: "tab6",
      tab: (
        <p className="btext font-semibold text-lg md:text-2xl py-2">
          Account Management
        </p>
      ),
    },
  ];

  const contentList = {
    tab1: <></>,
    tab2: <ManageAppointments />,
    tab3: <PartsManagement />,
    tab4: <FinancialManagement />,
    tab5: <AllReviews />,
    tab6: <AccountManagement />,
  };

  return (
    <div>
      <div className="flex justify-between items-center pr-5 md:pr-10 bg-blue-200">
        <div>
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="logo"
              className="weblogo w-24 md:w-48 cursor-pointer"
            ></img>
          </Link>
        </div>
        <h1 className="text-sm md:text-4xl text-blue-500 my-3 text-center htext">
          Administration Portal
        </h1>
        <div className="flex text-xs md:text-2xl space-x-2 md:space-x-4 ">
          <p className="text-blue-500 htext">
            {loggedInUser?.name.charAt(0).toUpperCase() +
              loggedInUser?.name.slice(1)}
          </p>
          <LogoutOutlined
            style={{}}
            className="text-blue-500 cursor-pointer hover:scale-105 duration-300 transform text-sm md:text-4xl"
            onClick={handleLogout}
          />
        </div>
      </div>
      <div>
        <Card
          style={{
            width: "100%",
            minHeight: "84vh",
          }}
          title={<></>}
          extra={() => null}
          tabList={tabList}
          activeTabKey={activeTabKey1}
          onTabChange={onTab1Change}
          bordered={false}
          className="bg-neutral-50 htext"
        >
          {contentList[activeTabKey1]}
        </Card>
      </div>
    </div>
  );
};

export default WmLandingPage;
