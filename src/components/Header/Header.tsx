import { Header as HeaderComponent } from "antd/es/layout/layout";
import { HeaderButton, HeaderProfile } from "..";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, ShopTwoTone } from "@ant-design/icons";
import { AppRoute } from "../../router/data/routes";
import { Badge, Button, Space } from "antd";
import { Search } from "..";
import styles from "./styles.module.scss";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";

function Header() {
  const navigate = useNavigate();
  const { search } = useProducts();
  const cartCount = useCart();

  const handleLogoClick = () => {
    navigate(AppRoute.BASE);
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
      <Search
        className={styles.headerSearch}
        value={search.query || undefined}
        onSearch={(value: string) => search.executeSearch(value)}
        onClear={search.clearSearch}
      />
      <Space className={styles.headerMenu}>
        <HeaderProfile />
        <Badge count={cartCount} size="small">
          <HeaderButton
            icon={<ShoppingCartOutlined />}
            onClick={handleCartClick}
            text="CART"
          />
        </Badge>
      </Space>
    </HeaderComponent>
  );
}

export default Header;
