import { Currency } from "../../constants/constants";
import styles from "./styles.module.scss";

interface PriceProps {
  amount: number;
  currency?: Currency;
}

function Price({ amount, currency = Currency.EUR }: PriceProps) {
  return (
    <div className={styles.price}>
      {amount} {currency}
    </div>
  );
}

export default Price;
