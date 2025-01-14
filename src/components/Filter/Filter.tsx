import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, InputNumber, MenuProps, Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useProductsData } from "../../hooks/useProductsData";
import { CategoryType } from "../../types/product.types";
import styles from "./styles.module.scss";

interface FilterProps {
  categories: CategoryType[];
  selectedCategory: string | null;
  priceRange: {
    min: number | null;
    max: number | null;
  };
  onCategoryChange: (category: string | null) => void;
  onPriceChange: (min: number | null, max: number | null) => void;
  loading?: boolean;
}

const Filter = ({
  categories,
  priceRange,
  onCategoryChange,
  onPriceChange,
  loading,
}: FilterProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { updateFilters, currentState } = useProductsData();
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);

  const handlePriceChange = (min: number | null, max: number | null) => {
    if (min !== null && max !== null && min > max) {
      min = null;
    }
    if (max !== null && min !== null && max < min) {
      max = null;
    }
    updateFilters({
      priceRange: { min, max },
    });
    setTempPriceRange({ min, max });
  };

  const handleApplyPrice = () => {
    onPriceChange(tempPriceRange.min, tempPriceRange.max);
    setOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "category",
      label: t("filter.label.category"),
      children: [
        {
          key: "all",
          label: t("filter.label.all"),
          onClick: () => {
            onCategoryChange(null);
            setOpen(false);
          },
        },
        ...categories.map((category) => ({
          key: category.slug,
          label: category.name,
          onClick: () => {
            onCategoryChange(category.slug);
            setOpen(false);
          },
        })),
      ],
    },
    {
      key: "price",
      label: t("filter.label.price"),
      type: "submenu",
      children: [
        {
          key: "price-inputs",
          label: (
            <div
              className={styles.priceInputsContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <Space className={styles.priceInputs}>
                <InputNumber
                  placeholder={t("filter.minPlaceholder")}
                  value={currentState.filters.priceRange.min}
                  onChange={(value) =>
                    handlePriceChange(
                      value,
                      currentState.filters.priceRange.max
                    )
                  }
                  min={0}
                  max={currentState.filters.priceRange.max || undefined}
                />
                <span>-</span>
                <InputNumber
                  placeholder={t("filter.maxPlaceholder")}
                  value={currentState.filters.priceRange.max}
                  onChange={(value) =>
                    handlePriceChange(
                      currentState.filters.priceRange.min,
                      value
                    )
                  }
                  min={currentState.filters.priceRange.min || 0}
                />
              </Space>
              <Button
                type="primary"
                size="small"
                onClick={handleApplyPrice}
                className={styles.applyButton}
              >
                {t("filter.applyButton")}
              </Button>
            </div>
          ),
          className: styles.priceMenuItem,
        },
      ],
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        triggerSubMenuAction: "click",
        selectable: true,
        defaultSelectedKeys: [
          ...(currentState.filters.category
            ? [currentState.filters.category]
            : []),
          ...(currentState.filters.priceRange.min ||
          currentState.filters.priceRange.max
            ? ["price"]
            : []),
        ],
        mode: "vertical",
      }}
      trigger={["click"]}
      open={open}
      onOpenChange={setOpen}
      destroyPopupOnHide
    >
      <Button type="text" icon={<FilterOutlined />} loading={loading}>
        {t("filter.filters")} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default Filter;
