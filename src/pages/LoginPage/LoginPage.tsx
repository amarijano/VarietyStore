import { Button, Form, Input, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../router/data/routes";
import { useState } from "react";
import { LoginCredentials } from "../../types/auth.types";

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
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <Typography.Title level={2} className={styles.title}>
          Login
        </Typography.Title>

        <Form name="login" onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username or Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
