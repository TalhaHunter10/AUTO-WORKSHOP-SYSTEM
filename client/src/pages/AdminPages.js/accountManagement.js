import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Button from "../../components/button";
import { useEffect, useState } from "react";
import { deleteManager, getManagers } from "../../services/wmService";
import { Loader } from "../../components/loader";
import { Form, Input, Modal, Table, Tooltip } from "antd";
import { toast } from "react-toastify";
import { checkLoginStatus, registerWM } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const AccountManagement = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    fetchManagers();
    LoginStatus();
  }, []);

  const LoginStatus = async () => {
    try {
      const res = await checkLoginStatus();
      if (res.data.verified) {
        setLoggedInUser(res.data.user);
      } else {
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchManagers = async () => {
    setLoading(true);
    try {
      const res = await getManagers();
      setManagers(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    Modal.confirm({
      title: "Are you sure you want to delete this manager profile?",
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          const res = await deleteManager(id);
          if (res.status === 200) {
            toast.success("Manager deleted successfully");
            fetchManagers();
          } else {
            toast.error("Error occurred while deleting manager");
          }
        } catch (err) {
          console.error(err);
          toast.error("Error occurred while deleting manager");
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
      title: "S.No",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "phoneno",
      key: "phoneno",
    },
    {
      title: "Registered On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <p className="text-center">
          <Tooltip title="Delete" className="text-center">
            <DeleteOutlined
              className="cursor-pointer hover:text-red-500"
              style={{ fontSize: 24 }}
              onClick={() => handleDelete(record._id)}
            />
          </Tooltip>
        </p>
      ),
    },
  ];

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await registerWM(values);
      if (res.status === 201) {
        toast.success("Manager registered successfully");
        fetchManagers();
      } else {
        toast.error("Error occurred while registering manager");
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="md:mx-20">
      <Loader isLoading={loading} />
      {loggedInUser?.name == "admin" &&
      loggedInUser?.email == "autoaiadmin@gmail.com" ? (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-blue-500 htext text-base md:text-3xl  my-5">
              Account Management
            </h1>
            <Button
              text={
                <>
                  <PlusOutlined style={{ marginRight: "5px" }} /> Manager
                </>
              }
              style="px-4 md:px-6 rounded-lg h-10 md:h-12 text-sm md:text-lg"
              onClick={showModal}
            />
          </div>
          <div className=" md:my-10 overflow-x-auto">
            <Table
              columns={columns}
              dataSource={managers.map((item, index) => ({
                ...item,
                key: index,
              }))}
              pagination={false}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-red-500 text-2xl">
            You are not authorized to view this page
          </h1>
        </div>
      )}
      <Modal
        title="Register Workshop Manager"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <p className="text-base text-gray-900 font-semibold btext mb-1">
            Name
          </p>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please enter the manager's name" },
            ]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <p className="text-base text-gray-900 font-semibold btext mb-1">
            E-mail
          </p>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <p className="text-base text-gray-900 font-semibold btext mb-1">
            Password
          </p>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter a password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <p className="text-base text-gray-900 font-semibold btext mb-1">
            Contact No
          </p>
          <Form.Item
            name="phoneno"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item className="text-right">
            <Button
              text="Register"
              htmlType="submit"
              style="px-4 py-2 rounded-lg text-lg"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountManagement;
