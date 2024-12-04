import { Currency } from "../../constants/constants";
import styles from "./styles.module.scss";

interface PriceProps {
  amount: number;
  currency?: Currency;
  isLight?: boolean;
}

function Price({
  amount,
  currency = Currency.EUR,
  isLight = false,
}: PriceProps) {
  return (
    <div className={isLight ? styles.priceLight : styles.price}>
      {amount.toFixed(2)}
      {currency}
    </div>
  );
}

export default Price;
