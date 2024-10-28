import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLoginStatus } from "../services/authService";
import {
  deleteAppointment,
  getAppointments,
} from "../services/appointmentService";
import { Input, Modal, Space, Table, Tag, Tooltip } from "antd";
import { DeleteOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { Loader } from "../components/loader";
import { toast } from "react-toastify";
import Button from "../components/button";
import { createReview } from "../services/reviewService";
import moment from "moment";

const AppointmentHistory = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [review, setReview] = useState("");

  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalVisible(true);
  };

  const handleRating = async (appointment) => {
    setSelectedAppointment(appointment);
    setIsRatingModalVisible(true);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const validationError = [];

    if (!review) {
      validationError.review = "Review is required";
    } else if (review.length < 10) {
      validationError.review = "Review must be at least 10 characters long";
    }
    setError(validationError);

    if (Object.keys(validationError).length == 0) {
      setLoading(true);
      try {
        const res = await createReview({
          appointmentId: selectedAppointment._id,
          review: review,
        });
        if (res.status === 201) {
          toast.success("Review added successfully");
          setIsRatingModalVisible(false);
        } else if (res.status === 400 && res.type === "alreadyExists") {
          toast.error("Review already exists for this appointment");
        } else {
          toast.error("Failed to add review");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error occurred while adding review");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    LoginStatus();
    fetchAppointments();
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

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await getAppointments();
      setAppointments(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    Modal.confirm({
      title: "Are you sure you want to delete this appointment?",
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          const res = await deleteAppointment(id);
          if (res.status === 200) {
            fetchAppointments();
            toast.success("Appointment deleted successfully");
          } else if (res.status === 404 && res.type === "notFound") {
            toast.error("Appointment not found");
          } else {
            toast.error("Failed to delete appointment");
          }
        } catch (err) {
          console.error(err);
          toast.error("Error occurred while deleting appointment");
        } finally {
          setLoading(false);
        }
      },
      onCancel: () => {
        setLoading(false);
      },
    });
  };

  const columns = [
    {
      title: "No.",
      key: "serialNo",
      render: (text, record, index) => index + 1, // Serial number column
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Car Name",
      dataIndex: "carName",
      key: "carName",
    },
    {
      title: "Car Number",
      dataIndex: "carNumber",
      key: "carNumber",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },

    {
      title: "Note",
      dataIndex: "additionalNote",
      key: "additionalNote",
      render: (note) => (note ? note : "N/A"),
    },
    {
      title: "Requested Date",
      dataIndex: "requestedDate",
      key: "requestedDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Issued Date",
      dataIndex: "issuedDate",
      key: "issuedDate",
      render: (date) =>
        date ? moment(date).format("DD MMM, YY | HH:mm") : "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) => {
        let color;
        switch (value) {
          case "Pending":
            color = "purple";
            break;
          case "Approved":
            color = "green";
            break;
          case "Rejected":
            color = "red";
            break;
          case "Completed":
            color = "blue";
            break;
          default:
            color = "gray";
        }
        return (
          <Tag
            color={color}
            key={value}
            className="rounded-md text-base flex justify-center items-center"
          >
            {value.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <span className="flex justify-around w-32">
          <Tooltip title="View">
            <EyeOutlined
              className="cursor-pointer hover:text-blue-500"
              style={{ fontSize: 24 }}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              className="cursor-pointer hover:text-red-500"
              style={{ fontSize: 24 }}
              onClick={() => handleDelete(record._id)}
            />
          </Tooltip>

          <Tooltip title="Rate">
            <LikeOutlined
              className="cursor-pointer hover:text-green-500"
              style={{ fontSize: 24 }}
              onClick={() => {
                if (record.status !== "Completed") {
                  toast.error("Appointment is not completed yet");
                } else {
                  handleRating(record);
                }
              }}
            />
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Loader loading={loading} />
      <div className="m-5 md:mx-32 md:mt-4 md:flex md:justify-between text-center">
        <h1 className="htext text-2xl md:text-4xl text-center md:text-left text-blue-500 mb-6 md:mb-0">
          My Appointments
        </h1>
        <Button
          text="Book Appointment"
          onClick={() => navigate("/appointment")}
          style="px-2 h-12 text-xl rounded-md"
        />
      </div>

      <div className="m-10 md:mx-32 md:my-10 overflow-x-auto">
        <Table
          dataSource={appointments}
          columns={columns}
          rowKey="_id"
          style={{ height: "60vh" }}
        ></Table>
      </div>

      <Modal
        title="Appointment Details"
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        open={isModalVisible}
      >
        {selectedAppointment && (
          <div className="space-y-3 text-lg text-neutral-900 my-8">
            <p className="flex justify-between">
              <strong>Subject</strong>
              <span>{selectedAppointment.subject}</span>
            </p>
            <p className="flex justify-between">
              <strong>Car Name</strong>
              <span>{selectedAppointment.carName}</span>
            </p>
            <p className="flex justify-between">
              <strong>Car Number</strong>
              <span>{selectedAppointment.carNumber}</span>
            </p>
            <p className="flex justify-between space-x-24">
              <strong>Details</strong>
              <span>{selectedAppointment.details}</span>
            </p>
            <p className="flex justify-between">
              <strong>Admin Notes</strong>
              <span>{selectedAppointment.additionalNote || "N/A"}</span>
            </p>
            <p className="flex justify-between">
              <strong>Requested Date</strong>
              <span>
                {new Date(
                  selectedAppointment.requestedDate
                ).toLocaleDateString()}
              </span>
            </p>
            <p className="flex justify-between">
              <strong>Issued Date</strong>
              <span>
                {selectedAppointment.IssuedDate
                  ? new Date(
                      selectedAppointment.IssuedDate
                    ).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>
            <p className="flex justify-between">
              <strong>Status</strong>
              <span
                className={`${
                  selectedAppointment.status === "Pending"
                    ? "text-blue-500"
                    : selectedAppointment.status === "Approved"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {selectedAppointment.status}
              </span>
            </p>
          </div>
        )}
      </Modal>

      <Modal
        title="Add Review"
        onCancel={() => setIsRatingModalVisible(false)}
        footer={null}
        open={isRatingModalVisible}
      >
        {selectedAppointment && (
          <div className="space-y-3 text-lg text-neutral-900 my-8">
            <p className="flex justify-between">
              <strong>Subject</strong>
              <span>{selectedAppointment.subject}</span>
            </p>
            <div className="">
              <p>
                <strong>Review</strong>
              </p>
              <Input.TextArea
                className="w-full border border-gray-300 rounded-md p-2 font-semibold text-lg"
                onChange={handleReviewChange}
              ></Input.TextArea>
              {error && error.review && (
                <p className="text-red-500 text-sm">{error.review}</p>
              )}
            </div>
            <p className="text-sm text-red-500">
              Note: This can not be undone.
            </p>
            <Space className="flex justify-end">
              <button
                onClick={() => setIsRatingModalVisible(false)}
                className="px-4 h-10 text-xl rounded-md bg-red-500 text-white"
              >
                Cancel
              </button>
              <Button
                text="Submit"
                onClick={handleReviewSubmit}
                style="px-4 h-10 text-xl rounded-md"
              />
            </Space>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AppointmentHistory;
