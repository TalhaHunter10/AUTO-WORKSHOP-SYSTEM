import { Input } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import { Loader } from "../components/loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required !";
    } else if (!/^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) {
      validationErrors.email = "Enter a Valid Email !";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required !";
    } else if (password.length < 6) {
      validationErrors.password =
        "Password must be atleast 6 characters long !";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await login(email, password);
        if (response.status === 200) {
          localStorage.setItem("user", response.data);
          toast.success("Login Successful");
          navigate("/");
        } else {
          toast.error(response.message);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  return (
    <div className="md:mx-20">
      <Loader isLoading={isLoading} />
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
              {errors.email && (
                <h1 className="text-red-600 mb-6">{errors.email}</h1>
              )}

              <p className="btext font-semibold mt-5 text-xl">Password</p>
              <Input.Password
                placeholder="Enter your password"
                className="mt-2 h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <h1 className="text-red-600 mb-6">{errors.password}</h1>
              )}
            </form>
            <p
              to=""
              className="btext text-blue-600 font-semibold text-right mt-3 "
            >
              <Link
                to="/forgotpassword"
                className=" cursor-pointer hover:text-red-600 duration-300"
              >
                {" "}
                Forgot Password ?
              </Link>
            </p>
            <Button
              text="Login"
              onClick={handleSubmit}
              style="mt-8 mb-5 w-full h-12 text-xl rounded-md"
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
