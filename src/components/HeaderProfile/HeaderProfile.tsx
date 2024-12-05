import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { AppRoute } from "../../constants/constants";
import { useAuth } from "../../hooks/useAuth";
import HeaderButton from "../HeaderButton/HeaderButton";
import styles from "./styles.module.scss";

function HeaderProfile() {
  const { t } = useTranslation();
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(AppRoute.LOGIN);
  };

  const loggedInItems: MenuProps["items"] = [
    {
      key: 1,
      type: "item",
      label: t("headerProfile.logoutConfirmation"),
    },
    {
      key: 2,
      type: "item",
      label: (
        <Button type="primary" onClick={logout}>
          {t("headerProfile.logoutButton")}
        </Button>
      ),
    },
  ];

  return isLoggedIn ? (
    <Dropdown menu={{ items: loggedInItems }} trigger={["click"]}>
      <Tooltip
        title={`${user?.firstName} ${user?.lastName}`}
        placement="left"
        color="grey"
        arrow={false}
      >
        <Avatar className={styles.headerAvatar} src={user?.image} />
      </Tooltip>
    </Dropdown>
  ) : (
    <HeaderButton
      icon={<UserOutlined />}
      onClick={handleLoginClick}
      text={t("headerProfile.userButton")}
    />
  );
}

export default HeaderProfile;
