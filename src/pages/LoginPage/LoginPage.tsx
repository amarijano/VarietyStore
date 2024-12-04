import {
  ArrowLeftOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppRoute } from "../../constants/constants";
import { useAuth } from "../../hooks/useAuth";
import { LoginCredentials } from "../../types/auth.types";
import styles from "./styles.module.scss";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginCredentials) => {
    try {
      setLoading(true);
      await login(values);
      message.success("Login successful");
      navigate(AppRoute.BASE);
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <div>
        <Button type="text" onClick={() => navigate("/products")}>
          <ArrowLeftOutlined /> Continue shopping as guest
        </Button>
      </div>

      <div className={styles.loginFormWrapper}>
        <div className={styles.loginFormCard}>
          <Typography.Title level={2} className={styles.loginFormTitle}>
            Login
          </Typography.Title>

          <Form name="login" onFinish={onFinish} layout="vertical" size="large">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username or Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Checkbox defaultChecked>
                {" "}
                Keep items in your cart after logging in
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
