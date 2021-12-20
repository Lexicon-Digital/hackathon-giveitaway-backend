import axios from "axios";

describe("Take", () => {
  const baseUrl = "http://localhost:3000";
  it("should return status code 200 and message", async () => {
    const path = "/api/take";
    const res = await axios.get(`${baseUrl}${path}`);
    expect(res.status).toBe(200);
  });
});
