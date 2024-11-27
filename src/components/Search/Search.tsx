import { Input } from "antd";

export interface SearchProps {
  className?: string;
}

function Search({ className }: SearchProps) {
  const { Search } = Input;

  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div className={className}>
      <Search
        placeholder="Search for products"
        allowClear
        onSearch={onSearch}
      />
    </div>
  );
}

export default Search;
