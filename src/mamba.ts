import * as crypto from "crypto";
import { URL } from "url";

export function sign(urlString: string, privateKey: string) {
  // TODO: Can we validate that privateKey is formatted correctly?
  const url = new URL(urlString);
  const { hash } = url;
  url.hash = "";
  url.searchParams.set("ts", Date.now().toString());
  const sign = crypto.createSign("SHA512");
  sign.update(url.toString());
  url.searchParams.set("sig", sign.sign(privateKey, "base64"));
  url.hash = hash;

  return url.toString();
}
