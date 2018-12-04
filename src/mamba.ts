import * as crypto from "crypto";
import { URL } from "url";

export enum KeyType {
  Public = "EC PUBLIC KEY",
  Private = "EC PRIVATE KEY"
}

export function formatPrivateDERKey(key: Buffer | string) {
  const keyString = typeof key === "string" ? key : key.toString("base64");
  const begin = `-----BEGIN EC PRIVATE KEY-----`;
  const end = `-----END EC PRIVATE KEY-----`;
  const parts = keyString.match(/.{0,64}/g);
  return `${[begin, ...parts].join("\n")}${end}`;
}

export function sign(urlString: string, privateKey: string) {
  const url = new URL(urlString);
  const { hash } = url;
  url.hash = "";
  url.searchParams.set(
    "ts",
    Math.round(new Date().getTime() / 1000).toString()
  );
  const sign = crypto.createSign("SHA512");
  sign.update(url.toString());

  /* TODO: The sign() function will throw exceptions if the key isn't formatted right.
   * We should handle all the possible exceptions and return better error messages.
   */

  const sig = sign
    .sign(privateKey)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  url.searchParams.set("sig", sig);

  url.hash = hash;

  return url.toString();
}

export function verify(urlString: string, publicKey: string) {
  const timestampedURL = new URL(urlString);
  const sig = timestampedURL.searchParams.get("sig");
  timestampedURL.searchParams.delete("sig");
  timestampedURL.hash = "";

  const verify = crypto.createVerify("SHA512");
  verify.update(timestampedURL.toString());

  return verify.verify(publicKey, sig, "base64");
}
