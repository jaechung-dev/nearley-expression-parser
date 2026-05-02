import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ExpressionInput } from "./ExpressionInput";
import userEvent from "@testing-library/user-event";

describe("ExpressionInput", () => {
  it("calls onChange when input changes", async () => {
    const handleChange = vi.fn();

    render(<ExpressionInput value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText("1 + 2 = 3");

    await userEvent.type(input, "2 * 3");

    expect(handleChange).toHaveBeenCalled();
  });
});
