import * as crypto from "crypto";
import { URL } from "url";

const ECDSA_P521_PrivatePem = `-----BEGIN EC PRIVATE KEY-----
MIHcAgEBBEIBp7eAMe6QHQ4Av4tEfeVYFQUn3nWHFFEAfyqOcjSUHzPFmNQpH2kM
wFpZu6XPxauBTVTnFW8QAtD1ov1L6V7aHpagBwYFK4EEACOhgYkDgYYABAFHzefo
k5MWo1mRqDXvo8zQqUsnb6JeTKyn/kD0tJP92cYFutmHTq3rKQF2Kyvvhv339iKB
q11jsNpLjNCVooqDpwEHOpuFthlQH1isX96oQrSo+pxgkMQjUxxeeAF/mIeINu9S
2H/FYFvG7IU/O+0iTiY5GGmyiXPDThv5adXMH3zn6g==
-----END EC PRIVATE KEY-----`;

function signed(urlString: string, privateKey: string) {
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

signed("http://example.com?oid=23456#drop", ECDSA_P521_PrivatePem);
