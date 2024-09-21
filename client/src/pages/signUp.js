import { Input } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button";
import { checkLoginStatus, registerUser } from "../services/authService";
import { Loader } from "../components/loader";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phoneno: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    setErrors("");
  }
  , [formdata]);

  useEffect(() => {
    isLoggedIn();
  }
  , []);

  
  
  const isLoggedIn = async () => {
    try {
      const res = await checkLoginStatus();
      if(res.verified){
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const { name, email, phoneno, password } = formdata;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {}

    if (!formdata.name.trim()) {
      validationErrors.name = 'Name is required !';
    } else if (!/^[a-zA-Z]{2,40}(?: [a-zA-Z]{2,40}){0,3}$/.test(formdata.name)) {
      validationErrors.name = 'Enter a Valid Name !';
    }

    if (!formdata.email.trim()) {
      validationErrors.email = 'Email is required !';
    } else if (!/^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(formdata.email)) {
      validationErrors.email = 'Enter a Valid Email !';
    }

    if (!formdata.phoneno.trim()) {
      validationErrors.phoneno = 'Phone No. is required !';
    } else if (!/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm.test(formdata.phoneno)) {
      validationErrors.phoneno = 'Enter a Valid Phone No. !';
    }

    if (!formdata.password.trim()) {
      validationErrors.password = 'Password is required !';
    } else if (formdata.password.length < 8) {
      validationErrors.password = 'Password needs to have 8 characters minimum !';
    }

    if (!formdata.confirmPassword.trim()) {
      validationErrors.confirmPassword = 'Confirm Password is required !';
    } else if (formdata.password !== formdata.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match !';
    }

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      const userData = {
        name, email, phoneno, password
      }
      setIsLoading(true)
      try {
        const res = await registerUser(userData)
       if(res.status === 200 || res.status === 201){
        toast.success('Verification Code has been sent to your email address !')
        navigate(`/confirm-email/${formdata.email}`)
       }
       else{
        if(res.status === 400 && res.type === 'exists'){
          toast.error('User already exists !')
        }
        else{
          toast.error('Something went wrong. Please try again !')
        }
       }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
  };
  return (
    <div className="md:mx-20 mt-5 ">
      <Loader isLoading={isLoading} />
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
              {errors.name && <h1 className='text-red-600 mb-6'>{errors.name}</h1>}

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
              {errors.email && <h1 className='text-red-600 mb-6'>{errors.email}</h1>}

              <p className="btext font-semibold mt-5 text-lg">Phone Number</p>
              <Input
                placeholder="Enter your phone number"
                type="text"
                className="mt-2 h-10"
                value={formdata.c}
                onChange={(e) =>
                  setFormdata({ ...formdata, phoneno: e.target.value })
                }
              />
              {errors.phoneno && <h1 className='text-red-600 mb-6'>{errors.phoneno}</h1>}

              <p className="btext font-semibold mt-5 text-lg">Password</p>
              <Input.Password
                placeholder="Enter your password"
                className="mt-2 h-10"
                value={formdata.password}
                onChange={(e) =>
                  setFormdata({ ...formdata, password: e.target.value })
                }
              />
               {errors.password && <h1 className='text-red-600 mb-6'>{errors.password}</h1>}

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
              {errors.confirmPassword && <h1 className='text-red-600 mb-6'>{errors.confirmPassword}</h1>}
            </form>
            <p
              to=""
              className="btext text-blue-600 font-semibold text-right mt-3 "
            >
              <Link
                to="/termsandconditions"
                className=" cursor-pointer hover:text-red-600 duration-300"
                target="blank"
              >
                {" "}
                Terms and Conditions
              </Link>
            </p>
            <Button
              text="Sign Up"
              onClick={handleSubmit}
              style="mt-5 mb-5 w-full h-12 text-xl rounded-md"
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
