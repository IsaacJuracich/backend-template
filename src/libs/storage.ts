import AWS from "aws-sdk";

const spacesEndpoint = new AWS.Endpoint("sfo3.digitaloceanspaces.com");
const S3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: "",
  secretAccessKey: "",
});
const BUCKET = "palace";

export async function upload({
  applicationPubKey,
  randomId,
  encryptedMetadata,
}: {
  applicationPubKey: string;
  randomId: string;
  encryptedMetadata: string;
}) {
  const params = {
    Bucket: BUCKET,
    Key: `metadata/${applicationPubKey}/${randomId}`,
    Body: encryptedMetadata,
    ACL: "public-read",
  };
  const test = await S3.upload(params).promise();

  console.log(`File uploaded successfully. ${test.Location}`);

  return true;
}

export async function get({
  applicationPubKey,
  randonId,
}: {
  applicationPubKey: string;
  randonId: string;
}) {
  const params = {
    Bucket: BUCKET,
    Key: `metadata/${applicationPubKey}/${randonId}`,
  };
  return (await S3.getObject(params).promise()).Body.toString();
}
