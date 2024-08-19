import { Input } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
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
    <div className="mx-8 md:mx-20">
      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
          <div className="mt-10 md:mt-0 pl-0 pr-0 md:pl-10 lg:pl-20 xl:pl-48 md:pr-20 md:mb-20">
            <h1 className="htext text-3xl md:text-5xl">Forgot Password</h1>
            <p className="btext text-xl md:text-2xl mt-6">
              Enter you registered email address to recieve recovery code.
            </p>
            <form className="mt-10">
              <p className="btext font-semibold text-xl">Email Address</p>
              <Input
                placeholder="Enter your email address"
                type="email"
                className="mt-2 h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </form>

            <Button
              text="Send Recovery Code"
              onClick={handleSubmit}
              style="mt-8 mb-5 w-full h-12 text-xl rounded-md"
            />
            <p className="btext text-center flex justify-left">
              <span className="font-semibold mr-1">Got your Password? </span>
              <p className="font-semibold text-blue-600 hover:scale-110 duration-300 ml-2">
                <Link to="/login"> Login</Link>
              </p>
            </p>
          </div>
        </div>

        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 p-10 md:p-20 ">
          <img
            src="/illustrations/forgotPassword.png"
            className="w-full"
            alt="User Login"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
