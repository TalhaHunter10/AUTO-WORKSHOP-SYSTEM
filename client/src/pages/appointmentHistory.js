import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLoginStatus } from "../services/authService";
import {
  deleteAppointment,
  getAppointments,
} from "../services/appointmentService";
import { Modal, Space, Table, Tag, Tooltip } from "antd";
import { DeleteOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { Loader } from "../components/loader";
import { toast } from "react-toastify";
import Button from "../components/button";

const AppointmentHistory = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalVisible(true);
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
      dataIndex: "IssuedDate",
      key: "issuedDate",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"),
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
                  toast.success("Thank you for rating the appointment");
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
      <div className="m-5 md:mx-32 md:mt-16 md:flex md:justify-between text-center">
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
    </div>
  );
};

export default AppointmentHistory;
