import { handler } from "./take-handler";

describe("Take Handler", () => {
  it("should return expected value", async () => {
    const res = await handler();
    expect(res.statusCode).toBe(200);
  });
});
