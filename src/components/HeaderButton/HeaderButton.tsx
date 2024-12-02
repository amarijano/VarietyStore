import { Button, ButtonProps } from "antd";
import styles from "./styles.module.scss";

interface HeaderButtonProps extends ButtonProps {
  text?: string;
}

function HeaderButton({
  text,
  children,
  className,
  type,
  size,
  ...buttonProps
}: HeaderButtonProps) {
  return (
    <div className={`${styles.buttonContainer} ${className || ""}`}>
      <Button
        className={styles.button}
        type={type || "link"}
        size={size || "large"}
        {...buttonProps}
      >
        {children}
        {text && <span className={styles.buttonText}>{text}</span>}
      </Button>
    </div>
  );
}

export default HeaderButton;
