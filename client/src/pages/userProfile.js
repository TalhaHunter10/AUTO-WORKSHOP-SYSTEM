import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Loader } from "../components/loader";
import { Divider, Input } from "antd";
import Button from "../components/button";
import { checkLoginStatus, updatePassword } from "../services/authService";
import { getUserData, updateUser } from "../services/userService";

const UserProfile = () => {
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showEditProfileForm, setShowEditProfileForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [profileerrors, setProfileErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [FormData, setFormData] = useState({
    name: "",
    phoneno: "",
    oldpassword: "",
    password: "",
    confirmpassword: "",
  });

  const { oldpassword, password, name, phoneno } = FormData;

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

  useEffect(() => {
    LoginStatus();
  }, []);

  const fetchdata = async () => {
    setIsLoading(true);
    try {
      const data = await getUserData();
      setUserData(data);
      setFormData({
        name: data.name,
        phoneno: data.phoneno,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...FormData,
      [name]: value,
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (
      !FormData.oldpassword &&
      !FormData.password &&
      !FormData.confirmpassword
    ) {
      validationErrors.oldpassword = "Old Password is required !";
      validationErrors.password = "Password is required !";
      validationErrors.confirmpassword = "Confirm Password is required !";
      setErrors(validationErrors);
      return;
    }

    if (!FormData.oldpassword.trim()) {
      validationErrors.oldpassword = "Old Password is required !";
    } else if (FormData.oldpassword.length < 8) {
      validationErrors.oldpassword =
        "Password needs to have 8 characters minimum !";
    }

    if (!FormData.password.trim()) {
      validationErrors.password = "Password is required !";
    } else if (FormData.password.length < 8) {
      validationErrors.password =
        "Password needs to have 8 characters minimum !";
    }

    if (!FormData.confirmpassword.trim()) {
      validationErrors.confirmpassword = "Confirm Password is required !";
    } else if (FormData.password !== FormData.confirmpassword) {
      validationErrors.confirmpassword = "Passwords do not match !";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const userData = {
        oldpassword,
        password,
      };
      setIsLoading(true);
      try {
        const res = await updatePassword(oldpassword, password);
        if (res.status === 200) {
          toast.success("Password Updated Successfully !");
          setShowChangePasswordForm(false);
          setShowEditProfileForm(false);
        } else if (res.status === 400) {
          toast.error("Old Password is incorrect !");
        } else {
          toast.error("Password Update Failed !");
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const handleProfileChange = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!FormData.name.trim()) {
      validationErrors.name = "Name is required !";
    } else if (
      !/^[a-zA-Z]{2,40}(?: [a-zA-Z]{2,40}){1,3}$/.test(FormData.name)
    ) {
      validationErrors.name = "Enter a Valid Name !";
    }

    if (!FormData.phoneno.trim()) {
      validationErrors.phoneno = "Phone No. is required !";
    } else if (
      !/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm.test(FormData.phoneno)
    ) {
      validationErrors.phoneno = "Enter a Valid Phone No. !";
    }

    setProfileErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const userData = {
        name,
        phoneno,
      };
      setIsLoading(true);
      try {
        const res = await updateUser(userData);
        if (res.status === 200) {
          toast.success("Profile Updated Successfully !");
          setShowChangePasswordForm(false);
          setShowEditProfileForm(false);
        } else {
          toast.error("Profile Update Failed !");
        }
        fetchdata();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const handleShowChangePasswordForm = () => {
    setShowChangePasswordForm(true);
    setShowEditProfileForm(false);
  };

  const handleShowEditProfileForm = () => {
    setShowChangePasswordForm(false);
    setShowEditProfileForm(true);
  };

  const handleShowProfile = () => {
    setShowChangePasswordForm(false);
    setShowEditProfileForm(false);
  };

  return (
    <div className="p-12">
      <Loader isLoading={isLoading} />
      <div className="flex flex-wrap justify-center md:justify-between mb-5">
        <h1 className="htext text-4xl text-blue-500 pb-8">My Profile</h1>
        <div className="flex justify-center">
          <Button
            style={"px-4 py-3 rounded-md text-base md:text-xl mr-2 mb-2"}
            onClick={handleShowProfile}
            text={"View Profile"}
          />
          <Button
            style={"px-4 py-3 rounded-md text-base md:text-xl mr-2 mb-2"}
            text={"Change Password"}
            onClick={handleShowChangePasswordForm}
          />
          <Button
            style={"px-4 py-3 rounded-md text-base md:text-xl mb-2"}
            text={"Edit Profile"}
            onClick={handleShowEditProfileForm}
          />
        </div>
      </div>

      {showChangePasswordForm && (
        // Change password form
        <div className="p-6 rounded-md bg-neutral-400 htext text-xl text-stone-200 text-center align-center justify-center">
          <p className="text-3xl text-center">Change Password</p>
          <div className="mt-5 md:w-96 text-center m-auto">
            <Input.Password
              type="password"
              placeholder="Old Password"
              className="mb-6 h-12 btext font-bold text-base"
              name="oldpassword"
              value={oldpassword}
              onChange={handleChange}
            />
            {errors.oldpassword && (
              <h1 className="text-red-600 text-left text-sm mt-[-15px] mb-6">
                {errors.oldpassword}
              </h1>
            )}

            <Input.Password
              type="password"
              className="mb-6 h-12 btext font-bold text-base"
              onChange={handleChange}
              name="password"
              placeholder="New Password"
            />
            {errors.password && (
              <h1 className="text-red-600 text-left text-sm mt-[-15px] mb-6">
                {errors.password}
              </h1>
            )}

            <Input.Password
              type="password"
              className="mb-6 h-12 btext font-bold text-base"
              onChange={handleChange}
              name="confirmpassword"
              placeholder="Confirm Password"
            />
            {errors.confirmpassword && (
              <h1 className="text-red-600 text-left text-sm mt-[-15px] mb-6">
                {errors.confirmpassword}
              </h1>
            )}

            <Button
              text="Change Password"
              onClick={handlePasswordChange}
              style="mt-8 mb-5 w-full h-12 text-xl rounded-md"
            ></Button>
          </div>
        </div>
      )}

      {showEditProfileForm && (
        // Edit profile form
        <div className="p-6 rounded-md bg-neutral-400 htext text-xl text-stone-200 text-center align-center justify-center">
          <p className="text-3xl text-center">Edit Profile</p>
          <div className="mt-5 md:w-96 text-center m-auto">
            <Input
              type="text"
              className="mb-6 h-12 btext font-black text-base"
              name="name"
              value={FormData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {profileerrors.name && (
              <h1 className="text-red-600 text-left text-sm mt-[-15px] mb-6">
                {profileerrors.name}
              </h1>
            )}

            <Input
              type="text"
              className="mb-6 h-12 btext font-black text-base"
              name="phoneno"
              value={FormData.phoneno}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
            {profileerrors.phoneno && (
              <h1 className="text-red-600 text-left text-sm mt-[-15px] mb-6">
                {profileerrors.phoneno}
              </h1>
            )}

            <Button
              text="Update Profile"
              onClick={handleProfileChange}
              style="mt-8 mb-5 w-full h-12 text-xl rounded-md"
            ></Button>
          </div>
        </div>
      )}

      {!showChangePasswordForm &&
        !showEditProfileForm &&
        userData &&
        Object.keys(userData).length > 0 && (
          // Display user profile details when userData is fetched and not empty
          <div className="mt-3 p-6 rounded-md bg-neutral-400">
            <p className="htext text-stone-200 text-lg md:text-4xl text-right md:m-5">
              {userData.email}
            </p>
            <Divider style={{ margin: 1 }} />
            <div className="flex flex-wrap justify-between m-5 btext">
              <p className="text-blue-500 font-bold text-xl p-1">
                Registered Name
              </p>
              <p className="text-stone-200 font-bold text-xl p-1">
                {userData.name &&
                  userData.name
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
              </p>
            </div>
            <div className="flex flex-wrap justify-between m-5 btext">
              <p className="text-blue-500 font-bold text-xl p-1">
                Registered Phone
              </p>
              <p className="text-stone-200 font-bold text-xl p-1">
                {userData.phoneno}
              </p>
            </div>
          </div>
        )}

      {!showChangePasswordForm &&
        !showEditProfileForm &&
        (!userData || Object.keys(userData).length === 0) && (
          // Display message when userData is empty
          <></>
        )}

      <div className=" border-2 border-blue-500 p-10 rounded-lg ml-10 mr-10 mt-10">
        <h1 className="md:text-3xl btext md:pl-8">
          Want to book appointment here at{" "}
          <span className="htext text-blue-500">Capital Autos?</span>
        </h1>
        <p className=" text-right mt-4 mr-8">
          <Button
            text="Book Appointment"
            style="htext text-sm md:text-xl px-4 md:px-6 py-2 rounded-md"
            onClick={() => {
              if (isLoggedIn) {
                navigate("/appointment");
              } else {
                toast.error("Login to book appointment !");
                navigate("/login");
              }
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
