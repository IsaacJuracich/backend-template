import fetch from "node-fetch";
import { expect } from "chai";

describe("File Router", () => {
  it("Example Post Request", async () => {
    const res = await fetch("http://localhost:3065/api/example/post", {
      method: "POST",
    });

    const body = await res.json();

    expect(res.status).to.eq(200);
    expect(body.message).to.eq("Success");
  });

  it("Example Get Request", async () => {
    const res = await fetch("http://localhost:3065/api/example/get", {
      method: "GET",
    });

    const body = await res.json();

    expect(res.status).to.eq(200);
    expect(body.message).to.eq("Success");
  });

  it("Example Post Dynamic Slug", async () => {
    const res = await fetch(
      "http://localhost:3065/api/example/dynamic/slug/testing/slug",
      {
        method: "POST",
      }
    );

    const body = await res.json();

    expect(res.status).to.eq(200);
    expect(body.message).to.eq("Success");
  });

  it("Example Post Dynamic Param", async () => {
    const res = await fetch(
      "http://localhost:3065/api/example/dynamic/param/testing",
      {
        method: "POST",
      }
    );

    const body = await res.json();

    expect(res.status).to.eq(200);
    expect(body.message).to.eq("Success");
  });
});
