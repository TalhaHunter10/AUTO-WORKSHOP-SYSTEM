import { useEffect, useState } from "react";
import { checkLoginStatus } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";

const BookAppointment = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    LoginStatus();
  }, []);

  const LoginStatus = async () => {
    try {
      const res = await checkLoginStatus();
      if (res.data.verified) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="">
      <div className="h-[30vh] bg-blue-500 flex justify-between items-center">
        <Image
          src="../images/gearsReverse.png"
          alt="gears"
          height={"85%"}
          preview={false}
          className="hidden lg:flex "
        />
        <div className="flex flex-col justify-center text-center space-y-2">
          <p className="text-white text-2xl md:text-4xl font-bold htext">
            Book Service
          </p>
          <p className="text-white text-lg md:text-xl font-semibold btext">
            {" "}
            Your Car, Your Schedule – Easy Appointments, Expert Care!
          </p>
        </div>
        <Image
          src="../images/gears.png"
          alt="gears"
          height={"85%"}
          preview={false}
          className="hidden lg:flex "
        />
      </div>
      <div className="mx-[5%] lg:mx-[20%] h-[50vh] elevation -mt-16 lg:-mt-20 rounded-t-xl bg-neutral-50 py-6 px-8 text-center">
        <h1 className="text-blue-500 text-xl md:text-3xl btext font-semibold mb-2">
          Fill Out the Form to Book Your Service
        </h1>
      </div>
    </div>
  );
};

export default BookAppointment;
