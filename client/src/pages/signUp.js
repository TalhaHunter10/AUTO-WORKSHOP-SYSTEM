import { Input } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button";

const SignUp = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = [];
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="md:mx-20 mt-5 ">
      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div className=" mb-12 basis-auto md:mb-0 w-[90%] md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
          <div className="mt-10 md:mt-0 pl-0 pr-0 md:pl-10 lg:pl-20 xl:pl-48 md:pr-20 md:mb-20">
            <h1 className="htext text-3xl md:text-5xl">Sign Up</h1>

            <form className="mt-10">
              <p className="btext font-semibold text-lg">Full Name</p>
              <Input
                placeholder="Enter your full name"
                type="text"
                className="mt-2 h-10"
                value={formdata.name}
                onChange={(e) =>
                  setFormdata({ ...formdata, name: e.target.value })
                }
              />

              <p className="btext font-semibold mt-5 text-lg">Email</p>
              <Input
                placeholder="Enter your email address"
                type="email"
                className="mt-2 h-10"
                value={formdata.email}
                onChange={(e) =>
                  setFormdata({ ...formdata, email: e.target.value })
                }
              />

              <p className="btext font-semibold mt-5 text-lg">Phone Number</p>
              <Input
                placeholder="Enter your phone number"
                type="text"
                className="mt-2 h-10"
                value={formdata.phoneno}
                onChange={(e) =>
                  setFormdata({ ...formdata, phoneno: e.target.value })
                }
              />

              <p className="btext font-semibold mt-5 text-lg">Password</p>
              <Input.Password
                placeholder="Enter your password"
                className="mt-2 h-10"
                value={formdata.password}
                onChange={(e) =>
                  setFormdata({ ...formdata, password: e.target.value })
                }
              />

              <p className="btext font-semibold mt-5 text-lg">
                Confirm Password
              </p>
              <Input.Password
                placeholder="Confirm your password"
                className="mt-2 h-10"
                value={formdata.confirmPassword}
                onChange={(e) =>
                  setFormdata({ ...formdata, confirmPassword: e.target.value })
                }
              />
            </form>
            <p
              to=""
              className="btext text-blue-600 font-semibold text-right mt-3 "
            >
              <Link
                to=""
                className=" cursor-pointer hover:text-red-600 duration-300"
              >
                {" "}
                Terms and Conditions
              </Link>
            </p>
            <Button
              text="Sign Up"
              onClick={handleSubmit}
              style="mt-5 mb-5 w-full h-12 text-xl"
            />
            <p className="btext text-center flex justify-center">
              <span className="font-semibold mr-1">Already registered? </span>{" "}
              <p className="font-semibold text-blue-600 hover:scale-110 duration-300 ml-2">
                <Link to="/login">Login</Link>
              </p>
            </p>
          </div>
        </div>

        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 p-10 md:p-20 ">
          <img
            src="/illustrations/signup.png"
            className="w-full"
            alt="User Login"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
