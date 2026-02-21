import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MumbleLoading from "./MumbleLoading";

describe("MumbleLoading", () => {
  it("renders loading text", () => {
    render(<MumbleLoading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
