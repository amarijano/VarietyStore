import { Input } from "antd";

export interface SearchProps {
  onSearch: (value: string) => void;
  onClear: () => void;
  defaultValue?: string;
  className?: string;
}

function Search({ className, defaultValue, onSearch, onClear }: SearchProps) {
  const { Search } = Input;

  return (
    <div className={className}>
      <Search
        placeholder="Search for products"
        allowClear
        defaultValue={defaultValue}
        onSearch={onSearch}
        onChange={(event) => console.log(event.target.value)}
        onClear={onClear}
      />
    </div>
  );
}

export default Search;
