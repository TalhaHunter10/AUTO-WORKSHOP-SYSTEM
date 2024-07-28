import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const UHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [collapsed, setCollapsed] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
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
              <p className="bg-blue-500 h-6 md:h-12 w-[60%] lg:w-[35%] -ml-6 text-center content-center cursor-pointer text-stone-200 hover:text-blue-500 hover:bg-stone-200 duration-300">
                <Link to="">
                  <span className="htext text-xs md:text-lg lg:text-xl ">
                    Book Appointment
                  </span>
                </Link>
              </p>

              <p className="bg-neutral-50 h-6 md:h-12 transform  skew-x-[45deg] w-[12%] -ml-6"></p>
            </div>
            <div className="flex justify-stretch">
              <p className="bg-neutral-50 h-10 md:h-14 transform  skew-x-[-45deg] w-[20%]"></p>
              <div className="strip bg-neutral-400 h-10 md:h-14 align-center content-center w-full -ml-7">
                {/*Navbar*/}
                <div className="pl-20 flex justify-end xl:justify-evenly">
                  <div className=" justify-evenly align-center w-full hidden xl:flex">
                    <Link to="/">
                      <p className="text-stone-200 hover:text-blue-600 duration-300">
                        <span className="htext text-xs md:text-lg lg:text-xl">
                          HOME
                        </span>
                      </p>
                    </Link>
                    <Link to="">
                      <p className="text-stone-200 hover:text-blue-600 duration-300">
                        <span className="htext text-xs md:text-lg lg:text-xl">
                          ABOUT US
                        </span>
                      </p>
                    </Link>
                    <Link to="">
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
                    <Link to="">
                      <p className="text-stone-200 hover:text-blue-600 duration-300">
                        <span className="htext text-xs md:text-lg lg:text-xl">
                          PARTS
                        </span>
                      </p>
                    </Link>
                    <Link to="">
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
                        onClick={toggleCollapsed}
                      >
                        HOME
                      </Menu.Item>
                      <Menu.Item
                        className="htext text-center"
                        key="2"
                        onClick={toggleCollapsed}
                      >
                        ABOUT US
                      </Menu.Item>
                      <Menu.Item
                        className="htext text-center"
                        key="3"
                        onClick={toggleCollapsed}
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
                        onClick={toggleCollapsed}
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
                      <Link to="">
                        <p className="text-stone-200 hover:text-blue-600 duration-300 htext text-base md:text-lg lg:text-xl mt-1 md:mt-0">
                          LOGIN
                        </p>
                      </Link>
                    ) : (
                      <div>
                        <p
                          onClick={toggleProfileMenu}
                          className="cursor-pointer flex bg-transparent border-none text-stone-200 hover:scale-105 duration-300"
                        >
                          {!isProfileMenuOpen ? (
                            <img
                              src="/icons/userwhite.png"
                              className="w-8 h-8"
                              alt="user"
                            />
                          ) : (
                            <img
                              src="/icons/userblue.png"
                              className="w-8 h-8"
                              alt="user"
                            />
                          )}
                        </p>
                        <Menu
                          className={`${
                            !isProfileMenuOpen ? "hidden" : "block"
                          } bg-neutral-400`}
                          style={{
                            width: 200,
                            position: "absolute",
                            zIndex: 1,
                            marginTop: 15,
                            marginLeft: -150,
                            borderRadius: 10,
                          }}
                        >
                          <Menu.Item
                            className="htext"
                            key="1"
                            onClick={toggleProfileMenu}
                          >
                            My Profile
                          </Menu.Item>
                          <Menu.Item
                            className="htext"
                            key="2"
                            onClick={toggleProfileMenu}
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
