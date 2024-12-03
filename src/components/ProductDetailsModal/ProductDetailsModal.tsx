import { Button, Modal } from "antd";

import { ImageMode } from "../../constants/constants";
import { Product } from "../../types/product.types";
import { Price } from "..";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
import styles from "./styles.module.scss";

interface ProductDetailsModalProps {
  product: Product;
  visible: boolean;
  onAdd: () => void;
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
      title={product.title}
      open={visible}
      footer={[
        <Button key="add" onClick={onAdd}>
          Add to Cart
        </Button>,
      ]}
      onOk={onAdd}
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
        <div className={styles.detailsContainerDescription}>
          {product.description}
        </div>
        <Price amount={product.price} />
      </div>
    </Modal>
  );
}

export default ProductDetailsModal;
