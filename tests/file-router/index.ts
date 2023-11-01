import fetch from "node-fetch";
import { expect } from "chai";

const USER_TOKEN =
  "Fe26.2**cfb2296a8f6bddf7de08db77fb543847529e33b9346f6b7bdce9cb21e5701c6e*T9InqAkWP_ZLmbkS8VlOVA*eiJDJrBKhaa_-T-mWBpHcg**f378d1ef06f42e98d3624a4ea344526c8da207c76f10a657c0600f8e2d6c3e38*OJug-UaW4fFWz373Bffgia5EjbzgJgJ7vkYflNRl_jA";
const USER_ID = "1";

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
