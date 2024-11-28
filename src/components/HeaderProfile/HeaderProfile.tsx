import { UserOutlined } from "@ant-design/icons";
import { Button, Avatar, MenuProps, Dropdown, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../router/data/routes";
import { useAuth } from "../../hooks/useAuth";
import styles from "./styles.module.scss";

function HeaderProfile() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(AppRoute.LOGIN);
  };

  const loggedInItems: MenuProps["items"] = [
    {
      key: 1,
      type: "item",
      label: "Are you sure you want to log out?",
    },
    {
      key: 2,
      type: "item",
      label: (
        <Button type="primary" onClick={logout}>
          Log out
        </Button>
      ),
    },
  ];

  return isLoggedIn ? (
    <Dropdown menu={{ items: loggedInItems }} trigger={["click"]}>
      <Tooltip
        title={`${localStorage.getItem("firstName")?.replace(/"/g, "")} ${localStorage.getItem("lastName")?.replace(/"/g, "")}`}
        placement="left"
        color="grey"
        arrow={false}
      >
        <Avatar
          className={styles.headerAvatar}
          src={localStorage.getItem("image")?.replace(/"/g, "")}
        />
      </Tooltip>
    </Dropdown>
  ) : (
    <div className={styles.userButtonContainer}>
      <Button
        className={styles.userButton}
        type="link"
        icon={<UserOutlined />}
        size="large"
        onClick={handleLoginClick}
      >
        <span className={styles.userText}>USER</span>
      </Button>
    </div>
  );
}

export default HeaderProfile;
