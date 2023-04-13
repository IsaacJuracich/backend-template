import AWS from "aws-sdk";

const spacesEndpoint = new AWS.Endpoint("sfo3.digitaloceanspaces.com");
const S3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: "",
  secretAccessKey: "",
});
const BUCKET = "";

export async function upload({ path, body }: { path: string; body: string }) {
  const params = {
    Bucket: BUCKET,
    Key: path,
    Body: body,
    ACL: "public-read",
  };
  return (await S3.upload(params).promise()).Location;
}

export async function get({ path }: { path: string }) {
  const params = {
    Bucket: BUCKET,
    Key: path,
  };
  return (await S3.getObject(params).promise()).Body.toString();
}
