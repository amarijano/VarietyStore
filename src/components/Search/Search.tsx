import { Input } from "antd";

export interface SearchProps {
  onSearch: () => void;
  onClear: () => void;
  value?: string;
  className?: string;
}

function Search({ className, onSearch, onClear, value }: SearchProps) {
  const { Search } = Input;

  return (
    <div className={className}>
      <Search
        placeholder="Search for products"
        allowClear
        value={value}
        onSearch={onSearch}
        onChange={(event) => console.log(event.target.value)}
        onClear={onClear}
      />
    </div>
  );
}

export default Search;
