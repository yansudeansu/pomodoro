import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Text } from "./Text";

describe("Text", () => {
  it("renders children", () => {
    render(<Text>Hello world</Text>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("applies the default 'body' variant class", () => {
    render(<Text>Hello</Text>);
    const span = screen.getByText("Hello");
    expect(span.className).toContain("text");
    expect(span.className).toContain("body");
  });

  it("applies the specified variant class", () => {
    render(<Text variant="heading">Heading</Text>);
    const span = screen.getByText("Heading");
    expect(span.className).toContain("heading");
  });

  it("merges custom className", () => {
    render(<Text className="custom-class">Custom</Text>);
    const span = screen.getByText("Custom");
    expect(span.className).toContain("custom-class");
  });
});
