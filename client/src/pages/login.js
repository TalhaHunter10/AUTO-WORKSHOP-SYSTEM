import { Input } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="md:mx-20">
      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
          <div className="mt-10 md:mt-0 pl-0 pr-0 md:pl-10 lg:pl-20 xl:pl-48 md:pr-20 md:mb-20">
            <h1 className="htext text-4xl md:text-6xl">Login Now</h1>
            <p className="btext text-xl md:text-2xl mt-6">
              Hi, Welcome Back &#x1F44B;
            </p>
            <form className="mt-10">
              <p className="btext font-semibold text-xl">Email</p>
              <Input
                placeholder="Enter your email address"
                type="email"
                className="mt-2 h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <p className="btext font-semibold mt-5 text-xl">Password</p>
              <Input.Password
                placeholder="Enter your password"
                className="mt-2 h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Forgot Password ?
              </Link>
            </p>
            <Button
              text="Login"
              onClick={handleSubmit}
              style="mt-8 mb-5 w-full h-12 text-xl"
            />
            <p className="btext text-center flex justify-center">
              <span className="font-semibold mr-1">Not registered yet? </span>{" "}
              Create an Account -{" "}
              <p className="font-semibold text-blue-600 hover:scale-110 duration-300 ml-2">
                <Link to="/signup"> Sign Up</Link>
              </p>
            </p>
          </div>
        </div>

        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 p-10 md:p-20 ">
          <img
            src="/illustrations/login.png"
            className="w-full"
            alt="User Login"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
