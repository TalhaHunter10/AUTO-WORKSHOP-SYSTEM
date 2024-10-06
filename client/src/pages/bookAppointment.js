import { useEffect, useState } from "react";
import { checkLoginStatus } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { DatePicker, Image, Input } from "antd";
import Button from "../components/button";
import { toast } from "react-toastify";
import { createAppointment } from "../services/appointmentService";
import moment from "moment";

const BookAppointment = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    subject: "",
    carName: "",
    carNumber: "",
    details: "",
    date: "",
  });

  useEffect(() => {
    LoginStatus();
  }, []);

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

  const onChange = (date) => {
    const today = moment().startOf("day"); // Get today's date at the start of the day

    if (date && date.isAfter(today)) {
      setData({ ...data, date: date.format("YYYY-MM-DD") }); // Save formatted date
    } else {
      toast.error("Please select a future date");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!data.subject.trim()) {
      validationErrors.subject = "Subject is required !";
    }

    if (!data.carName.trim()) {
      validationErrors.carName = "Car Name is required !";
    }

    if (!data.carNumber.trim()) {
      validationErrors.carNumber = "Car Number is required !";
    } else if (data.carNumber.length < 3 || data.carNumber.length > 10) {
      validationErrors.carNumber = "Enter a valid Car Number !";
    }

    if (!data.details.trim()) {
      validationErrors.details = "details is required !";
    }

    if (!data.date.trim()) {
      validationErrors.date = "Date is required !";
    }

    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const res = await createAppointment(data);
        if (res.status === 201) {
          toast.success("Appointment Booked Successfully");
          navigate("/myappointments");
        } else if (res.status === 400 && res.type === "alreadyExists") {
          toast.error("Appointment already exists");
        } else if (res.status === 400) {
          toast.error("All fields are required");
        } else {
          toast.error("Something went wrong. Please try again later");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    } else {
      toast.error("Please fill all the fields correctly");
    }
  };

  return (
    <div className="">
      <div className="h-[30vh] bg-blue-500 flex justify-between items-center">
        <Image
          src="../images/gearsReverse.png"
          alt="gears"
          height={"85%"}
          preview={false}
          className="hidden lg:flex "
        />
        <div className="flex flex-col justify-center text-center space-y-2">
          <p className="text-white text-2xl md:text-4xl font-bold htext">
            Book Service
          </p>
          <p className="text-white text-lg md:text-xl font-semibold btext">
            {" "}
            Your Car, Your Schedule – Easy Appointments, Expert Care!
          </p>
        </div>
        <Image
          src="../images/gears.png"
          alt="gears"
          height={"85%"}
          preview={false}
          className="hidden lg:flex "
        />
      </div>
      <div className="mx-[5%] lg:mx-[20%] elevation -mt-16 lg:-mt-20 rounded-t-xl bg-neutral-50 py-6 px-8 text-center">
        <h1 className="text-blue-500 text-xl md:text-3xl btext font-semibold mb-2">
          Fill Out the Form to Book Your Service
        </h1>
        <div className="btext font-semibold text-left md:p-5">
          <p className="text-lg mb-1">Subject</p>
          <Input
            placeholder="Subject"
            className="h-12 text-lg font-semibold"
            onChange={(e) => setData({ ...data, subject: e.target.value })}
          />
          {error.subject && (
            <h1 className="text-red-600 mb-6">{error.subject}</h1>
          )}

          <p className="text-lg mt-3 mb-1">Car Name/Company</p>
          <Input
            placeholder="Car Name/Company"
            className="h-12 text-lg font-semibold"
            onChange={(e) => setData({ ...data, carName: e.target.value })}
          />
          {error.carName && (
            <h1 className="text-red-600 mb-6">{error.carName}</h1>
          )}

          <p className="text-lg mt-3 mb-1">Car Number</p>
          <Input
            placeholder="Car Number"
            className="h-12 text-lg font-semibold"
            onChange={(e) => setData({ ...data, carNumber: e.target.value })}
          />
          {error.carNumber && (
            <h1 className="text-red-600 mb-6">{error.carNumber}</h1>
          )}

          <p className="text-lg mt-3 mb-1">Details</p>
          <Input.TextArea
            placeholder="Enter Work Order Details here"
            className="text-lg font-semibold"
            style={{ height: "100px" }}
            onChange={(e) => setData({ ...data, details: e.target.value })}
          />
          {error.details && (
            <h1 className="text-red-600 mb-6">{error.details}</h1>
          )}

          <p className="text-lg mt-3 mb-1">Date</p>
          <DatePicker
            onChange={onChange}
            value={data.date ? moment(data.date, "YYYY-MM-DD") : null}
            className="w-full h-12 text-lg"
          />
          {error.date && <h1 className="text-red-600 mb-6">{error.date}</h1>}

          <div className="text-center">
            <Button
              text="Book Appointment"
              onClick={handleSubmit}
              style="mt-8 w-full md:w-[30%] h-12 text-xl rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
