import { Header as HeaderComponent } from "antd/es/layout/layout";
import { HeaderProfile } from "..";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, ShopTwoTone } from "@ant-design/icons";
import { AppRoute } from "../../router/data/routes";
import { Button, Space } from "antd";
import { Search } from "..";
import styles from "./styles.module.scss";

function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(AppRoute.BASE, { replace: true });
  };

  const handleCartClick = () => {
    navigate(AppRoute.CART);
  };

  return (
    <HeaderComponent className={styles.header}>
      <div className={styles.headerLogo}>
        <Button
          type="text"
          icon={<ShopTwoTone twoToneColor="white" />}
          className={styles.logoButton}
          onClick={handleLogoClick}
        >
          Variety shop
        </Button>
      </div>
      <Search className={styles.headerSearch} />
      <Space className={styles.headerMenu}>
        <HeaderProfile />
        <Button
          className={styles.cartButton}
          type="text"
          size="large"
          onClick={handleCartClick}
        >
          <ShoppingCartOutlined />
        </Button>
      </Space>
    </HeaderComponent>
  );
}

export default Header;
