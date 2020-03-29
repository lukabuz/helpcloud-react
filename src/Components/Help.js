import React, { useState } from "react";
import { Tooltip, Modal, Form, Input, Radio } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { requestHelp } from "../Utils/ApiUtil";
import { useToasts } from "react-toast-notifications";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px"
};

export default function Help({ listing, isVisible, setIsVisible }) {
  const { addToast } = useToasts();

  const [form] = Form.useForm();
  const [status, setStatus] = useState("");
  const [customStatus, setCustomStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = values => {
    if (values.status === 4) values.status = customStatus;
    values.voulenteer_id = listing.id;
    setLoading(true);
    requestHelp(values)
      .then(res => {
        setIsVisible(false);
        addToast(
          "Your request has been successfully submitted. The volunteer will be notified.",
          { appearance: "success" }
        );
      })
      .catch(e => e.forEach(error => addToast(error, { appearance: "error" })));
  };

  return (
    <Modal
      title={`Request help from ${listing.name}`}
      visible={isVisible}
      okText="Request Help"
      onCancel={() => setIsVisible(false)}
      confirmLoading={loading}
      onOk={() =>
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            submit(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          })
      }
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="name"
          label="Your name"
          rules={[
            { required: true, message: "Please input the your name!" },
            {
              min: 3,
              message: "Your message must be minimum of 3 characters."
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Your status"
          rules={[{ required: true, message: "Please input the your status!" }]}
        >
          <Radio.Group onChange={e => setStatus(e.target.value)}>
            <Radio style={radioStyle} value={"Senior Citizen"}>
              Senior Citizen
            </Radio>
            <Radio style={radioStyle} value={"Single Parent"}>
              Single Parent
            </Radio>
            <Radio style={radioStyle} value={"Person with a disability"}>
              Person with a disability
            </Radio>
            <Radio
              style={radioStyle}
              value={"Person with a compromised immune system"}
            >
              Person with a compromised immune system
            </Radio>
            <Radio style={radioStyle} value={4}>
              More...
              {status === 4 ? (
                <Input
                  value={customStatus}
                  onChange={e => setCustomStatus(e.target.value)}
                  style={{ width: 100, marginLeft: 10 }}
                />
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="message"
          label={
            <span>
              Your message to the volunteer&nbsp;
              <Tooltip title="You can use this message to personalize your request for help, and to give the volunteer a better idea about your situation.">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            { required: true, message: "Please input the your message!" },
            {
              min: 20,
              message: "Your message must be minimum of 20 characters."
            }
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label={
            <span>
              Your phone number&nbsp;
              <Tooltip title="The volunteer will be given this phone number so that they can get in touch wiht you.">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            { required: true, message: "Please input the your phone number!" }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
