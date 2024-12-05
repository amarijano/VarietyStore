import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import FilterChip from "./FilterChip";

describe("FilterChip Component", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  it("renders with label and value", () => {
    render(
      <FilterChip value="Test Value" onClose={mockOnClose} label="Label" />
    );

    expect(screen.getByText("Label: Test Value")).toBeInTheDocument();

    const closeImg = screen.getByRole("img");
    fireEvent.click(closeImg);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
