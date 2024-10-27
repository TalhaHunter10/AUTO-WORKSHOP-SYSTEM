import { useNavigate } from "react-router-dom";
import { checkLoginStatus } from "../../services/authService";
import { useEffect, useState } from "react";
import {
  createFinancial,
  deleteFinancial,
  getFinancialData,
  updateFinancial,
} from "../../services/financialServices";
import { toast } from "react-toastify";
import { Loader } from "../../components/loader";
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Button from "../../components/button";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Table,
  Tooltip,
  Tag,
} from "antd";
import moment from "moment";

const { Option } = Select;

const FinancialManagement = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [financialData, setFinancialData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedFinancial, setSelectedFinancial] = useState(null);
  const [form] = Form.useForm();

  const showEditModal = (record) => {
    setSelectedFinancial(record);
    setIsEditModalVisible(true);
  };

  useEffect(() => {
    LoginStatus();
    fetchFinancialData();
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

  const fetchFinancialData = async () => {
    setIsLoading(true);
    try {
      const res = await getFinancialData();
      if (res.status === 200) {
        setFinancialData(res.data);
      } else {
        toast.error("Error occurred while fetching financial data");
      }
      setIsLoading(false);
    } catch (error) {
      setErrors(error);
      setIsLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await updateFinancial(selectedFinancial._id, values);
      if (res.status === 200) {
        toast.success("Transaction updated successfully");
        fetchFinancialData();
      } else {
        toast.error("Error occurred while updating transaction");
      }
    } catch (error) {
      setErrors(error);
      toast.error("Error occurred while updating transaction");
    } finally {
      setIsLoading(false);
      setIsEditModalVisible(false);
      setSelectedFinancial(null);
    }
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await createFinancial(values);
      if (res.status === 201) {
        toast.success("Transaction added successfully");
        fetchFinancialData();
      } else {
        toast.error("Error occurred while adding transaction");
      }
    } catch (error) {
      setErrors(error);
      toast.error("Error occurred while adding transaction");
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleEdit = (id) => {
    const record = financialData.find((item) => item._id === id);
    form.setFieldValue("transactionType", record.transactionType);
    form.setFieldValue("amount", record.amount);
    form.setFieldValue("date", moment(record.date));
    form.setFieldValue("category", record.category);
    form.setFieldValue("paymentMethod", record.paymentMethod);
    form.setFieldValue("description", record.description);
    showEditModal(record);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    Modal.confirm({
      title: "Are you sure you want to delete this transaction?",
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          const res = await deleteFinancial(id);
          if (res.status === 200) {
            toast.success("Transaction deleted successfully");
            fetchFinancialData();
          } else {
            toast.error("Error occurred while deleting transaction");
          }
        } catch (err) {
          console.error(err);
          toast.error("Error occurred while deleting transaction");
        } finally {
          setIsLoading(false);
        }
      },
      onCancel: () => {
        setIsLoading(false);
      },
    });
  };

  const months = [
    { text: "January", value: 0 },
    { text: "February", value: 1 },
    { text: "March", value: 2 },
    { text: "April", value: 3 },
    { text: "May", value: 4 },
    { text: "June", value: 5 },
    { text: "July", value: 6 },
    { text: "August", value: 7 },
    { text: "September", value: 8 },
    { text: "October", value: 9 },
    { text: "November", value: 10 },
    { text: "December", value: 11 },
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `Rs. ${amount}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      key: "transactionType",
      filters: [
        {
          text: "Income",
          value: "Income",
        },
        {
          text: "Expense",
          value: "Expense",
        },
      ],
      onFilter: (value, record) => record.transactionType === value,

      render: (transactionType) => (
        <Tag
          className="rounded-md text-lg flex justify-center items-center"
          color={transactionType === "Income" ? "green" : "red"}
        >
          {transactionType}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      filters: [
        {
          text: "Filter by Month",
          children: months,
        },
      ],
      onFilter: (value, record) => {
        const recordDate = new Date(record.date);
        if (typeof value === "number") {
          // Handle month filter
          return recordDate.getMonth() === value;
        }
        return false;
      },
      render: (date) => moment(date).format("DD/MM/YYYY"), // Format date
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span className="flex justify-center space-x-8">
          <Tooltip title="Edit">
            <EditOutlined
              className="cursor-pointer hover:text-blue-500"
              style={{ fontSize: 24 }}
              onClick={() => handleEdit(record._id)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              className="cursor-pointer hover:text-red-500"
              style={{ fontSize: 24 }}
              onClick={() => handleDelete(record._id)}
            />
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <div className="md:mx-20">
      <Loader isLoading={isLoading} />
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-blue-500 htext text-base md:text-3xl my-5">
            Finance Management
          </h1>
          <Button
            text={
              <>
                <PlusOutlined style={{ marginRight: 5 }} /> Transaction
              </>
            }
            style="px-4 md:px-6 rounded-lg h-10 md:h-12 text-sm md:text-lg"
            onClick={showModal}
          />
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={financialData}
            rowKey="_id" // assuming _id is the unique key for each entry
            pagination={{ pageSize: 10 }} // optional: for pagination
          />
        </div>
        {/* Modal for Adding Transaction */}
        <Modal
          title="Add Financial Transaction"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              label="Transaction Type"
              name="transactionType"
              rules={[
                { required: true, message: "Please select transaction type" },
              ]}
            >
              <Select placeholder="Select transaction type">
                <Option value="Income">Income</Option>
                <Option value="Expense">Expense</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: "Please enter the amount" }]}
            >
              <Input type="number" placeholder="Enter amount" />
            </Form.Item>

            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select category">
                <Option value="Salary">Salary</Option>
                <Option value="Sales">Sales</Option>
                <Option value="Investment">Investment</Option>
                <Option value="Rent">Rent</Option>
                <Option value="Bills">Bills</Option>
                <Option value="Supplies">Supplies</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Payment Method"
              name="paymentMethod"
              rules={[
                { required: true, message: "Please select payment method" },
              ]}
            >
              <Select placeholder="Select payment method">
                <Option value="Cash">Cash</Option>
                <Option value="Online">Online</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  max: 500,
                  message: "Description cannot exceed 500 characters",
                },
              ]}
            >
              <Input.TextArea placeholder="Enter description" maxLength={500} />
            </Form.Item>

            <Form.Item className="text-right">
              <Button
                text="Submit"
                htmlType="submit"
                style="px-4 py-2 rounded-lg text-lg"
              />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Edit Financial Transaction"
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleEditFormSubmit} form={form}>
            <Form.Item
              label="Transaction Type"
              name="transactionType"
              rules={[
                { required: true, message: "Please select transaction type" },
              ]}
            >
              <Select placeholder="Select transaction type">
                <Option value="Income">Income</Option>
                <Option value="Expense">Expense</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: "Please enter the amount" }]}
            >
              <Input type="number" placeholder="Enter amount" />
            </Form.Item>

            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select category">
                <Option value="Salary">Salary</Option>
                <Option value="Sales">Sales</Option>
                <Option value="Investment">Investment</Option>
                <Option value="Rent">Rent</Option>
                <Option value="Bills">Bills</Option>
                <Option value="Supplies">Supplies</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Payment Method"
              name="paymentMethod"
              rules={[
                { required: true, message: "Please select payment method" },
              ]}
            >
              <Select placeholder="Select payment method">
                <Option value="Cash">Cash</Option>
                <Option value="Online">Online</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  max: 500,
                  message: "Description cannot exceed 500 characters",
                },
              ]}
            >
              <Input.TextArea placeholder="Enter description" maxLength={500} />
            </Form.Item>

            <Form.Item className="text-right">
              <Button
                text="Submit"
                htmlType="submit"
                style="px-4 py-2 rounded-lg text-lg"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default FinancialManagement;
