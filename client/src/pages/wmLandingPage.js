import { LogoutOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkLoginStatus, logout } from "../services/authService";
import { toast } from "react-toastify";

const WmLandingPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userType, setUserType] = useState(null);
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
        <h1 className="text-4xl text-blue-500 my-3 text-center htext">
          Administration Portal
        </h1>
        <div className="flex text-lg md:text-2xl space-x-4 ">
          <p className="text-blue-500 htext">
            {loggedInUser?.name.charAt(0).toUpperCase() +
              loggedInUser?.name.slice(1)}
          </p>
          <LogoutOutlined
            style={{}}
            className="text-blue-500 cursor-pointer hover:scale-105 duration-300 transform text-xl md:text-4xl"
            onClick={handleLogout}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default WmLandingPage;
