import { Carousel } from "antd";
import styles from "./styles.module.scss";
import { ImageMode } from "../../constants/constants";

interface ImageDisplayProps {
  images: string[];
  mode: ImageMode;
}

function ImageDisplay({ images, mode }: ImageDisplayProps) {
  if (!images.length) {
    return <div className={styles.placeholder}>No image available</div>;
  }

  if (mode === ImageMode.SINGLE || images.length === 1) {
    return (
      <img src={images[0]} alt="Product image" className={styles.singleImage} />
    );
  }

  return (
    <Carousel
      className={styles.carouselContainer}
      arrows
      dots={{ className: `${styles.carouselDots}` }}
    >
      {images.map((image, index) => (
        <div key={index} className={styles.carouselSlide}>
          <img src={image} alt={`Product image ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageDisplay;
