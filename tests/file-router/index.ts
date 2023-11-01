import fetch from "node-fetch";
import { expect } from "chai";

const USER_TOKEN =
  "Fe26.2**c04da3f18161a8dfee900a65fab58880ded86dcdcb65805c4bbd7a771a16b3dc*bZZvGxPBsbhV5elj0BL-vg*rT1cFsLv6ybXxri7myp9WJO4VEpxFyqgNJpvwAe71nejGKvdFQdc_gIh9utNKPfg**f552e4e8cc596e6b7771d0bc170d43a1c3df8734db146835d389aa24506bcfcb*uVMc4Fa5ab_IqA46IpWrMWZ2_O4Z1VDSKAe5AJbr1tU";
const USER_ID = "654270f39da445c2d468725e";

describe("File Router", () => {
  it("Example Post Request", async () => {
    const res = await fetch("http://localhost:3065/api/example/post", {
      method: "POST",
      headers: {
        "X-TOKEN": USER_TOKEN,
      },
    });

    const body = await res.json();

    expect(res.status).to.eq(200);
    expect(body.message).to.eq("Success");
  });

  it("Example Get Request", async () => {
    const res = await fetch("http://localhost:3065/api/example/get", {
      method: "GET",
      headers: {
        "X-TOKEN": USER_TOKEN,
      },
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
        headers: {
          "X-TOKEN": USER_TOKEN,
        },
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
        headers: {
          "X-TOKEN": USER_TOKEN,
        },
      }
    );

    const body = await res.json();

    expect(res.status).to.eq(200);
    expect(body.message).to.eq("Success");
  });

  it("Example Post Dynamic Param", async () => {
    const res = await fetch("http://localhost:3065/api/example/user", {
      method: "POST",
      headers: {
        "X-TOKEN": USER_TOKEN,
      },
    });

    const body = await res.json();

    expect(res.status).to.eq(200);
    expect(body.message).to.eq("Success");
    expect(body.userID).to.eq(USER_ID);
  });
});
