import { Input } from "antd";
import { useEffect, useState } from "react";
import Button from "../components/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { checkLoginStatus, confirmEmail } from "../services/authService";
import { toast } from "react-toastify";
import { Loader } from "../components/loader";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { email } = useParams();

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
      validationErrors.code = "Verification code is required !";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const res = await confirmEmail(email, code);
        if (res.status === 400) {
          if (res.type === "notFound") {
            toast.error("Email not found. Please register again !");
          } else if (res.type === "inValid") {
            toast.error("Invalid verification code !");
          } else if (res.type === "expired") {
            toast.error("Verification code expired. Please register again !");
          } else {
            toast.error("Something went wrong. Please try again !");
          }
        } else if (res.status === 200) {
          toast.success("Email verified successfully !");
          navigate("/login");
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
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
            <h1 className="htext text-3xl md:text-5xl">Verify Email Address</h1>
            <p className="btext text-xl md:text-2xl mt-6">
              Enter the verification code sent to your email address.
              <span className="text-md text-red-600">({email})</span>
            </p>
            <form className="mt-10">
              <p className="btext font-semibold text-xl">Verification Code</p>
              <Input
                placeholder="Enter your verification code"
                type="text"
                className="mt-2 h-12"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              {errors.code && (
                <h1 className="text-red-600 mb-6">{errors.code}</h1>
              )}

              <Button
                text="Confirm"
                onClick={handleSubmit}
                style="mt-8 mb-5 w-full h-12 text-xl rounded-md"
              />
              <p className="btext text-center flex justify-left">
                <span className="font-semibold mr-1">Wrong Email? </span>
                <p className="font-semibold text-blue-600 hover:scale-110 duration-300 ml-2">
                  <Link to="/signup"> Register Again</Link>
                </p>
              </p>
            </form>
          </div>
        </div>

        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 p-10 md:p-20 ">
          <img
            src="/illustrations/signup.png"
            className="w-full"
            alt="register"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
