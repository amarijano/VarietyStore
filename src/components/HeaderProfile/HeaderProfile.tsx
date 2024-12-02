import { UserOutlined } from "@ant-design/icons";
import { Button, Avatar, MenuProps, Dropdown, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../router/data/routes";
import { useAuth } from "../../hooks/useAuth";
import styles from "./styles.module.scss";
import HeaderButton from "../HeaderButton/HeaderButton";

function HeaderProfile() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

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
        title={`${user.firstName} ${user.lastName}`}
        placement="left"
        color="grey"
        arrow={false}
      >
        <Avatar className={styles.headerAvatar} src={user.image} />
      </Tooltip>
    </Dropdown>
  ) : (
    // <div className={styles.userButtonContainer}>
    //   <Button
    //     className={styles.userButton}
    //     type="link"
    //     icon={<UserOutlined />}
    //     size="large"
    //     onClick={handleLoginClick}
    //   >
    //     <span className={styles.userText}>USER</span>
    //   </Button>
    // </div>
    <HeaderButton
      icon={<UserOutlined />}
      onClick={handleLoginClick}
      text="USER"
    />
  );
}

export default HeaderProfile;
