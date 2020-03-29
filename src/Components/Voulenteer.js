import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Divider,
  Cascader,
  Tooltip
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { voulenteer } from "../Utils/ApiUtil";
import { useToasts } from "react-toast-notifications";

import countries from "../assets/countries";

const { Title, Paragraph } = Typography;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

export default function Voulenteer({ reasons }) {
  const classes = useStyles();
  const { addToast } = useToasts();

  const onFinish = values => {
    voulenteer(values)
      .then(res =>
        addToast(
          "Your volunteer form has successfully been recieved. Please click the verification link we sent to your email to have your form be publicly available on our website.",
          { appearance: "success" }
        )
      )
      .catch(e => e.forEach(error => addToast(error, { appearance: "error" })));
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  function onChange(checkedValues) {
    console.log("checked = ", checkedValues);
  }

  function filter(inputValue, path) {
    return path.some(
      option =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  }

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} md={8}>
        <Paper className={classes.paper}>
          <Typography>
            <Title>Become a volunteer</Title>
            <Paragraph>
              After filling out this form your listing will be displayed on our
              main page. Then, people that need to use the skills you offer can
              fill out a help request form which will then be delivered to your
              email.
            </Paragraph>
          </Typography>
          <Divider />
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Email&nbsp;
                  <Tooltip title="This email will be used to let you recieve help request forms. We will not display this email publicly or use it for anything other than to commmunicate with you.">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Not a valid email" }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Profession"
              name="profession"
              rules={[
                { required: true, message: "Please input your profession!" }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="residence"
              label="Residence"
              rules={[
                {
                  type: "array",
                  required: true,
                  message: "Please select your residence!"
                }
              ]}
            >
              <Cascader
                options={countries}
                placeholder="Please select"
                showSearch={{ filter }}
              />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  General location&nbsp;
                  <Tooltip title="A more specific location than just your city will help people closer to you find you.">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="general_location"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Offers"
              name="offers"
              rules={[
                {
                  type: "array",
                  required: true,
                  message: "Please select the skills you are offering!"
                }
              ]}
            >
              <Checkbox.Group
                options={reasons.map(val => {
                  return { label: val.name, value: val.id };
                })}
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" }
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Paper>
      </Grid>
    </Grid>
  );
}
