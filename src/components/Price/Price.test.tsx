import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { Price } from "..";

describe("Price", () => {
  it("renders", () => {
    render(<Price amount={100} />);
  });
});
