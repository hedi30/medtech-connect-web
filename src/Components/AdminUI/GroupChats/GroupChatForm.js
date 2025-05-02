import React, { useEffect } from "react";
import { Form, Input, DatePicker, Button } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";

const GroupChatForm = ({ onSubmit, onCancel, initialData }) => {
  const [form] = Form.useForm();
  const { groupId } = useParams(); // Get the group ID from the URL to check if in edit mode
  const isEditMode = !!groupId; // Edit mode if groupId exists

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        groupName: initialData.groupName,
        description: initialData.description,
        creationDate: initialData.creationDate
          ? moment(initialData.creationDate)
          : null,
      });
    }
  }, [initialData, form]);

  const handleFinish = (values) => {
    console.log("Group Chat Data:", values);
    onSubmit(values);
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Form.Item
          name="groupName"
          label="Group Chat Name"
          rules={[{ required: true, message: "Please enter the group name" }]}
        >
          <Input placeholder="Enter group name" />
        </Form.Item>

        <Form.Item
          name="creationDate"
          label="Creation Date"
          rules={[{ required: true, message: "Please select a creation date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="description" label="Description (Optional)">
          <Input.TextArea placeholder="Enter group description" rows={3} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#3881a5",
              borderColor: "#3881a5",
              marginRight: 10,
              color: "#fff",
              hover: { backgroundColor: "#56A9D1" }, // Blue color on hover
            }}
          >
            {isEditMode ? "Update" : "Validate"}
          </Button>
          <Button onClick={onCancel} type="default">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GroupChatForm;
