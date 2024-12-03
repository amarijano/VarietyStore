import { Tag } from "antd";

function FilterChip({
  value,
  onClose,
  label,
}: {
  value: string;
  onClose: () => void;
  label?: string;
}) {
  return (
    <Tag closable onClose={onClose}>
      {label ? `${label}: ${value}` : value}
    </Tag>
  );
}

export default FilterChip;
