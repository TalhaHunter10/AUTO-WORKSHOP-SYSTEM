import { Input } from "antd";
import { useState } from "react";
import Button from "../components/button";
import { Link } from "react-router-dom";

const RecoverAccount = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
            <h1 className="htext text-3xl md:text-5xl">Recover Account</h1>
            <p className="btext text-xl md:text-2xl mt-6">
              Enter the recovery code sent to your email address.
            </p>
            <form className="mt-10">
              <p className="btext font-semibold text-xl">Recovery Code</p>
              <Input
                placeholder="Enter your recovery code"
                type="text"
                className="mt-2 h-12"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <p className="btext font-semibold mt-5 text-xl">New Password</p>
              <Input.Password
                placeholder="Enter your new password"
                className="mt-2 h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <p className="btext font-semibold mt-5 text-xl">
                Confirm Password
              </p>
              <Input.Password
                placeholder="Confirm your new password"
                className="mt-2 h-12"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </form>

            <Button
              text="Change Password"
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
            alt="forgot password"
          />
        </div>
      </div>
    </div>
  );
};

export default RecoverAccount;
