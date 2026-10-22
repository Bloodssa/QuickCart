import { describe, expect, it } from "vitest";
import { formatPrice } from "./format";

describe("formatPrice", () => {
    it("format peso price with separators wwith 2 decimals", () => {
        expect(formatPrice(249900)).toMatch(/₱\s?249,900\.00/);
    });
})