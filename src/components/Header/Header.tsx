import { Header as HeaderComponent } from "antd/es/layout/layout";
import { HeaderButton, HeaderProfile } from "..";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShoppingCartOutlined, ShopTwoTone } from "@ant-design/icons";
import { AppRoute } from "../../router/data/routes";
import { Badge, Button, Input, Space } from "antd";
import styles from "./styles.module.scss";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const cartCount = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  const handleLogoClick = () => {
    navigate(AppRoute.BASE);
  };

  const handleCartClick = () => {
    navigate(AppRoute.CART);
  };

  const handleSearch = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("q", value);
    } else {
      newParams.delete("q");
    }
    newParams.set("page", "1"); // Reset to first page when searching
    setSearchParams(newParams);
    setSearchValue("");
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
      <Input.Search
        className={styles.headerSearch}
        placeholder="Search products..."
        allowClear
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
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
