import { JWT_SECRET } from "@/constant";
import { seal, unseal, defaults } from "@hapi/iron";

export async function createUserToken({
  data,
}: {
  data: { id: string };
}): Promise<string> {
  const token = await seal(data, JWT_SECRET, defaults);

  return token;
}

export async function getUserToken(token: string): Promise<{ id: string }> {
  const data = await unseal(token, JWT_SECRET, defaults);

  return data;
}
