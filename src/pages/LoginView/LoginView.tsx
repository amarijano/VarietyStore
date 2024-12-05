import {
  ArrowLeftOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { AppRoute } from "../../constants/constants";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { LoginCredentials } from "../../types/auth.types";
import styles from "./styles.module.scss";

interface LoginFormValues extends LoginCredentials {
  keepCart: boolean;
}

function LoginView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { mergeGuestCart } = useCart();

  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const user = await login(values);
      message.success(t("loginView.loginSuccess"));
      if (values.keepCart) {
        mergeGuestCart(user);
      }
      navigate(AppRoute.BASE);
    } catch (error) {
      console.error("Login failed:", error);
      message.error(t("loginView.loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <div>
        <Button type="text" onClick={() => navigate(AppRoute.BASE)}>
          <ArrowLeftOutlined /> {t("loginView.continueShopping")}
        </Button>
      </div>

      <div className={styles.loginFormWrapper}>
        <div className={styles.loginFormCard}>
          <Typography.Title level={2} className={styles.loginFormTitle}>
            {t("loginView.loginTitle")}
          </Typography.Title>

          <Form name="login" onFinish={onFinish} layout="vertical" size="large">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: t("loginView.usernameRequired") },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={t("loginView.usernamePlaceholder")}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: t("loginView.passwordRequired") },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={t("loginView.passwordPlaceholder")}
              />
            </Form.Item>
            <Form.Item
              name="keepCart"
              valuePropName="checked"
              initialValue={true}
            >
              <Checkbox>{t("loginView.checkboxText")}</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                {t("loginView.loginButton")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
