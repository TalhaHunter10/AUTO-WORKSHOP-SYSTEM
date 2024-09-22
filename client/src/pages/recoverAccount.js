import { Input } from "antd";
import { useEffect, useState } from "react";
import Button from "../components/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { checkLoginStatus, resetPassword } from "../services/authService";
import { Loader } from "../components/loader";
import { toast } from "react-toastify";

const RecoverAccount = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { email } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [code, password, confirmPassword]);

  useEffect(() => {
    isLoggedIn();
  }, []);

  const isLoggedIn = async () => {
    try {
      const res = await checkLoginStatus();
      if (res.data.verified) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!code.trim()) {
      validationErrors.code = "Recovery code is required !";
    }
    if (!password.trim()) {
      validationErrors.password = "Password is required !";
    }
    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm Password is required !";
    }
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match !";
    }
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const res = await resetPassword(email, code, password);
        console.log(res);
        if (res.status == 404) {
          toast.error("Email is not associated with any user !");
        } else if (res.status == 200) {
          toast.success("Password changed successfully !");
          navigate("/login");
        } else if (res.status == 500) {
          toast.error("Recovery code is incorrect or expired !");
        } else {
          toast.error("Something went wrong !");
        }
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mx-8 md:mx-20">
      <Loader isLoading={isLoading} />
      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
          <div className="mt-10 md:mt-0 pl-0 pr-0 md:pl-10 lg:pl-20 xl:pl-48 md:pr-20 md:mb-20">
            <h1 className="htext text-3xl md:text-5xl">Recover Account</h1>
            <p className="btext text-xl md:text-2xl mt-6">
              Enter the recovery code sent to your email address.
              <span className="text-md text-red-600">({email})</span>
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
              {error.code && (
                <h1 className="text-red-600 mb-6">{error.code}</h1>
              )}

              <p className="btext font-semibold mt-5 text-xl">New Password</p>
              <Input.Password
                placeholder="Enter your new password"
                className="mt-2 h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error.password && (
                <h1 className="text-red-600 mb-6">{error.password}</h1>
              )}

              <p className="btext font-semibold mt-5 text-xl">
                Confirm Password
              </p>
              <Input.Password
                placeholder="Confirm your new password"
                className="mt-2 h-12"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error.confirmPassword && (
                <h1 className="text-red-600 mb-6">{error.confirmPassword}</h1>
              )}
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
