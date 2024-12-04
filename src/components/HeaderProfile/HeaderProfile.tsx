import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

import { AppRoute } from "../../constants/constants";
import { useAuth } from "../../hooks/useAuth";
import HeaderButton from "../HeaderButton/HeaderButton";
import styles from "./styles.module.scss";

function HeaderProfile() {
  const { isLoggedIn, logout, user } = useAuth();
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
        title={`${user?.firstName} ${user?.lastName}`}
        placement="left"
        color="grey"
        arrow={false}
      >
        <Avatar className={styles.headerAvatar} src={user?.image} />
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
