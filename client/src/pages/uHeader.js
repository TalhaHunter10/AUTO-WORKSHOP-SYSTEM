import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { checkLoginStatus, logout } from "../services/authService";
import { DownOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const UHeader = ({
  onScrollToAboutUs,
  onScrollToContactUs,
  onScrollToServices,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    LoginStatus();
  }, [navigate]);

  const LoginStatus = async () => {
    try {
      const res = await checkLoginStatus();
      if (res.data.verified) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem("user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = async () => {
    setIsProfileMenuOpen(false);
    try {
      const res = await logout();
      if (res.status === 200) {
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        navigate("/login");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between align-center">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="logo"
            className="weblogo w-36 md:w-64 cursor-pointer"
          ></img>
        </Link>

        <div className="navbar w-[80%] h-auto content-center">
          <div className="">
            <div className="bookingbutton hidden  lg:flex justify-end  ">
              <p className="bg-neutral-50 h-6 md:h-12 transform  skew-x-[-45deg] w-[12%]"></p>
              <p
                onClick={() => {
                  if (isLoggedIn) {
                    navigate("/appointment");
                  } else {
                    toast.error("Login to book appointment !");
                    navigate("/login");
                  }
                }}
                className="bg-blue-500 h-6 md:h-12 w-[60%] lg:w-[35%] -ml-6 text-center content-center cursor-pointer text-stone-200 hover:text-blue-500 hover:bg-stone-200 duration-300"
              >
                <Link to="">
                  <span className="htext text-xs md:text-lg lg:text-xl ">
                    BOOK SERVICE NOW
                  </span>
                </Link>
              </p>

              <p className="bg-neutral-50 h-6 md:h-12 transform  skew-x-[45deg] w-[12%] -ml-6"></p>
            </div>
            <div className="flex justify-stretch">
              <p className="bg-neutral-50 h-10 md:h-14 transform  skew-x-[-45deg] w-[20%]"></p>
              <div className="strip bg-neutral-400 h-10 md:h-14 align-center content-center w-full -ml-7">
                {/*Navbar*/}
                <div className="pl-20 flex justify-end xl:justify-evenly items-center">
                  <div className=" justify-evenly align-center w-full hidden xl:flex">
                    <Link to="/">
                      <p className="text-stone-200 hover:text-blue-600 duration-300">
                        <span className="htext text-xs md:text-lg lg:text-xl">
                          HOME
                        </span>
                      </p>
                    </Link>
                    <Link to="" onClick={onScrollToAboutUs}>
                      <p className="text-stone-200 hover:text-blue-600 duration-300">
                        <span className="htext text-xs md:text-lg lg:text-xl">
                          ABOUT US
                        </span>
                      </p>
                    </Link>
                    <Link to="" onClick={onScrollToServices}>
                      <p className="text-stone-200 hover:text-blue-600 duration-300">
                        <span className="htext text-xs md:text-lg lg:text-xl">
                          SERVICES
                        </span>
                      </p>
                    </Link>
                    <Link to="">
                      <p className="text-stone-200 hover:text-blue-600 duration-300">
                        <span className="htext text-xs md:text-lg lg:text-xl">
                          CHAT
                        </span>
                      </p>
                    </Link>
                    <Link to="/parts">
                      <p className="text-stone-200 hover:text-blue-600 duration-300">
                        <span className="htext text-xs md:text-lg lg:text-xl">
                          PARTS
                        </span>
                      </p>
                    </Link>
                    <Link to="" onClick={onScrollToContactUs}>
                      <p className="text-stone-200 hover:text-blue-600 duration-300">
                        <span className="htext text-xs md:text-lg lg:text-xl">
                          CONTACT US
                        </span>
                      </p>
                    </Link>
                  </div>
                  <div className="">
                    <Button
                      type="text"
                      onClick={toggleCollapsed}
                      className="flex xl:hidden bg-transparent border-none text-stone-200 text-lg md:text-2xl lg:text-3xl"
                    >
                      {collapsed ? (
                        <MenuOutlined className="" />
                      ) : (
                        <CloseOutlined />
                      )}
                    </Button>
                    <Menu
                      className={`${
                        collapsed ? "hidden" : "block"
                      } bg-neutral-400 xl:hidden`}
                      style={{
                        width: 250,
                        position: "absolute",
                        zIndex: 1,
                        marginTop: 15,
                        marginLeft: -100,
                        borderRadius: 10,
                      }}
                    >
                      <Menu.Item
                        className="htext text-center"
                        key="1"
                        onClick={() => {
                          navigate("/");
                          toggleCollapsed();
                        }}
                      >
                        HOME
                      </Menu.Item>
                      <Menu.Item
                        className="htext text-center"
                        key="2"
                        onClick={() => {
                          onScrollToAboutUs();
                          toggleCollapsed();
                        }}
                      >
                        ABOUT US
                      </Menu.Item>
                      <Menu.Item
                        className="htext text-center"
                        key="3"
                        onClick={() => {
                          onScrollToServices();
                          toggleCollapsed();
                        }}
                      >
                        SERVICES
                      </Menu.Item>
                      <Menu.Item
                        className="htext text-center"
                        key="4"
                        onClick={toggleCollapsed}
                      >
                        CHAT
                      </Menu.Item>
                      <Menu.Item
                        className="htext text-center"
                        key="5"
                        onClick={() => {
                          navigate("/parts");
                          toggleCollapsed();
                        }}
                      >
                        PARTS
                      </Menu.Item>
                      <Menu.Item
                        className="htext text-center"
                        key="6"
                        onClick={toggleCollapsed}
                      >
                        BOOK APPOINTMENT
                      </Menu.Item>
                    </Menu>
                  </div>
                  <div className="w-16 md:w-28 xl:w-32 ml-5 mr-3 xl:mr-0 xl:ml-0">
                    {!isLoggedIn ? (
                      <Link to="/login">
                        <p className="text-stone-200 hover:text-blue-600 duration-300 htext text-base md:text-lg lg:text-xl mt-1 md:mt-0">
                          LOGIN
                        </p>
                      </Link>
                    ) : (
                      <div>
                        <div>
                          <span
                            onClick={toggleProfileMenu}
                            className="cursor-pointer flex items-center bg-transparent text-stone-200 w-16 relative group"
                          >
                            {/* Profile Image */}
                            <img
                              src={
                                isProfileMenuOpen
                                  ? "/icons/userblue.png"
                                  : "/icons/userwhite.png"
                              }
                              className={`w-8 h-8 md:w-12 md:h-12 transition-opacity duration-300 ${
                                !isProfileMenuOpen &&
                                "opacity-100 group-hover:opacity-0"
                              }`}
                              alt="user"
                            />
                            {!isProfileMenuOpen && (
                              <img
                                src="/icons/userblue.png"
                                className="absolute w-8 h-8 md:w-12 md:h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                alt="user-blue"
                              />
                            )}

                            {/* DownOutlined icon */}
                            <DownOutlined
                              className={`transition-colors duration-300 ${
                                isProfileMenuOpen
                                  ? "text-blue-500"
                                  : "text-white group-hover:text-blue-500"
                              } text-sm md:text-base`}
                              style={{
                                transition: "color 0.3s ease",
                              }}
                            />
                          </span>
                        </div>
                        <Menu
                          className={`${
                            !isProfileMenuOpen ? "hidden" : "block"
                          } bg-neutral-400`}
                          style={{
                            width: 200,
                            position: "absolute",
                            zIndex: 2000,
                            marginTop: 15,
                            marginLeft: -150,
                            borderRadius: 10,
                          }}
                        >
                          <Menu.Item
                            className="htext"
                            key="1"
                            onClick={() => {
                              navigate("/userprofile");
                              toggleProfileMenu();
                            }}
                          >
                            My Profile
                          </Menu.Item>
                          <Menu.Item
                            className="htext"
                            key="2"
                            onClick={() => {
                              navigate("/appointment");
                              toggleProfileMenu();
                            }}
                          >
                            Book Appointment
                          </Menu.Item>
                          <Menu.Item
                            className="htext"
                            key="3"
                            onClick={() => {
                              navigate("/myappointments");
                              toggleProfileMenu();
                            }}
                          >
                            My Appointments
                          </Menu.Item>
                          <Menu.Item
                            className="htext"
                            key="4"
                            onClick={handleLogout}
                          >
                            Logout
                          </Menu.Item>
                        </Menu>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UHeader;
