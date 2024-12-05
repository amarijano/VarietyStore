import { Input } from "antd";
import { useTranslation } from "react-i18next";
export interface SearchProps {
  onSearch: () => void;
  onClear: () => void;
  value?: string;
  className?: string;
}

function Search({ className, onSearch, onClear, value }: SearchProps) {
  const { t } = useTranslation();
  const { Search } = Input;

  return (
    <div className={className}>
      <Search
        placeholder={t("search.placeholder")}
        allowClear
        value={value}
        onSearch={onSearch}
        onClear={onClear}
      />
    </div>
  );
}

export default Search;
