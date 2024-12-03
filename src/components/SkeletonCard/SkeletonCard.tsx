import { Card, Skeleton } from "antd";

import styles from "./styles.module.scss";

function SkeletonCard() {
  return (
    <Card className={styles.skeletonCard}>
      <Skeleton.Image />
      <Skeleton />
    </Card>
  );
}

export default SkeletonCard;
