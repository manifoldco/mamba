import * as crypto from "crypto";
import { URL } from "url";

export enum KeyType {
  Public = "EC PUBLIC KEY",
  Private = "EC PRIVATE KEY"
}

export function formatDerKey(key: Buffer | string, keyType: KeyType) {
  const keyString = typeof key === "string" ? key : key.toString("base64");
  const begin = `-----BEGIN ${keyType}-----`;
  const end = `-----END ${keyType}-----`;
  const parts = keyString.match(/.{0,64}/g);
  return `${[begin, ...parts].join("\n")}${end}`;
}

export function sign(urlString: string, privateKey: string) {
  const url = new URL(urlString);
  const { hash } = url;
  url.hash = "";
  url.searchParams.set("ts", Date.now().toString());
  const sign = crypto.createSign("SHA512");
  sign.update(url.toString());

  /* TODO: The sign() function will throw exceptions if the key isn't formatted right.
   * We should handle all the possible exceptions and return better error messages.
   */
  url.searchParams.set("sig", sign.sign(privateKey, "base64"));
  url.hash = hash;

  return url.toString();
}
