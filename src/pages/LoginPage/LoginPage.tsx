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
import { useCart } from "../../hooks/useCart";
import { LoginCredentials } from "../../types/auth.types";
import styles from "./styles.module.scss";

interface LoginFormValues extends LoginCredentials {
  keepCart: boolean;
}

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { mergeGuestCart } = useCart();

  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const user = await login(values);
      message.success("Login successful");
      if (values.keepCart) {
        mergeGuestCart(user);
      }
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
            <Form.Item
              name="keepCart"
              valuePropName="checked"
              initialValue={true}
            >
              <Checkbox> Keep items in your cart after logging in</Checkbox>
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
