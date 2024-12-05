import { Button, Modal, Rate, Tooltip } from "antd";
import { useTranslation } from "react-i18next";

import { ImageMode } from "../../constants/constants";
import { Product } from "../../types/product.types";
import { Price } from "..";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
import styles from "./styles.module.scss";

interface ProductDetailsModalProps {
  product: Product;
  visible: boolean;
  onAdd: (product: Product) => void;
  onCancel: () => void;
}

function ProductDetailsModal({
  product,
  visible,
  onAdd,
  onCancel,
}: ProductDetailsModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      className={styles.modal}
      width="70%"
      open={visible}
      title={<div className={styles.modalTitle}>{product.title}</div>}
      footer={[
        <Tooltip
          key="add"
          title={!product.stock ? t("productDetailsModal.outOfStock") : ""}
          arrow={false}
        >
          <Button disabled={!product.stock} onClick={() => onAdd(product)}>
            {t("productDetailsModal.addToCart")}
          </Button>
        </Tooltip>,
      ]}
      onOk={() => onAdd(product)}
      onCancel={onCancel}
      classNames={{
        body: styles.modalBody,
        content: styles.modalContent,
      }}
    >
      <div className={styles.imageContainer}>
        <ImageDisplay images={product.images} mode={ImageMode.MULTIPLE} />
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsContainerRating}>
          <Rate value={product.rating} disabled allowHalf />
          <div>
            {t("productDetailsModal.rateText", {
              count: product.reviews.length,
            })}
          </div>
        </div>

        {product.brand && <h4>{product.brand}</h4>}
        <div className={styles.detailsContainerDescription}>
          {product.description}
        </div>

        <Price amount={product.price} />
        <div className={styles.detailsContainerWarranty}>
          {product.warrantyInformation}
        </div>
      </div>
    </Modal>
  );
}

export default ProductDetailsModal;
