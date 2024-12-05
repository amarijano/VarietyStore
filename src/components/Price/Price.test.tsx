import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Currency } from "../../constants/constants";
import { Price } from "..";

describe("Price", () => {
  it("renders with default currency and amount", () => {
    render(<Price amount={100} />);

    const priceElement = screen.getByText("100.00€");
    expect(priceElement).toBeInTheDocument();
    expect(priceElement.className.includes("price")).toBe(true);
  });

  it("renders with specified currency", () => {
    render(<Price amount={100} currency={Currency.USD} />);

    const priceElement = screen.getByText("100.00$");
    expect(priceElement).toBeInTheDocument();
  });

  it("renders with light styling when isLight is true", () => {
    render(<Price amount={100} isLight={true} />);

    const priceElement = screen.getByText("100.00€");
    expect(priceElement).toBeInTheDocument();
    expect(priceElement.className.includes("priceLight")).toBe(true);
  });
});
