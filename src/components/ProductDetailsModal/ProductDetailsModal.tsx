import { Button, Modal, Rate } from "antd";

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
  return (
    <Modal
      className={styles.modal}
      width="70%"
      open={visible}
      title={<div className={styles.modalTitle}>{product.title}</div>}
      footer={[
        <Button key="add" onClick={() => onAdd(product)}>
          Add to Cart
        </Button>,
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
            ({product.reviews.length}{" "}
            {product.reviews.length > 1 ? "reviews" : "review"})
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
