import { Carousel, Skeleton } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ImageMode } from "../../constants/constants";
import styles from "./styles.module.scss";

interface ImageDisplayProps {
  images: string[];
  mode: ImageMode;
}

function ImageDisplay({ images, mode }: ImageDisplayProps) {
  const { t } = useTranslation();
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );

  if (!images.length) {
    return (
      <div className={styles.placeholder}>{t("imageDisplay.placeholder")}</div>
    );
  }

  const handleImageLoad = (imageSrc: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [imageSrc]: true,
    }));
  };

  if (mode === ImageMode.SINGLE || images.length === 1) {
    return (
      <>
        {!loadedImages[images[0]] && (
          <Skeleton.Image active className={styles.skeletonImage} />
        )}
        <img
          src={images[0]}
          alt="Product image"
          className={styles.singleImage}
          style={{ display: loadedImages[images[0]] ? "block" : "none" }}
          onLoad={() => handleImageLoad(images[0])}
        />
      </>
    );
  }

  return (
    <Carousel
      className={styles.carouselContainer}
      arrows
      dots={{ className: `${styles.carouselDots}` }}
    >
      {images.map((image, index) => (
        <div key={index} role="img" className={styles.carouselSlide}>
          {!loadedImages[image] && (
            <Skeleton.Image active className={styles.skeletonImage} />
          )}
          <img
            src={image}
            alt={`Product image ${index + 1}`}
            style={{ display: loadedImages[image] ? "block" : "none" }}
            onLoad={() => handleImageLoad(image)}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageDisplay;
