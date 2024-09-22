import { Input } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button";
import { checkLoginStatus, forgotPassword } from "../services/authService";
import { toast } from "react-toastify";
import { Loader } from "../components/loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [email]);

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

    if (!email.trim()) {
      validationErrors.email = "Email is required !";
    } else if (!/^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) {
      validationErrors.email = "Enter a Valid Email !";
    }
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const res = await forgotPassword(email);
        if (res.status === 404) {
          toast.error("Email is not associated with any user !");
        } else if (res.status === 400 && res.type === "notVerified") {
          toast.error(
            "Email is not verified ! Register again and verify email."
          );
        } else if (res.status === 200) {
          toast.success("Recovery code sent to your email address !");
          navigate(`/resetpassword/${email}`);
        } else {
          toast.error("Something went wrong. Please try again !");
        }

        setIsLoading(false);
      } catch (err) {
        setError(true);
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
              {error.email && (
                <h1 className="text-red-600 mb-6">{error.email}</h1>
              )}
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
