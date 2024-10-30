import { useEffect, useState } from "react";
import Button from "../../components/button";
import { Loader } from "../../components/loader";
import {
  getAllAppointments,
  getLatestAppointments,
  updateAppointmentStatus,
} from "../../services/appointmentService";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Modal, Select, Table, Tag } from "antd";
import moment from "moment";
import { toast } from "react-toastify";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [latestAppointmentsFlag, setLatestAppointmentsFlag] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    if (latestAppointmentsFlag) {
      fetchLatestAppointments();
    } else {
      fetchAllAppointments();
    }
  };

  const fetchLatestAppointments = async () => {
    setIsLoading(true);
    try {
      const res = await getLatestAppointments();
      setAppointments(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const fetchAllAppointments = async () => {
    setIsLoading(true);
    try {
      const res = await getAllAppointments();
      setAppointments(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const changeFlag = () => {
    setLatestAppointmentsFlag(!latestAppointmentsFlag);
    getAppointments();
  };

  const columns = [
    {
      title: "Car",
      dataIndex: "carName",
      key: "carName",
      align: "center",
    },
    {
      title: "Reg. #",
      dataIndex: "carNumber",
      key: "carNumber",
      align: "center",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      align: "center",
      width: "10%",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Client",
      dataIndex: "userId",
      key: "client",
      align: "center",
      width: "10%",
      render: (userId) => {
        const formattedPhone = userId?.phoneno
          ? `${userId.phoneno.slice(0, 4)}-${userId.phoneno.slice(4)}`
          : "";
        return (
          <div>
            <p>{userId?.name}</p>
            <p className="tracking-widest">{formattedPhone}</p>
          </div>
        );
      },
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search by name or number"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => {
        const nameMatch = record.userId?.name
          ? record.userId.name.toLowerCase().includes(value.toLowerCase())
          : false;
        const phoneMatch = record.userId?.phoneno
          ? record.userId.phoneno.includes(value.replace("-", ""))
          : false;
        return nameMatch || phoneMatch;
      },
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#ffffff" : "#ffffff" }} />
      ),
    },
    {
      title: "Req. Date",
      dataIndex: "requestedDate",
      key: "requestedDate",
      align: "center",

      render: (date) => moment(date).format("DD MMM, YYYY"),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            value={selectedKeys[0] ? moment(selectedKeys[0]) : null}
            onChange={(date) =>
              setSelectedKeys(date ? [date.format("YYYY-MM-DD")] : [])
            }
            style={{ marginBottom: 8, display: "block" }}
          />
          <button
            onClick={() => confirm()}
            type="button"
            style={{ marginRight: 8 }}
          >
            Filter
          </button>
          <button onClick={clearFilters} type="button">
            Reset
          </button>
        </div>
      ),
      onFilter: (value, record) => {
        const recordDate = moment(record.requestedDate).format("YYYY-MM-DD");
        return recordDate === value;
      },
    },
    {
      title: "Issued Date",
      dataIndex: "issuedDate",
      key: "issuedDate",
      align: "center",
      render: (date) =>
        date ? moment(date).format("DD MMM, YY | HH:mm") : "Not Issued",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            value={selectedKeys[0] ? moment(selectedKeys[0]) : null}
            onChange={(date) =>
              setSelectedKeys(date ? [date.format("YYYY-MM-DD")] : [])
            }
            style={{ marginBottom: 8, display: "block" }}
          />
          <button
            onClick={() => confirm()}
            type="button"
            style={{ marginRight: 8 }}
          >
            Filter
          </button>
          <button onClick={clearFilters} type="button">
            Reset
          </button>
        </div>
      ),
      onFilter: (value, record) => {
        const recordDate = record.IssuedDate
          ? moment(record.IssuedDate).format("YYYY-MM-DD")
          : null;
        return recordDate === value;
      },
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
      align: "center",
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Approved", value: "Approved" },
        { text: "Rejected", value: "Rejected" },
        { text: "Completed", value: "Completed" },
        { text: "Discarded", value: "Discarded" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <EditOutlined
          style={{
            fontSize: 24,
            color: record.status === "Completed" ? "gray" : "black",
          }}
          onClick={() => record.status !== "Completed" && showEditModal(record)}
          disabled={record.status === "Completed"}
        />
      ),
      align: "center",
    },
  ];

  const showEditModal = (record) => {
    setSelectedAppointment(record);
    form.setFieldsValue({
      status: record.status,
      additionalNote: record.additionalNote,
      date: record.issuedDate ? moment(record.issuedDate) : null,
    });
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    onStatusChange(
      selectedAppointment._id,
      values.status,
      values.additionalNote,
      values.date
    );
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedAppointment(null);
    form.resetFields();
  };

  const onStatusChange = async (id, status, additionalNote, issuedDate) => {
    setIsLoading(true);
    try {
      const res = await updateAppointmentStatus(
        id,
        additionalNote,
        status,
        issuedDate
      );
      if (res.status === 200) {
        getAppointments();
        toast.success("Appointment status updated successfully");
      } else {
        toast.error("Something went wrong");
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  const requestedDate = selectedAppointment
    ? moment(selectedAppointment.requestedDate)
    : null;

  // Function to disable dates before the requested date
  const disabledDate = (current) => {
    return current && current.isBefore(requestedDate, "day");
  };
  return (
    <div className="mx-5 md:mx-20">
      <Loader isLoading={isLoading} />
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-blue-500 text-base md:text-3xl my-5">
            Manage Appointments
          </h1>
          <Button
            text={
              <>
                {latestAppointmentsFlag
                  ? "Load All Appointments"
                  : "Load Latest Appointments"}
              </>
            }
            style="px-4 md:px-6 rounded-lg h-10 md:h-12 text-sm md:text-lg"
            onClick={changeFlag}
          />
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={appointments}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      </div>
      <Modal
        title="Edit Appointment Status"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleOk}>
          <label className="text-base font-semibold">Status </label>
          <Form.Item
            name="status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select>
              <Select.Option value="Approved">Approved</Select.Option>
              <Select.Option value="Rejected">Rejected</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
              <Select.Option value="Discarded">Discarded</Select.Option>
            </Select>
          </Form.Item>
          <label className="text-base font-semibold">Additional Note </label>
          <Form.Item
            name="additionalNote"
            rules={[{ required: true, message: "Please enter a note" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <label className="text-base font-semibold">Issued Time & Date</label>
          <Form.Item
            name="date"
            rules={[
              ({ getFieldValue }) => ({
                required:
                  getFieldValue("status") !== "Rejected" &&
                  getFieldValue("status") !== "Discarded",
                message: "Please select a date",
              }),
            ]}
          >
            <DatePicker
              className="w-full"
              disabledDate={disabledDate}
              showTime={{ format: "HH:mm" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              text="Update"
              style="bg-blue-500 text-white w-full text-lg rounded-lg py-2 mt-4"
              htmlType="submit"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageAppointments;
