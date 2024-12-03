import { createContext, ReactNode, useContext, useState } from "react";

import ProductDetailsModal from "../components/ProductDetailsModal/ProductDetailsModal";
import { Product } from "../types/product.types";

interface ProductDetailsModalConfig {
  type: "productDetails";
  data: Product;
}

type ModalConfig = ProductDetailsModalConfig;

interface ModalContextType {
  showModal: <T extends ModalConfig["type"]>(
    type: T,
    data?: Extract<ModalConfig, { type: T }>["data"]
  ) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal: ModalContextType["showModal"] = (type, data) => {
    setModalConfig({ type, data } as ModalConfig);
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    setModalConfig(null);
  };

  const renderModal = () => {
    if (!modalConfig) return null;

    switch (modalConfig.type) {
      case "productDetails":
        return (
          <ProductDetailsModal
            product={modalConfig.data}
            visible={isModalVisible}
            onAdd={() => {
              // Implement add to cart logic
              hideModal();
            }}
            onCancel={hideModal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
