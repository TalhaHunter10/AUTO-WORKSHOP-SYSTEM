import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Table,
  Image,
  Tooltip,
} from "antd";
import { Loader } from "../../components/loader";
import Button from "../../components/button";
import ImgCrop from "antd-img-crop";
import { toast } from "react-toastify";
import {
  addPart,
  deletePart,
  getAllParts,
  updatePart,
} from "../../services/partsService";
import moment from "moment";
import confirm from "antd/es/modal/confirm";

const PartsManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [parts, setParts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentPart, setCurrentPart] = useState(null);
  const [newPrice, setNewPrice] = useState(null);
  const [newQuantity, setNewQuantity] = useState(null);
  const [searchPartName, setSearchPartName] = useState("");
  const [searchPartCompany, setSearchPartCompany] = useState("");

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      setIsLoading(true);
      const response = await getAllParts();
      setParts(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setFileList([]);
  };

  const handleAddPart = async (values) => {
    try {
      const { image, ...rest } = values;
      const file = image[0].originFileObj;
      const byteArray = await getByteArray(file);
      const partData = {
        ...rest,
        image: byteArray,
      };

      const response = await addPart(partData);
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to add part");
      }
      fetchParts();
      handleCancel();
    } catch (error) {
      toast.error("Failed to add part");
    }
  };

  const getByteArray = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const byteArray = new Uint8Array(arrayBuffer);
        resolve(Array.from(byteArray));
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    form.setFieldsValue({ image: newFileList });
  };

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    );
    return `data:image/png;base64,${window.btoa(binary)}`;
  };

  const handleSearch = (dataIndex, value) => {
    if (dataIndex === "partName") {
      setSearchPartName(value);
    } else if (dataIndex === "partCompany") {
      setSearchPartCompany(value);
    }
  };

  // Define table columns
  const columns = [
    {
      title: "Sr No",
      dataIndex: "serialNumber",
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <Image
          src={arrayBufferToBase64(image.data)}
          alt="Part"
          preview={true}
          height={50}
        />
      ),
      align: "center",
    },
    {
      title: "Part Name",
      dataIndex: "partName",
      align: "center",
      filteredValue: searchPartName ? [searchPartName] : null,
      onFilter: (value, record) =>
        record.partName.toLowerCase().includes(value.toLowerCase()),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div className="flex justify-center" style={{ padding: 8 }}>
          <Input
            placeholder="Search Part Name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch("partName", selectedKeys[0])}
            style={{
              width: 188,
              marginBottom: 8,
              display: "block",
              borderRadius: 0,
            }}
          />
          <Button
            text={
              <>
                <SearchOutlined />
              </>
            }
            style="px-4 rounded-r-lg text-sm h-8"
            onClick={() => handleSearch("partName", selectedKeys[0])}
          />
        </div>
      ),
      filterIcon: () => (
        <SearchOutlined
          style={{
            color: searchPartName ? "red" : undefined,
            fontSize: 16,
          }}
        />
      ),
    },
    {
      title: "Part Company",
      dataIndex: "partCompany",
      align: "center",
      filteredValue: searchPartCompany ? [searchPartCompany] : null,
      onFilter: (value, record) =>
        record.partCompany.toLowerCase().includes(value.toLowerCase()),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div className="flex justify-center" style={{ padding: 8 }}>
          <Input
            placeholder="Search Part Company"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch("partCompany", selectedKeys[0])}
            style={{
              width: 188,
              marginBottom: 8,
              display: "block",
              borderRadius: 0,
            }}
          />
          <Button
            text={
              <>
                <SearchOutlined />
              </>
            }
            style="px-4 rounded-r-lg text-sm h-8"
            onClick={() => handleSearch("partCompany", selectedKeys[0])}
          />
        </div>
      ),
      filterIcon: () => (
        <SearchOutlined
          style={{
            color: searchPartCompany ? "red" : undefined,
            fontSize: 16,
          }}
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `Rs. ${price}`,
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("DD/MM/YYYY"),
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <span className="flex justify-center space-x-8">
          <Tooltip title="Edit">
            <EditOutlined
              className="cursor-pointer hover:text-blue-500"
              style={{ fontSize: 24 }}
              onClick={() => editPart(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              className="cursor-pointer hover:text-red-500"
              style={{ fontSize: 24 }}
              onClick={() => showDeleteConfirm(record._id)}
            />
          </Tooltip>
        </span>
      ),
      align: "center",
    },
  ];
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await deletePart(id);
      if (response.status === 200) {
        toast.success("Part deleted successfully");
        fetchParts(); // Refresh parts after deletion
      } else {
        toast.error("Failed to delete part");
      }
    } catch (error) {
      toast.error("Failed to delete part");
    }
    setIsLoading(false);
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this part?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",

      onOk() {
        handleDelete(id);
      },
    });
  };

  const editPart = (part) => {
    setCurrentPart(part);
    setNewPrice(part.price);
    setNewQuantity(part.quantity);
    setIsEditModalVisible(true);
  };

  const handleSaveChanges = async () => {
    if (
      newPrice === currentPart.price &&
      newQuantity === currentPart.quantity
    ) {
      setIsEditModalVisible(false);
      return;
    }

    setIsLoading(true);
    try {
      const updatedPart = {
        ...currentPart,
        price: newPrice,
        quantity: newQuantity,
      };
      const response = await updatePart(updatedPart._id, newQuantity, newPrice);
      if (response.status === 200) {
        toast.success("Part updated successfully");
      } else {
        toast.error("Failed to update part");
      }
      setIsEditModalVisible(false);
      fetchParts();
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to update part");
      setIsLoading(false);
    }
  };

  return (
    <div className="md:mx-20">
      <Loader isLoading={isLoading} />
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-blue-500 text-base md:text-3xl my-5">
            Parts Management
          </h1>
          <Button
            text={
              <>
                <PlusOutlined style={{ marginRight: 5 }} /> Parts
              </>
            }
            style="px-4 md:px-6 rounded-lg h-10 md:h-12 text-sm md:text-lg"
            onClick={showModal}
          />
        </div>
        <div className="overflow-x-auto">
          <Table
            dataSource={parts.map((part) => ({ ...part, key: part._id }))}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 8 }}
          />
        </div>
      </div>

      {/* Modal for Adding Part */}
      <Modal
        title="Add New Part"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddPart}
          initialValues={{ quantity: 1, price: 0 }}
        >
          <p className="text-base text-gray-900 font-semibold btext mb-1">
            Part Name
          </p>
          <Form.Item
            name="partName"
            rules={[{ required: true, message: "Please enter the part name" }]}
          >
            <Input />
          </Form.Item>

          <p className="text-base text-gray-900 font-semibold btext mb-1">
            Part Company
          </p>
          <Form.Item
            name="partCompany"
            rules={[
              { required: true, message: "Please enter the part company" },
            ]}
          >
            <Input />
          </Form.Item>

          <p className="text-base text-gray-900 font-semibold btext mb-1">
            Quantity
          </p>
          <Form.Item
            name="quantity"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                message: "Please enter a valid quantity",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>

          <p className="text-base text-gray-900 font-semibold btext mb-1">
            Price
          </p>
          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                message: "Please enter a valid price",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>

          <p className="text-base text-gray-900 font-semibold btext mb-1">
            Description
          </p>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please enter the part description" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <p className="text-base text-gray-900 font-semibold btext mb-1">
            Image
          </p>
          <Form.Item
            name="image"
            valuePropName="fileList"
            rules={[{ required: true, message: "Please upload an image" }]}
            getValueFromEvent={(e) => e && e.fileList}
          >
            <ImgCrop>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleImageChange}
                beforeUpload={() => false} // Prevent automatic upload
                showPreviewIcon={false} // Hide the preview icon
                showRemoveIcon={true} // Show only the delete icon
              >
                {fileList.length < 1 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </ImgCrop>
          </Form.Item>

          <Form.Item className="text-right">
            <Button
              text="Add"
              htmlType="submit"
              style="px-4 py-2 rounded-lg text-lg"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Update Stock"
        visible={isEditModalVisible}
        onOk={handleSaveChanges}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <div className="btext my-3 space-y-2">
          <div className="flex justify-between">
            <p className="text-base font-bold">Part Name </p>
            <p className="text-base font-semibold">{currentPart?.partName}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-base font-bold">Part Company </p>
            <p className="text-base font-semibold">
              {currentPart?.partCompany}
            </p>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="text-base font-semibold">Set Price </label>
          <InputNumber
            min={0}
            value={newPrice}
            onChange={(value) => setNewPrice(value)}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label className="text-base font-semibold">Set Quantity </label>
          <InputNumber
            min={0}
            value={newQuantity}
            onChange={(value) => setNewQuantity(value)}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default PartsManagement;
