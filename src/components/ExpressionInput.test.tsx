import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ExpressionInput } from "./ExpressionInput";
import userEvent from "@testing-library/user-event";

describe("ExpressionInput", () => {
  it("calls onChange when input changes", async () => {
    const handleChange = vi.fn();
    render(
      <ExpressionInput
        value=""
        resultText=""
        isValid={true}
        onChange={handleChange}
      />,
    );
    const input = document.getElementById(
      "expression-input",
    ) as HTMLInputElement;
    await userEvent.type(input, "2 * 3");
    expect(handleChange).toHaveBeenCalled();
  });
});
